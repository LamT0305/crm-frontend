import React, { useEffect } from "react";
import userImg from "../assets/user.png";
import useCustomer from "../hooks/useCustomer";

function CustomerDetails({ customerId }) {
  const { handleGetCustomerById, customer } = useCustomer();
  useEffect(() => {
    if (!customerId) return;
    handleGetCustomerById(customerId);
  },[customerId])
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
                <p className="text-gray-400 w-30 text-sm">Lead owner</p>
                <p className="text-md break-words w-[45%]">
                  {customer?.userId?.name}
                </p>
              </li>
              <li className="flex items-center py-2">
                <p className="text-gray-400 w-30 text-sm">First name</p>
                <p className="text-md break-words w-[45%]">
                  {customer.firstName}
                </p>
              </li>
              <li className="flex items-center py-2">
                <p className="text-gray-400 w-30 text-sm">Last name</p>
                <p className="text-md break-words w-[45%]">
                  {customer.lastName}
                </p>
              </li>
              <li className="flex items-center py-2">
                <p className="text-gray-400 w-30 text-sm">Email</p>
                <p className="text-md break-words w-[45%]">{customer.email}</p>
              </li>
              <li className="flex items-center py-2">
                <p className="text-gray-400 w-30 text-sm">Gender</p>
                <p className="text-md break-words w-[45%]">{customer.gender}</p>
              </li>
              <li className="flex items-center py-2">
                <p className="text-gray-400 w-30 text-sm">Phone</p>
                <p className="text-md break-words w-[45%]">{customer.phone}</p>
              </li>
              <li className="flex items-center py-2">
                <p className="text-gray-400 w-30 text-sm">Source</p>
                <p className="text-md break-words w-[45%]">
                  {customer.sourceId?.name}
                </p>
              </li>
              <li className="flex items-center py-2">
                <p className="text-gray-400 w-30 text-sm">Monthly income</p>
                <p className="text-md break-words w-[45%]">
                  ${customer.monthlyIncome}
                </p>
              </li>
              <li className="flex items-center py-2">
                <p className="text-gray-400 w-30 text-sm">Industry</p>
                <p className="text-md break-words w-[45%]">
                  {customer.industry}
                </p>
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
