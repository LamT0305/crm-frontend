import React, { useEffect, useRef, useState } from "react";
import useProduct from "../../hooks/useProduct";
import useCategory from "../../hooks/useCategory";
import CloseIcon from "../../assets/CloseIcon";
import Category from "../product/Category";

const CreateProductForm = ({ setIsOpen, productId, setProductId }) => {
  const {
    handleAddNewProduct,
    handleGetProductById,
    product,
    handleClearProduct,
    handleUpdateProduct,
  } = useProduct();
  const { handleSetCategories } = useCategory();
  const createRef = useRef(null);
  const [errors, setErrors] = useState({});
  const [openCategoryDropdown, setOpenCategoryDropdown] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: { _id: "", name: "" },
    stock: "",
    unit: "",
    status: "",
  });

  const handleChangeValue = (e) => {
    const { name, value } = e.target;

    if ((name === "price" || name === "stock") && !/^\d*\.?\d*$/.test(value)) {
      return;
    }

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

    if (!/^[a-zA-Z0-9\s\-+(),.]{3,50}$/.test(formData.name.trim())) {
      newErrors.name = "Product name should be 3-50 characters";
    }

    if (formData.description.trim().length < 10) {
      newErrors.description = "Description should be at least 10 characters";
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = "Price must be greater than 0";
    }

    if (!formData.category._id) {
      newErrors.category = "Please select a valid category";
    }

    if (!/^[a-zA-Z\s]{2,20}$/.test(formData.unit.trim())) {
      newErrors.unit = "Unit should be 2-20 characters, letters only";
    }

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

    const productData = {
      name: formData.name.trim(),
      description: formData.description.trim(),
      price: parseFloat(formData.price),
      category: formData.category._id,
      stock: parseInt(formData.stock) || 0,
      unit: formData.unit.trim(),
      status: formData.status,
    };

    if (productId) {
      handleUpdateProduct(productId, productData);
    } else {
      handleAddNewProduct(productData);
    }

    setFormData({
      name: "",
      description: "",
      price: "",
      category: { _id: "", name: "" },
      stock: "",
      unit: "",
      status: "",
    });
    setIsOpen(false);
    setProductId("");
    handleClearProduct();
  };

  useEffect(() => {
    handleSetCategories();
    const handleClickOutside = (e) => {
      if (createRef.current && !createRef.current.contains(e.target)) {
        setIsOpen(false);
        setProductId("");
        setFormData({
          name: "",
          description: "",
          price: "",
          category: { _id: "", name: "" },
          stock: "",
          unit: "",
          status: "Active",
        });
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
      category: { _id: "", name: "" },
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
            <label className="flex flex-col relative">
              Category
              <div
                onClick={() => setOpenCategoryDropdown(!openCategoryDropdown)}
                className={`py-1 px-4 mt-2 rounded-xl bg-gray-100 text-sm cursor-pointer ${
                  errors.category ? "border-2 border-red-500" : ""
                }`}
              >
                {formData.category?.name || "Select Category"}
              </div>
              {openCategoryDropdown && (
                <div className="absolute top-16 left-0 w-full z-10">
                  <Category
                    setFormData={setFormData}
                    setOpenCategoryDropdown={setOpenCategoryDropdown}
                    required={true}
                  />
                </div>
              )}
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
