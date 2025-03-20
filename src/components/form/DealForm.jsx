import React, { useEffect, useRef, useState } from "react";
import useDeal from "../../hooks/useDeal";
import useProduct from "../../hooks/useProduct";
import CloseIcon from "../../assets/CloseIcon";
import { notify } from "../../utils/Toastify";
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
  const { products, handleSetProducts } = useProduct();
  const { handleAddActivity } = useActivity();
  const createRef = useRef(null);

  const [formData, setFormData] = useState({
    products: [],
    status: "Open",
    discount: {
      type: "fixed",
      value: 0,
    },
  });

  const statusOptions = ["Open", "Negotiation", "Won", "Lost"];

  const handleChangeValue = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customerId && !deal) {
      notify.error("Please provide a customer");
      return;
    }

    // Create proper JSON object
    const dealData = {
      customerId: customerId || deal.customerId._id,
      products: formData.products.map((product) => ({
        productId: product.productId,
        quantity: Number(product.quantity),
        price: Number(product.price),
      })),
      status: formData.status,
      discount: formData.discount,
    };

    if (dealId) {
      handleUpdateDeal(dealId, dealData);
      // activity
      const activity = {
        customerId: deal.customerId._id,
        type: "deal",
        subject: "has updated deal",
      };
      handleAddActivity(activity);
    } else {
      handleAddNewDeal(dealData);
      // activity

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

  const handleProductSelection = (productId, product) => {
    const existingProduct = formData.products.find(
      (p) => p.productId === productId
    );

    if (existingProduct) {
      // Remove product if it exists
      setFormData((prev) => ({
        ...prev,
        products: prev.products.filter((p) => p.productId !== productId),
      }));
    } else {
      // Add new product if it doesn't exist
      setFormData((prev) => ({
        ...prev,
        products: [
          ...prev.products,
          {
            productId: productId,
            quantity: 1,
            price: product.price || 0,
          },
        ],
      }));
    }
  };

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
            {/* export */}
            {deal && (
              <div
                onClick={() => {
                  if (deal) {
                    exportToExcel(deal);
                  }
                }}
                className="bg-gray-200 p-1 rounded-lg cursor-pointer hover:bg-gray-400 mr-3"
              >
                <ExportIcon className={"w-4 h-4 "} color={"black"} />
              </div>
            )}

            {/* close button */}
            <div
              onClick={() => {
                setOpenDeal(false);
                if (dealId) {
                  setDealId("");
                  handleClearDeal();
                }
              }}
            >
              <CloseIcon
                className={
                  "w-6 h-6 p-1 bg-gray-200 rounded-lg cursor-pointer hover:bg-gray-400"
                }
              />
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4">
            {/* status */}
            <div className="flex flex-col w-full">
              <span>Status</span>
              <select
                value={formData.status}
                onChange={handleChangeValue}
                required
                name="status"
                className="py-1 px-4 mt-2 rounded-xl bg-gray-100 text-sm w-full"
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
          {/* product */}
          <div className="grid grid-cols-1 gap-4">
            <div className="flex flex-col">
              <span>Products</span>
              <div className="mt-2 space-y-2 max-h-60 overflow-y-auto">
                {products?.map((product) => (
                  <div
                    key={product._id}
                    className="flex items-center gap-4 bg-gray-50 p-3 rounded-xl"
                    onClick={() => handleProductSelection(product._id, product)}
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
                            onChange={(e) => {
                              const value = parseInt(e.target.value) || 1;
                              setFormData((prev) => ({
                                ...prev,
                                products: prev.products.map((p) =>
                                  p.productId === product._id
                                    ? { ...p, quantity: value }
                                    : p
                                ),
                              }));
                            }}
                            className="w-20 py-1 px-2 rounded-lg bg-white text-sm"
                          />
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
          {/* discount */}
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
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    discount: {
                      ...prev.discount,
                      value: parseFloat(e.target.value) || 0,
                    },
                  }));
                }}
                className="py-1 px-4 mt-2 rounded-xl bg-gray-100 text-sm"
              />
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
