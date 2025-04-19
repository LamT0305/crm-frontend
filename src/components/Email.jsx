import React, { useState, useEffect } from "react";
import useEmail from "../hooks/useEmail";
import MailIcon from "../assets/mailIcon";
import userAvatar from "../assets/user-avatar.png";
import customerAvatar from "../assets/user.png";
import ReloadIcon from "../assets/Reload";
import CloseIcon from "../assets/CloseIcon";

function Email({ customer, setOpenEmailForm }) {
  const {
    emails,
    isLoading,
    handleGetEmails,
    handleDeleteEmail,
    handleFilterEmails,
    handleSortEmails,
  } = useEmail();

  const [sortOrder, setSortOrder] = useState(true);

  const handleSort = () => {
    handleSortEmails(sortOrder ? "asc" : "desc");
    setSortOrder(!sortOrder);
  };

  useEffect(() => {
    if (customer) handleGetEmails(customer._id);
  }, [customer]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="bg-white h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-100 shadow-sm">
        <h2 className="text-xl font-bold text-gray-800 flex items-center">
          <MailIcon className="w-6 h-6 mr-2 text-blue-500" /> Emails
        </h2>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              onChange={(e) => handleFilterEmails("subject", e.target.value)}
              type="text"
              className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Search emails..."
            />
            <svg
              className="w-5 h-5 absolute left-3 top-2.5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <button
            onClick={handleSort}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 flex items-center"
          >
            <span className="mr-2">Sort:</span>
            {sortOrder ? "Newest" : "Latest"}
          </button>

          <button
            onClick={() => setOpenEmailForm(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center"
          >
            <span className="mr-2">+</span> New Email
          </button>

          <button
            onClick={() => handleGetEmails(customer._id)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <ReloadIcon className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {emails.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-grow py-20 bg-gray-50">
          <MailIcon className="w-16 h-16 text-gray-300 mb-4" />
          <p className="text-xl font-medium text-gray-500">No emails yet</p>
          <p className="text-sm text-gray-400 mt-2">
            Start by composing a new email
          </p>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {emails.map((email) => (
            <div key={email._id} className="flex">
              <div className="w-12 flex-shrink-0">
                <img
                  src={email.status === "sent" ? userAvatar : customerAvatar}
                  alt=""
                  className="w-12 h-12 rounded-full object-cover shadow-sm"
                />
              </div>
              <div className="ml-4 flex-grow">
                <div className="bg-gray-50 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="flex items-center flex-wrap">
                        <p className="font-medium text-gray-900">
                          {email.status === "sent"
                            ? email.userId.name
                            : `${customer.firstName} ${customer.lastName}`}
                        </p>
                        <p className="text-sm text-gray-500 ml-2">
                          {`<${
                            email.status === "sent"
                              ? email.userId.email
                              : customer.email
                          }>`}
                        </p>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        To:{" "}
                        {email.status === "sent"
                          ? email.to
                          : email.userId.email}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteEmail(email._id)}
                      className="p-1.5 hover:bg-gray-200 rounded-full transition-colors duration-200"
                    >
                      <CloseIcon className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>

                  <h3 className="text-lg font-medium text-gray-800 mb-2">
                    {email.subject}
                  </h3>

                  <div className="border-t border-gray-200 pt-3">
                    <div className="text-gray-700 text-sm whitespace-pre-line max-h-[250px] overflow-y-auto">
                      <EmailDisplay emailText={email.message} />
                    </div>
                  </div>

                  {email.attachments?.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {email.attachments.map((attachment) => (
                        <a
                          key={attachment._id}
                          href={attachment.path}
                          target="_blank"
                          className="inline-flex items-center px-3 py-1.5 bg-gray-100 text-sm text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                        >
                          <svg
                            className="w-4 h-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                            />
                          </svg>
                          {attachment.filename}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const EmailDisplay = ({ emailText }) => {
  const lines = emailText.split("\r\n").map((line, index) => {
    let depth = 0;
    const match = line.match(/^(>+)/);
    if (match) {
      depth = match[0].length;
      line = line.substring(depth).trim();
    }

    const emailPattern = /([\w.-]+@[\w.-]+\.\w+)/g;
    const processedLine = line.replace(
      emailPattern,
      (match) =>
        `<a href="mailto:${match}" class="text-blue-500 hover:underline">${match}</a>`
    );

    return (
      <div
        key={index}
        className={`pl-${depth * 4} ${
          depth > 0 ? "border-l-2 border-gray-200 ml-2" : ""
        }`}
      >
        <span dangerouslySetInnerHTML={{ __html: processedLine }} />
      </div>
    );
  });

  return <div className="font-sans leading-relaxed">{lines}</div>;
};

export default Email;
