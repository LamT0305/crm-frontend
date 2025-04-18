import React, { useEffect, useRef, useState } from "react";
import useLead from "../../hooks/useLead";
import useSource from "../../hooks/useSource";
import { Source } from "../../utils/source";
import CloseIcon from "../../assets/CloseIcon";

const CreateLeadForm = ({ setIsOpen }) => {
  const { sources, handleGetSources } = useSource();
  const { handleAddNewLead } = useLead();
  const createRef = useRef(null);
  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    email: "",
    phone: "",
    gender: "",
    monthlyIncome: "",
    sourceId: { key: "", value: "" },
    industry: "",
  });

  const [openSourceDropdown, setOpenSourceDropdown] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChangeValue = (e) => {
    const { name, value } = e.target;

    // Prevent numbers in name fields
    if ((name === "firstName" || name === "lastName") && /\d/.test(value)) {
      return;
    }
    // Prevent non-numeric characters in phone field
    if (name === "phone" && !/^\d*$/.test(value)) {
      return;
    }

    setFormData((prevData) => ({ ...prevData, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validations
    if (!/^[a-zA-Z\s]{2,30}$/.test(formData.firstName.trim())) {
      newErrors.firstName =
        "First name should be 2-30 characters, letters only";
    }
    if (!/^[a-zA-Z\s]{2,30}$/.test(formData.lastName.trim())) {
      newErrors.lastName = "Last name should be 2-30 characters, letters only";
    }

    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation
    if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    // Gender validation
    if (!["male", "female", "other"].includes(formData.gender.toLowerCase())) {
      newErrors.gender = "Please select a gender";
    }

    // Monthly income validation
    if (
      !/^\d+(\.\d{1,2})?$/.test(formData.monthlyIncome) ||
      parseFloat(formData.monthlyIncome) <= 0
    ) {
      newErrors.monthlyIncome = "Please enter a valid positive number";
    }

    // Source validation
    if (!formData.sourceId.key) {
      newErrors.sourceId = "Please select a source";
    }

    // Industry validation
    if (!/^[a-zA-Z\s\W]{2,50}$/.test(formData.industry.trim())) {
      newErrors.industry = "Industry should be 2-50 characters";
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
    form.append("firstName", formData.firstName);
    form.append("lastName", formData.lastName);
    form.append("email", formData.email);
    form.append("phone", formData.phone);
    form.append("gender", formData.gender);
    form.append("monthlyIncome", formData.monthlyIncome);
    form.append("sourceId", formData.sourceId.key);
    form.append("industry", formData.industry);

    handleAddNewLead(form);
    setFormData({
      lastName: "",
      firstName: "",
      email: "",
      phone: "",
      gender: "",
      monthlyIncome: "",
      sourceId: { key: "", value: "" },
      industry: "",
    });
    setIsOpen(false);
  };

  useEffect(() => {
    handleGetSources();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (createRef.current && !createRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/10 z-100">
      <div
        ref={createRef}
        className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-3xl opacity-100"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold mb-4">Create Lead</h2>
          <div className="w-fit" onClick={() => setIsOpen(false)}>
            <CloseIcon
              className={"w-6 h-6 p-1 bg-gray-200 rounded-lg cursor-pointer"}
            />
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-3 gap-4">
            <label className="flex flex-col">
              Last name
              <input
                value={formData.lastName}
                onChange={handleChangeValue}
                required
                type="text"
                name="lastName"
                placeholder="Last Name"
                className={`py-1 px-4 mt-2 rounded-xl bg-gray-100 text-sm ${
                  errors.lastName ? "border-2 border-red-500" : ""
                }`}
              />
              {errors.lastName && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.lastName}
                </span>
              )}
            </label>

            <label className="flex flex-col">
              First name
              <input
                value={formData.firstName}
                onChange={handleChangeValue}
                required
                type="text"
                placeholder="First Name"
                name="firstName"
                className={`py-1 px-4 mt-2 rounded-xl bg-gray-100 text-sm ${
                  errors.firstName ? "border-2 border-red-500" : ""
                }`}
              />
              {errors.firstName && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.firstName}
                </span>
              )}
            </label>

            <label className="flex flex-col">
              Email
              <input
                value={formData.email}
                onChange={handleChangeValue}
                required
                type="email"
                placeholder="Email"
                name="email"
                className={`py-1 px-4 mt-2 rounded-xl bg-gray-100 text-sm ${
                  errors.email ? "border-2 border-red-500" : ""
                }`}
              />
              {errors.email && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.email}
                </span>
              )}
            </label>

            <label className="flex flex-col">
              Mobile phone
              <input
                value={formData.phone}
                onChange={handleChangeValue}
                required
                type="tel"
                placeholder="Mobile No"
                name="phone"
                className={`py-1 px-4 mt-2 rounded-xl bg-gray-100 text-sm ${
                  errors.phone ? "border-2 border-red-500" : ""
                }`}
              />
              {errors.phone && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.phone}
                </span>
              )}
            </label>

            <label className="flex flex-col">
              Gender
              <select
                value={formData.gender}
                onChange={handleChangeValue}
                required
                name="gender"
                className={`py-1 px-4 mt-2 rounded-xl bg-gray-100 text-sm ${
                  errors.gender ? "border-2 border-red-500" : ""
                }`}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.gender}
                </span>
              )}
            </label>
          </div>

          <hr className="my-10" style={{ color: "lightgrey" }} />

          <div className="grid grid-cols-3 gap-4">
            <label className="flex flex-col">
              Monthly income
              <input
                value={formData.monthlyIncome}
                onChange={handleChangeValue}
                required
                type="number"
                min="0"
                step="0.01"
                placeholder="Monthly income"
                name="monthlyIncome"
                className={`py-1 px-4 mt-2 rounded-xl bg-gray-100 text-sm ${
                  errors.monthlyIncome ? "border-2 border-red-500" : ""
                }`}
              />
              {errors.monthlyIncome && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.monthlyIncome}
                </span>
              )}
            </label>

            <label
              className="flex flex-col relative"
              onClick={(e) => {
                e.stopPropagation();
                setOpenSourceDropdown((prev) => !prev);
              }}
            >
              Source
              <input
                value={formData.sourceId.value}
                readOnly
                required
                type="text"
                placeholder="Source"
                name="source"
                className={`py-1 px-4 mt-2 rounded-xl bg-gray-100 text-sm ${
                  errors.sourceId ? "border-2 border-red-500" : ""
                }`}
              />
              {errors.sourceId && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.sourceId}
                </span>
              )}
              {openSourceDropdown && (
                <div className="absolute top-full left-0 w-full bg-white shadow-lg rounded-2xl z-20 mt-2">
                  <Source
                    sources={sources}
                    setFormData={setFormData}
                    setOpenSourceDropdown={setOpenSourceDropdown}
                  />
                </div>
              )}
            </label>

            <label className="flex flex-col">
              Industry
              <input
                value={formData.industry}
                onChange={handleChangeValue}
                required
                type="text"
                placeholder="Industry"
                name="industry"
                className={`py-1 px-4 mt-2 rounded-xl bg-gray-100 text-sm ${
                  errors.industry ? "border-2 border-red-500" : ""
                }`}
              />
              {errors.industry && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.industry}
                </span>
              )}
            </label>
          </div>

          <div className="flex justify-end mt-4">
            <button className="bg-black text-white opacity-100 px-4 py-1 rounded-xl mt-5 cursor-pointer">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateLeadForm;
