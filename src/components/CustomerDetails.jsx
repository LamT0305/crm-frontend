import React, { useState, useEffect } from "react";
import userImg from "../assets/user.png";
import { InputChange } from "../utils/input";

function CustomerDetails({ customer }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    monthlyIncome: "",
    sourceId: { key: "", value: "" },
    industry: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const [textChange, setTextChange] = useState(false);

  return (
    <>
      {customer ? (
        <div className="w-full h-full bg-white">
          <div className="flex items-center p-5">
            <img
              src={userImg}
              alt=""
              style={{ width: 50, height: 50 }}
              className="rounded-3xl mr-5"
            />
            <div className="text-lg font-bold">
              <p>{`${customer.firstName} ${customer.lastName}`}</p>
              <p className="text-sm font-normal">Gender: {customer.gender}</p>
            </div>
          </div>
          <hr className="border-gray-300" />
          <div className="p-5">
            <p className="font-semibold">Details</p>
            <ul>
              <li className="flex items-center py-2">
                <p className="text-gray-400 w-30 text-sm ">Lead owner</p>

                <p className="text-md break-words w-[45%]">
                  {customer?.userId?.name}
                </p>
              </li>
              <li className="flex items-center py-2">
                <p className="text-gray-400 w-30 text-sm ">First name</p>
                {textChange ? (
                  <div className="w-[45%]">
                    <InputChange
                      text={formData.firstName}
                      setText={setFormData}
                      name={"firstName"}
                      currentValue={customer.firstName}
                    />
                  </div>
                ) : (
                  <p
                    onClick={() => setTextChange(true)}
                    className="text-md break-words w-[45%]"
                  >
                    {customer.firstName}
                  </p>
                )}
              </li>
              <li className="flex items-center py-2">
                <p className="text-gray-400 w-30 text-sm ">Last name</p>
                {textChange ? (
                  <div className="w-[45%]">
                    <InputChange
                      text={formData.lastName}
                      setText={setFormData}
                      name={"lastName"}
                      currentValue={customer.lastName}
                    />
                  </div>
                ) : (
                  <p
                    onClick={() => setTextChange(true)}
                    className="text-md break-words w-[45%]"
                  >
                    {customer.lastName}
                  </p>
                )}
              </li>
              <li className="flex items-center py-2">
                <p className="text-gray-400 w-30 text-sm ">Email</p>
                {textChange ? (
                  <div className="w-[45%]">
                    <InputChange
                      text={formData.email}
                      setText={setFormData}
                      name={"email"}
                      currentValue={customer.email}
                    />
                  </div>
                ) : (
                  <p
                    onClick={() => setTextChange(true)}
                    className="text-md break-words w-[45%]"
                  >
                    {customer.email}
                  </p>
                )}
              </li>
              <li className="flex items-center py-2">
                <p className="text-gray-400 w-30 text-sm ">Gender</p>
                {textChange ? (
                  <div className="w-[45%]">
                    <InputChange
                      text={formData.gender}
                      setText={setFormData}
                      name={"gender"}
                      currentValue={customer.gender}
                    />
                  </div>
                ) : (
                  <p
                    onClick={() => setTextChange(true)}
                    className="text-md break-words w-[45%]"
                  >
                    {customer.gender}
                  </p>
                )}
              </li>
              <li className="flex items-center py-2">
                <p className="text-gray-400 w-30 text-sm ">Phone</p>
                {textChange ? (
                  <div className="w-[45%]">
                    <InputChange
                      text={formData.phone}
                      setText={setFormData}
                      name={"phone"}
                      currentValue={customer.phone}
                    />
                  </div>
                ) : (
                  <p
                    onClick={() => setTextChange(true)}
                    className="text-md break-words w-[45%]"
                  >
                    {customer.phone}
                  </p>
                )}
              </li>
              <li className="flex items-center py-2">
                <p className="text-gray-400 w-30 text-sm ">Source</p>

                <p className="text-md break-words w-[45%]">
                  {customer.sourceId?.name}
                </p>
              </li>
              <li className="flex items-center py-2">
                <p className="text-gray-400 w-30 text-sm ">Monthly income</p>

                {textChange ? (
                  <div className="w-[45%]">
                    <InputChange
                      text={formData.monthlyIncome}
                      setText={setFormData}
                      name={"monthlyIncome"}
                      currentValue={customer.monthlyIncome}
                    />
                  </div>
                ) : (
                  <p
                    onClick={() => setTextChange(true)}
                    className="text-md break-words w-[45%]"
                  >
                    ${customer.monthlyIncome}
                  </p>
                )}
              </li>
              <li className="flex items-center py-2">
                <p className="text-gray-400 w-30 text-sm ">Industry</p>
                {textChange ? (
                  <div className="w-[45%]">
                    <InputChange
                      text={formData.industry}
                      setText={setFormData}
                      name={"industry"}
                      currentValue={customer.industry}
                    />
                  </div>
                ) : (
                  <p
                    onClick={() => setTextChange(true)}
                    className="text-md break-words w-[45%]"
                  >
                    {customer.industry}
                  </p>
                )}
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <p>....Loading</p>
      )}
    </>
  );
}

export default CustomerDetails;
