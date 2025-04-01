import React, { useEffect, useRef, useState } from "react";
import useDeal from "../../hooks/useDeal";
import useProduct from "../../hooks/useProduct";
import CloseIcon from "../../assets/CloseIcon";
import ExportIcon from "../../assets/ExportIcon";
import { exportToExcel } from "../../utils/exportQuotation";
import useActivity from "../../hooks/useActivity";

function DealForm({ setOpenDeal, dealId, setDealId, customerId }) {
  const {
    handleAddNewDeal,
    handleGetDealById,
    deal,
    handleClearDeal,
    handleUpdateDeal,
  } = useDeal();
  const { products, handleSetProducts, handleFilterProducts } = useProduct();
  const { handleAddActivity } = useActivity();
  const createRef = useRef(null);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    products: [],
    status: "Open",
    discount: {
      type: "fixed",
      value: 0,
    },
  });

  const statusOptions = ["Open", "Negotiation", "Won", "Lost"];

  const validateForm = () => {
    const newErrors = {};

    // Validate customer
    if (!customerId && !deal) {
      newErrors.customer = "Please select a customer";
    }

    // Validate products
    if (formData.products.length === 0) {
      newErrors.products = "Please select at least one product";
    }

    // Validate quantities
    formData.products.forEach((product) => {
      if (!product.quantity || product.quantity <= 0) {
        newErrors[`quantity_${product.productId}`] =
          "Quantity must be greater than 0";
      }
    });

    // Validate discount
    if (formData.discount.type === "percentage") {
      if (formData.discount.value < 0 || formData.discount.value > 100) {
        newErrors.discount = "Percentage discount must be between 0 and 100";
      }
    } else {
      if (formData.discount.value < 0) {
        newErrors.discount = "Fixed discount cannot be negative";
      }
      if (formData.discount.value > subtotal) {
        newErrors.discount = "Discount cannot exceed subtotal";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChangeValue = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    const dealData = {
      customerId: customerId || deal.customerId._id,
      products: formData.products.map((product) => ({
        productId: product.productId,
        quantity: Number(product.quantity),
        price: Number(product.price),
        category: product.category,
      })),
      status: formData.status,
      discount: formData.discount,
    };

    if (dealId) {
      handleUpdateDeal(dealId, dealData);
      const activity = {
        customerId: deal.customerId._id,
        type: "deal",
        subject: "has updated deal",
      };
      handleAddActivity(activity);
    } else {
      handleAddNewDeal(dealData);
      const activity = {
        customerId: customerId,
        type: "deal",
        subject: "has created a deal",
      };
      handleAddActivity(activity);
    }

    setFormData({
      products: [],
      status: "Open",
      discount: {
        type: "fixed",
        value: 0,
      },
    });
    setOpenDeal(false);
    if (dealId) {
      handleClearDeal();
      setDealId("");
    }
  };

  const handleProductSelection = (productId, product) => {
    const existingProduct = formData.products.find(
      (p) => p.productId === productId
    );

    if (existingProduct) {
      setFormData((prev) => ({
        ...prev,
        products: prev.products.filter((p) => p.productId !== productId),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        products: [
          ...prev.products,
          {
            productId: productId,
            quantity: 1,
            price: product.price || 0,
            category: product.category._id,
          },
        ],
      }));
    }
    // Clear product-related errors when selection changes
    if (errors.products) {
      setErrors((prev) => ({ ...prev, products: "" }));
    }
  };

  const handleQuantityChange = (productId, value) => {
    const quantity = parseInt(value) || 1;
    setFormData((prev) => ({
      ...prev,
      products: prev.products.map((p) =>
        p.productId === productId ? { ...p, quantity } : p
      ),
    }));
    // Clear quantity error when changed
    if (errors[`quantity_${productId}`]) {
      setErrors((prev) => ({ ...prev, [`quantity_${productId}`]: "" }));
    }
  };

  const handleDiscountChange = (value) => {
    const discountValue = parseFloat(value) || 0;
    setFormData((prev) => ({
      ...prev,
      discount: {
        ...prev.discount,
        value: discountValue,
      },
    }));
    if (errors.discount) {
      setErrors((prev) => ({ ...prev, discount: "" }));
    }
  };

  useEffect(() => {
    handleSetProducts();
  }, []);

  useEffect(() => {
    if (dealId) {
      handleGetDealById(dealId);
    }
  }, [dealId]);

  useEffect(() => {
    if (deal) {
      setFormData({
        products: deal.products.map((product) => ({
          productId: product.productId._id,
          quantity: product.quantity,
          price: product.productId.price,
          category: product.productId.category._id,
        })),
        status: deal.status,
        discount: deal.quotationId.discount || {
          type: "fixed",
          value: 0,
        },
      });
    }
  }, [deal]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (createRef.current && !createRef.current.contains(e.target)) {
        setOpenDeal(false);
        if (dealId) {
          setDealId("");
          handleClearDeal();
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const subtotal = formData.products.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );

  const discountAmount =
    formData.discount.type === "fixed"
      ? formData.discount.value
      : (subtotal * formData.discount.value) / 100;

  const total = subtotal - discountAmount;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/10 z-100">
      <div
        ref={createRef}
        className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-3xl opacity-100"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold mb-4">
            {dealId ? "Update Deal" : "Create Deal"}
          </h2>
          <div className="w-fit flex items-center">
            {deal && (
              <div
                onClick={() => deal && exportToExcel(deal)}
                className="bg-gray-200 p-1 rounded-lg cursor-pointer hover:bg-gray-400 mr-3"
              >
                <ExportIcon className="w-4 h-4" color="black" />
              </div>
            )}
            <div
              onClick={() => {
                setOpenDeal(false);
                if (dealId) {
                  setDealId("");
                  handleClearDeal();
                }
              }}
            >
              <CloseIcon className="w-6 h-6 p-1 bg-gray-200 rounded-lg cursor-pointer hover:bg-gray-400" />
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {errors.customer && (
            <div className="text-red-500 text-xs mb-4">{errors.customer}</div>
          )}

          <div className="grid grid-cols-1 gap-4">
            <div className="flex flex-col w-full">
              <span>Status</span>
              <select
                value={formData.status}
                onChange={handleChangeValue}
                required
                name="status"
                className={`py-1 px-4 mt-2 rounded-xl bg-gray-100 text-sm w-full ${
                  errors.status ? "border-2 border-red-500" : ""
                }`}
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <hr className="my-6" style={{ color: "lightgrey" }} />

          <div className="grid grid-cols-1 gap-4">
            <div className="flex flex-col">
              <div className="flex items-center justify-between px-2">
                <span>Products</span>
                <input
                  type="text"
                  className="bg-gray-100 px-2 py-1 rounded-xl w-[250px] text-sm shadow-md cursor-pointer"
                  placeholder="Product name..."
                  onChange={(e) => handleFilterProducts("name", e.target.value)}
                />
              </div>
              {errors.products && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.products}
                </span>
              )}
              <div className="mt-2 space-y-2 h-60 overflow-y-auto">
                {[...products]
                  ?.sort((a, b) => {
                    const aSelected = formData.products.some(
                      (p) => p.productId === a._id
                    );
                    const bSelected = formData.products.some(
                      (p) => p.productId === b._id
                    );
                    return bSelected - aSelected;
                  })
                  .map((product) => (
                    <div
                      key={product._id}
                      className="flex items-center gap-4 bg-gray-50 p-3 rounded-xl"
                      onClick={() =>
                        handleProductSelection(product._id, product)
                      }
                    >
                      <div className="flex items-center gap-3 flex-1 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.products.some(
                            (p) => p.productId === product._id
                          )}
                          readOnly
                        />
                        <span className="select-none">{product.name}</span>
                      </div>
                      {formData.products.some(
                        (p) => p.productId === product._id
                      ) && (
                        <>
                          <div
                            className="flex items-center gap-2"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <span className="text-sm select-none">Qty:</span>
                            <input
                              type="number"
                              min="1"
                              value={
                                formData.products.find(
                                  (p) => p.productId === product._id
                                )?.quantity || 1
                              }
                              onChange={(e) =>
                                handleQuantityChange(
                                  product._id,
                                  e.target.value
                                )
                              }
                              className={`w-20 py-1 px-2 rounded-lg bg-white text-sm ${
                                errors[`quantity_${product._id}`]
                                  ? "border-2 border-red-500"
                                  : ""
                              }`}
                            />
                            {errors[`quantity_${product._id}`] && (
                              <span className="text-red-500 text-xs">
                                {errors[`quantity_${product._id}`]}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <span>Unit:</span>
                            <p className="w-24 py-1 px-2 rounded-lg bg-white text-sm">
                              {product.unit}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm select-none">Price:</span>
                            <p className="w-24 py-1 px-2 rounded-lg bg-white text-sm">
                              ${product.price}
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="flex flex-col">
              <span>Discount Type</span>
              <select
                value={formData.discount.type}
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    discount: {
                      ...prev.discount,
                      type: e.target.value,
                      value: 0,
                    },
                  }));
                  if (errors.discount) {
                    setErrors((prev) => ({ ...prev, discount: "" }));
                  }
                }}
                className="py-1 px-4 mt-2 rounded-xl bg-gray-100 text-sm"
              >
                <option value="fixed">Fixed Amount</option>
                <option value="percentage">Percentage</option>
              </select>
            </div>

            <div className="flex flex-col">
              <span>Discount Value</span>
              <input
                type="number"
                min="0"
                step={formData.discount.type === "percentage" ? "1" : "0.01"}
                max={
                  formData.discount.type === "percentage" ? "100" : undefined
                }
                value={formData.discount.value}
                onChange={(e) => handleDiscountChange(e.target.value)}
                className={`py-1 px-4 mt-2 rounded-xl bg-gray-100 text-sm ${
                  errors.discount ? "border-2 border-red-500" : ""
                }`}
              />
              {errors.discount && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.discount}
                </span>
              )}
            </div>
          </div>

          <div className="mt-6 text-right space-y-2">
            <p className="text-md">Subtotal: ${subtotal.toFixed(2)}</p>
            <p className="text-md">
              Discount: ${discountAmount.toFixed(2)}
              {formData.discount.type === "percentage" &&
                ` (${formData.discount.value}%)`}
            </p>
            <p className="text-lg font-semibold">Total: ${total.toFixed(2)}</p>
          </div>

          <div className="flex justify-end mt-4">
            <button className="bg-black text-white opacity-100 px-4 py-1 rounded-xl mt-5 cursor-pointer">
              {dealId ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DealForm;
