import React, { useEffect, useRef, useState } from "react";
import close from "../assets/closeBtn.png";
import useLead from "../hooks/useLead";

const CreateLeadForm = ({ setIsOpen }) => {
  const { handleAddNewLead } = useLead();
  const createRef = useRef(null);
  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    email: "",
    phone: "",
    gender: "",
    monthlyIncome: "",
    source: "",
    industry: "",
  });

  const handleChangeValue = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    handleAddNewLead(formData);
    setFormData({
      lastName: "",
      firstName: "",
      email: "",
      phone: "",
      gender: "",
      monthlyIncome: "",
      source: "",
      industry: "",
    });
    setIsOpen(false);
  };
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
    <div className="fixed inset-0 flex items-center justify-center  bg-black/10 ">
      <div
        ref={createRef}
        className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-3xl opacity-100"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold mb-4">Create Lead</h2>
          <img
            onClick={() => setIsOpen(false)}
            src={close}
            alt=""
            style={{
              width: 25,
              height: 25,
              padding: 5,
              backgroundColor: "grey",
              borderRadius: 10,
              filter: "invert(1)",
              cursor: "pointer",
            }}
          />
        </div>
        <form action="" onSubmit={handleSubmit}>
          <div className="grid grid-cols-3 gap-4 ">
            <label className="flex flex-col ">
              Last name
              <input
                value={formData.lastName}
                onChange={(e) => handleChangeValue(e)}
                required
                type="text"
                name="lastName"
                placeholder="Last Name"
                className=" py-1 px-4 mt-2 rounded-xl bg-gray-100 text-sm"
              />
            </label>

            <label className="flex flex-col ">
              First name
              <input
                value={formData.firstName}
                onChange={(e) => handleChangeValue(e)}
                required
                type="text"
                placeholder="First Name "
                name="firstName"
                className=" py-1 px-4 mt-2 rounded-xl bg-gray-100 text-sm"
              />
            </label>

            <label className="flex flex-col ">
              Email
              <input
                value={formData.email}
                onChange={(e) => handleChangeValue(e)}
                required
                type="email"
                placeholder="Email"
                name="email"
                className=" py-1 px-4 mt-2 rounded-xl bg-gray-100 text-sm"
              />
            </label>

            <label className="flex flex-col ">
              Mobile phone
              <input
                value={formData.phone}
                onChange={(e) => handleChangeValue(e)}
                required
                type="text"
                placeholder="Mobile No"
                name="phone"
                className=" py-1 px-4 mt-2 rounded-xl bg-gray-100 text-sm"
              />
            </label>

            <label className="flex flex-col ">
              Gender
              <input
                value={formData.gender}
                onChange={(e) => handleChangeValue(e)}
                required
                type="text"
                placeholder="Gender"
                name="gender"
                className=" py-1 px-4 mt-2 rounded-xl bg-gray-100 text-sm"
              />
            </label>
          </div>
          <hr className="my-10" style={{ color: "lightgrey" }} />
          <div className="grid grid-cols-3 gap-4">
            <label className="flex flex-col ">
              Monthly income
              <input
                value={formData.monthlyIncome}
                onChange={(e) => handleChangeValue(e)}
                required
                type="text"
                placeholder="Monthly income"
                name="monthlyIncome"
                className=" py-1 px-4 mt-2 rounded-xl bg-gray-100 text-sm"
              />
            </label>

            <label className="flex flex-col ">
              Source
              <input
                value={formData.source}
                onChange={(e) => handleChangeValue(e)}
                required
                type="text"
                placeholder="Source"
                name="source"
                className=" py-1 px-4 mt-2 rounded-xl bg-gray-100 text-sm"
              />
            </label>

            <label className="flex flex-col ">
              Industry
              <input
                value={formData.industry}
                onChange={(e) => handleChangeValue(e)}
                required
                type="text"
                placeholder="Industry"
                name="industry"
                className=" py-1 px-4 mt-2 rounded-xl bg-gray-100 text-sm"
              />
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
