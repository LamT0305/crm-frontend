import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CustomerHeader from "../components/CustomerHeader";
import CustomerNavigation from "../components/CustomerNavigation";
import CustomerFooter from "../components/CustomerFooter";
import CustomerDetails from "../components/CustomerDetails";
import useLead from "../hooks/useLead";
import Activity from "../components/Activity";
import Email from "../components/Email";
import Data from "../components/Data";
import Task from "../components/Task";
import Note from "../components/Note";
import Comment from "../components/Comment";
function CustomerInfo() {
  const { id } = useParams();
  const { customer, handleGetCustomerById } = useLead();
  const [tagName, setTagName] = useState("activity"); // default
  useEffect(() => {
    if (id) {
      handleGetCustomerById(id);
    }
  }, [id]);
  return (
    <div className="w-[100%] h-full flex flex-col">
      <CustomerHeader name={customer?.firstName} />
      <div className="w-full h-full flex ">
        <div className="w-[80%] h-[100%] border-r border-gray-300 relative flex flex-col">
          <CustomerNavigation tagName={tagName} setTagName={setTagName} />
          {tagName === "activity" ? <Activity id={id} /> : null}
          {tagName === "email" ? <Email customer={customer} /> : null}
          {tagName === "comment" ? <Comment customerId={customer._id} /> : null}
          {tagName === "data" ? <Data /> : null}
          {tagName === "task" ? (
            <Task customerId={customer._id} user={customer.userId} />
          ) : null}
          {tagName === "note" ? <Note customerId={customer._id}/> : null}

          <div className="absolute bottom-0 w-[100%]">
            <CustomerFooter customerEmail={customer?.email} id={customer._id} />
          </div>
        </div>
        <div className="w-[20%]">
          <CustomerDetails customer={customer} />
        </div>
      </div>
    </div>
  );
}

export default CustomerInfo;
