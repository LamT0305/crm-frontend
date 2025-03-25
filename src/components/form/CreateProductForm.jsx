import React, { useEffect, useRef, useState } from "react";
import useProduct from "../../hooks/useProduct";
import CloseIcon from "../../assets/CloseIcon";

const CreateProductForm = ({ setIsOpen, productId, setProductId }) => {
  const {
    handleAddNewProduct,
    handleGetProductById,
    product,
    handleClearProduct,
    handleUpdateProduct,
  } = useProduct();
  const createRef = useRef(null);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    unit: "",
    status: "",
  });

  const categories = [
    "pt-training",
    "annual-training",
    "supplement",
    "stretching",
  ];

  const handleChangeValue = (e) => {
    const { name, value } = e.target;

    // Prevent non-numeric characters in price and stock
    if ((name === "price" || name === "stock") && !/^\d*\.?\d*$/.test(value)) {
      return;
    }

    // Prevent numbers in unit field
    if (name === "unit" && /\d/.test(value)) {
      return;
    }

    setFormData((prevData) => ({ ...prevData, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!/^[a-zA-Z0-9\s]{3,50}$/.test(formData.name.trim())) {
      newErrors.name = "Product name should be 3-50 characters";
    }

    // Description validation
    if (formData.description.trim().length < 10) {
      newErrors.description = "Description should be at least 10 characters";
    }

    // Price validation
    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = "Price must be greater than 0";
    }

    // Category validation
    if (!categories.includes(formData.category)) {
      newErrors.category = "Please select a valid category";
    }

    // Stock validation for supplements
    if (formData.category === "supplement") {
      if (!formData.stock || parseInt(formData.stock) < 0) {
        newErrors.stock = "Stock must be 0 or greater for supplements";
      }
    }

    // Unit validation
    if (!/^[a-zA-Z\s]{2,20}$/.test(formData.unit.trim())) {
      newErrors.unit = "Unit should be 2-20 characters, letters only";
    }

    // Status validation
    if (!["Active", "Inactive"].includes(formData.status)) {
      newErrors.status = "Please select a valid status";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    const form = new FormData();
    form.append("name", formData.name);
    form.append("description", formData.description);
    form.append("price", formData.price);
    form.append("category", formData.category);
    form.append("stock", formData.stock);
    form.append("unit", formData.unit);
    form.append("status", formData.status);

    if (productId) {
      handleUpdateProduct(productId, form);
    } else {
      handleAddNewProduct(form);
    }
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "",
      stock: "",
      unit: "",
      status: "",
    });
    setIsOpen(false);
    setProductId("");
    handleClearProduct();
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (createRef.current && !createRef.current.contains(e.target)) {
        setIsOpen(false);
        setProductId("");
        setFormData({
          name: "",
          description: "",
          price: "",
          category: "",
          stock: "",
          unit: "",
          status: "Active",
        });
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // set product by Id if exist
  useEffect(() => {
    if (productId) {
      handleGetProductById(productId);
    }
  }, [productId]);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        stock: product.stock,
        unit: product.unit,
        status: product.status,
      });
    }
  }, [product]);

  const onClose = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "",
      stock: "",
      unit: "",
      status: "Active",
    });
    setIsOpen(false);
    setProductId(null);
    handleClearProduct();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/10 z-100">
      <div
        ref={createRef}
        className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-3xl opacity-100"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold mb-4">
            {productId ? "Update Product" : "Create Product"}
          </h2>
          <div className="w-fit" onClick={() => onClose()}>
            <CloseIcon
              className={"w-6 h-6 p-1 bg-gray-200 rounded-lg cursor-pointer"}
            />
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <label className="flex flex-col">
              Product Name
              <input
                value={formData.name || ""}
                onChange={handleChangeValue}
                required
                type="text"
                name="name"
                placeholder="Product Name"
                className={`py-1 px-4 mt-2 rounded-xl bg-gray-100 text-sm ${
                  errors.name ? "border-2 border-red-500" : ""
                }`}
              />
              {errors.name && (
                <span className="text-red-500 text-xs mt-1">{errors.name}</span>
              )}
            </label>

            <label className="flex flex-col">
              Price
              <input
                value={formData.price || ""}
                onChange={handleChangeValue}
                required
                type="number"
                name="price"
                placeholder="Price"
                min="0"
                step="0.01"
                className={`py-1 px-4 mt-2 rounded-xl bg-gray-100 text-sm ${
                  errors.price ? "border-2 border-red-500" : ""
                }`}
              />
              {errors.price && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.price}
                </span>
              )}
            </label>
          </div>

          <label className="flex flex-col mt-4">
            Description
            <textarea
              value={formData.description || ""}
              onChange={handleChangeValue}
              name="description"
              placeholder="Description"
              className={`py-1 px-4 mt-2 rounded-xl bg-gray-100 text-sm h-24 resize-none ${
                errors.description ? "border-2 border-red-500" : ""
              }`}
              required
            />
            {errors.description && (
              <span className="text-red-500 text-xs mt-1">
                {errors.description}
              </span>
            )}
          </label>

          <hr className="my-6" style={{ color: "lightgrey" }} />

          <div className="grid grid-cols-2 gap-4">
            <label className="flex flex-col">
              Category
              <select
                value={formData.category || ""}
                onChange={handleChangeValue}
                required
                name="category"
                className={`py-1 px-4 mt-2 rounded-xl bg-gray-100 text-sm ${
                  errors.category ? "border-2 border-red-500" : ""
                }`}
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.category && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.category}
                </span>
              )}
            </label>

            <label className="flex flex-col">
              Unit
              <input
                value={formData.unit || ""}
                onChange={handleChangeValue}
                required
                type="text"
                name="unit"
                placeholder="Unit (e.g., pieces, bottles)"
                className={`py-1 px-4 mt-2 rounded-xl bg-gray-100 text-sm ${
                  errors.unit ? "border-2 border-red-500" : ""
                }`}
              />
              {errors.unit && (
                <span className="text-red-500 text-xs mt-1">{errors.unit}</span>
              )}
            </label>

            <label className="flex flex-col">
              Stock
              <input
                value={formData.stock || ""}
                onChange={handleChangeValue}
                required={formData.category === "supplement"}
                type="number"
                min="0"
                name="stock"
                placeholder="Stock quantity"
                className={`py-1 px-4 mt-2 rounded-xl bg-gray-100 text-sm ${
                  errors.stock ? "border-2 border-red-500" : ""
                }`}
              />
              {errors.stock && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.stock}
                </span>
              )}
            </label>

            <label className="flex flex-col">
              Status
              <select
                value={formData.status || ""}
                onChange={handleChangeValue}
                required
                name="status"
                className={`py-1 px-4 mt-2 rounded-xl bg-gray-100 text-sm ${
                  errors.status ? "border-2 border-red-500" : ""
                }`}
              >
                <option value="">Select status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              {errors.status && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.status}
                </span>
              )}
            </label>
          </div>

          <div className="flex justify-end mt-4">
            <button className="bg-black text-white opacity-100 px-4 py-1 rounded-xl mt-5 cursor-pointer">
              {productId ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProductForm;
