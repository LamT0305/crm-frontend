import React, { useState } from "react";
import MailIcon from "../assets/mailIcon";
import ChatIcon from "../assets/commentIcon";
import EmailForm from "./form/EmailForm";
import CommentForm from "./form/CommentInput";

function CustomerFooter({ customerEmail, id }) {
  const [openForm, setOpen] = useState(false);
  const [openComment, setOpenCmt] = useState(false);
  return (
    <>
      {openForm && !openComment ? (
        <EmailForm
          customerEmail={customerEmail}
          setOpenEmail={setOpen}
          customerId={id}
        />
      ) : null}

      {!openForm && openComment ? (
        <CommentForm setOpenCmt={setOpenCmt} customerId={id} />
      ) : null}

      {!openComment && !openForm ? (
        <div className="flex items-center bg-white w-[100%] py-3 px-3 text-lg border-r border-gray-300 shadow-sm">
          <div
            onClick={() => {
              setOpen(true);
              setOpenCmt(false);
            }}
            className="flex items-center hover:bg-gray-200 w-fit px-2 py-1 rounded-md cursor-pointer"
          >
            <MailIcon className={"h-4 w-4 text-gray-500"} />
            <p className="text-xs font-normal ml-1">Email</p>
          </div>
          <div
            onClick={() => {
              setOpen(false);
              setOpenCmt(true);
            }}
            className="flex items-center hover:bg-gray-200 w-fit px-2 py-1 rounded-md cursor-pointer"
          >
            <ChatIcon />
            <p className="text-xs font-normal ml-1">Comment</p>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default CustomerFooter;
