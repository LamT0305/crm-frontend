import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CustomerHeader from "../components/CustomerHeader";
import CustomerNavigation from "../components/CustomerNavigation";
import CustomerFooter from "../components/CustomerFooter";
import CustomerDetails from "../components/CustomerDetails";
import useLead from "../hooks/useLead";

function CustomerInfo() {
  const { id } = useParams();
  const { lead, handleGetCustomerById } = useLead();
  const [tagName, setTagName] = useState("activity"); // default
  useEffect(() => {
    if (id) {
      handleGetCustomerById(id);
    }
  }, [id]);

  return (
    <div className="flex w-[100%] ">
      <div className="w-[80%] border-r border-gray-300 relative">
        <CustomerHeader name={lead?.firstName} />
        <CustomerNavigation tagName={tagName} setTagName={setTagName} />
        <div className="absolute bottom-0 w-[100%]">
          <CustomerFooter />
        </div>
      </div>
      <div className="w-[20%]">
        <CustomerDetails />
      </div>
    </div>
  );
}

export default CustomerInfo;
