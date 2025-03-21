import React, { useState } from "react";
import useEmail from "../hooks/useEmail";
import MailIcon from "../assets/mailIcon";
import userAvatar from "../assets/user-avatar.png";
import customerAvatar from "../assets/user.png";

function Email({ customer, setOpenEmailForm }) {
  const { emails, handleGetEmails } = useEmail();
  useState(() => {
    if (customer) handleGetEmails(customer.email);
  }, [customer]);

  return (
    <div className="bg-white h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between shadow-md py-2 px-8">
        <p className="font-bold text-lg">Emails</p>
        <p
          onClick={() => setOpenEmailForm(true)}
          className="bg-black py-1 px-2 cursor-pointer rounded-xl text-white hover:bg-gray-200 hover:text-black"
        >
          + New email
        </p>
      </div>

      {emails.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-grow text-2xl text-gray-400">
          <MailIcon className="w-10 h-10 text-gray-400" />
          No emails
        </div>
      ) : (
        <div className="flex flex-col flex-grow">
          <div className="max-h-[clamp(200px,75vh,75vh)] flex flex-col overflow-y-auto">
            {emails.map((email) => (
              <div key={email._id} className="flex">
                <div className="w-[10%] flex justify-center py-4">
                  {email.status === "sent" ? (
                    <img
                      src={userAvatar}
                      alt=""
                      style={{ width: 50, height: 50, objectFit: "cover" }}
                      className="rounded-3xl shadow-md"
                    />
                  ) : (
                    <img
                      src={customerAvatar}
                      alt=""
                      style={{ width: 50, height: 50, objectFit: "cover" }}
                      className="rounded-3xl shadow-md"
                    />
                  )}
                </div>
                <div className="border border-gray-300 w-[80%] p-4 rounded-xl my-5">
                  {email.status === "sent" ? (
                    <div className="flex items-center">
                      <p>{email.userId.name}</p>
                      <p className="text-gray-400 ml-2 text-sm">
                        {"<<"}
                        {email.userId.email}
                        {">>"}
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <p>{`${customer.firstName} ${customer.lastName}`}</p>
                      <p className="text-gray-400 ml-2 text-sm">
                        {"<<"}
                        {customer.email}
                        {">>"}
                      </p>
                    </div>
                  )}
                  <p>
                    <span className="text-gray-400">To:</span>{" "}
                    {email.status === "sent" ? email.to : email.userId.email}
                  </p>
                  <p className="">{email.subject}</p>
                  <hr className="my-2 border-gray-300" />
                  <div className="text-sm whitespace-pre-line">
                    <EmailDisplay emailText={email.message} />
                  </div>
                  {email.attachments &&
                    email.attachments.map((attachment) => (
                      <div
                        key={attachment._id}
                        className="mt-2 bg-gray-300 w-fit px-4 py-1 rounded-lg text-black cursor-pointer hover:text-blue-500"
                      >
                        <a
                          href={attachment.path}
                          target="_blank"
                          className="underline cursor-pointer"
                        >
                          {attachment.filename}
                        </a>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Email;

const EmailDisplay = ({ emailText }) => {
  // Split lines and process them
  const lines = emailText.split("\r\n").map((line, index) => {
    let depth = 0;

    // Detect nested quotes and calculate depth
    const match = line.match(/^(>+)/);
    if (match) {
      depth = match[0].length; // Count leading '>' to determine depth
      line = line.substring(depth).trim(); // Remove '>' and trim
    }

    // Format prefix based on depth
    const prefix = depth > 0 ? `${"  ".repeat(depth - 1)}|` : "";

    // Convert email addresses to clickable links
    const emailPattern = /([\w.-]+@[\w.-]+\.\w+)/g;
    const processedLine = line.replace(
      emailPattern,
      (match) => `<a href="mailto:${match}">${match}</a>`
    );

    return (
      <div
        key={index}
        style={{
          paddingLeft: `${depth * 10}px`, // Indentation for nested replies
          // borderLeft: depth > 0 ? "2px solid #ccc" : "none", // Border for replies
          marginLeft: depth > 0 ? "5px" : "0",
          // paddingBottom: "5px",
          whiteSpace: "pre-wrap", // Preserve formatting
        }}
      >
        {prefix} <span dangerouslySetInnerHTML={{ __html: processedLine }} />
      </div>
    );
  });

  return (
    <div style={{ fontFamily: "Arial, sans-serif", lineHeight: "1.5" }}>
      {lines}
    </div>
  );
};
