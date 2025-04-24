import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CustomerHeader from "../components/customer-info/CustomerHeader";
import CustomerNavigation from "../components/customer-info/CustomerNavigation";
import useLead from "../hooks/useLead";
import Activity from "../components/customer-info/Activity";
import Email from "../components/customer-info/Email";
import Data from "../components/customer-info/Data";
import Task from "../components/customer-info/Task";
import Note from "../components/customer-info/Note";
import Comment from "../components/customer-info/Comment";
import DealForm from "../components/form/DealForm";
import CustomerCare from "../components/customer-info/CustomerCare";
import CustomerDeal from "../components/customer-info/CustomerDeal";
import useWorkspace from "../hooks/useWorkspace";
import EmailForm from "../components/form/EmailForm";
import CommentForm from "../components/form/CommentInput";
function CustomerInfo() {
  const { id } = useParams();
  const { customer, handleGetCustomerById, isLoading } = useLead();
  const { currentWorkspace } = useWorkspace();
  const [tagName, setTagName] = useState("activity"); // default
  const [openDeal, setOpenDeal] = useState(false);
  const [openForm, setOpen] = useState(false);
  const [openComment, setOpenCmt] = useState(false);

  const defaultColumns = [
    { key: "customerId.firstName", value: "First Name" },
    { key: "customerId.lastName", value: "Last Name" },
    { key: "quotationId.totalPrice", value: "Total Amount" },
    { key: "quotationId.discount.type", value: "Discount Type" },
    { key: "quotationId.discount.value", value: "Discount Value" },
    { key: "quotationId.finalPrice", value: "Final Price" },
    { key: "status", value: "Status" },
    { key: "createdAt", value: "Created At" },
  ];

  useEffect(() => {
    if (id) {
      handleGetCustomerById(id);
    }
  }, [id, currentWorkspace]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-[80%]">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  return (
    <div className="w-[80%] h-screen flex flex-col overflow-hidden">
      {openDeal && (
        <DealForm setOpenDeal={setOpenDeal} customerId={customer._id} />
      )}

      <CustomerHeader name={customer?.firstName} setOpenDeal={setOpenDeal} />

      {openForm && !openComment && (
        <EmailForm
          customerEmail={customer?.email}
          customerId={customer?._id}
          setOpenEmail={setOpen}
        />
      )}

      {!openForm && openComment && (
        <CommentForm customerId={customer?._id} setOpenCmt={setOpenCmt} />
      )}

      <div className="flex-1 flex flex-col overflow-hidden">
        <CustomerNavigation tagName={tagName} setTagName={setTagName} />

        <div className="flex-1 overflow-auto">
          {tagName === "activity" ? <Activity id={id} /> : null}
          {tagName === "email" ? (
            <Email customer={customer} setOpenEmailForm={setOpen} />
          ) : null}
          {tagName === "comment" ? (
            <Comment customerId={customer._id} setOpenForm={setOpenCmt} />
          ) : null}
          {tagName === "data" ? <Data customerId={customer._id} /> : null}
          {tagName === "task" ? (
            <Task customerId={customer._id} user={customer.userId} />
          ) : null}
          {tagName === "note" ? <Note customerId={customer._id} /> : null}
          {tagName === "customer_care" ? (
            <CustomerCare customerId={customer._id} />
          ) : null}
          {tagName === "deal" ? (
            <CustomerDeal customerId={customer._id} columns={defaultColumns} />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default CustomerInfo;
