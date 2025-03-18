import React, { useState, useRef } from "react";
import AttachIcon from "../../assets/AttachIcon";
import clearIcon from "../../assets/clear.png";
import useEmail from "../../hooks/useEmail";
import useActivity from "../../hooks/useActivity";

function EmailForm({ customerEmail, setOpenEmail, customerId }) {
  const { handleSendEmail } = useEmail();
  const { handleAddActivity } = useActivity();
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");
  const textAreaRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [viewAttached, setView] = useState(false);
  const handleFilesSelect = (files) => {
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]); // Append new files
  };

  const handleSend = (e) => {
    if (customerId) {
      e.preventDefault();
      const email = new FormData();
      email.append("to", customerEmail);
      email.append("subject", subject);
      email.append("message", text);
      selectedFiles.forEach((file) => email.append("files", file));
      handleSendEmail(email);

      // activity

      const activity = {
        customerId: customerId,
        type: "email",
        subject: "has sent an email",
      };
      handleAddActivity(activity);

      setSubject("");
      setText("");
      setSelectedFiles([]);
      setView(false);
    }
  };

  return (
    <div className="bg-white px-10 py-5 border-t border-gray-300">
      <div className="flex items-center mb-5 border-b border-gray-200 pb-3">
        <p className="mr-2 text-gray-400">TO:</p>
        <p className="bg-gray-200 px-2 py-1 rounded-lg">{customerEmail}</p>
      </div>
      <form onSubmit={handleSend}>
        <div className="flex items-center mb-5 border-b border-gray-200 pb-3">
          <label htmlFor="subject" className="cursor-pointer text-gray-400">
            SUBJECT:
            <input
              id="subject"
              className="ml-2 w-150 text-black focus:outline-none focus:ring-0 focus:border-transparent"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </label>
        </div>
        <textarea
          ref={textAreaRef}
          className="w-full p-2 rounded-md text-md resize-none focus:outline-none focus:ring-0 focus:border-transparent"
          rows="6"
          placeholder="Type your message here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        ></textarea>
        <hr className="border-gray-200" />

        <div className="flex items-center justify-between pr-10 py-2">
          <div className="flex items-center justify-between">
            <AttachIcon onFilesSelect={handleFilesSelect} />

            {/* Display selected files */}
            {selectedFiles.length > 0 && (
              <div className="ml-2 flex items-center relative">
                <p
                  onClick={() => setView(!viewAttached)}
                  className="cursor-pointer bg-gray-200 py-1 px-2 rounded-lg "
                >
                  files attached
                </p>
                {viewAttached && (
                  <div className="absolute bottom-10 left-5 bg-white border border-gray-400 p-2 rounded-xl w-40">
                    <p className="font-semibold w-[100%]">Attached Files:</p>
                    <ul className="list-disc pl-4 w-[100%]">
                      {selectedFiles.map((file, index) => (
                        <li
                          key={index}
                          className="text-sm text-gray-700 w-[100%]"
                        >
                          {file.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <img
                  onClick={() => setSelectedFiles([])}
                  src={clearIcon}
                  alt=""
                  className="bg-gray-200 px-1 py-1 rounded-lg ml-2"
                  style={{ width: 30, height: 30, cursor: "pointer" }}
                />
              </div>
            )}
          </div>
          <div className="flex items-center">
            <p
              onClick={() => setOpenEmail(false)}
              className="bg-black hover:bg-gray-200 text-white hover:text-black font-semibold py-1 px-2 mx-2 rounded-md cursor-pointer"
            >
              Discard
            </p>
            <p className="bg-black hover:bg-gray-200 text-white hover:text-black font-semibold py-1 px-2 mx-2 rounded-md cursor-pointer">
              <button type="submit cursor-pointer">Send</button>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EmailForm;
