import React, { useState, useRef, useEffect } from "react";
import AttachIcon from "../../assets/AttachIcon";
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

  const viewRef = useRef(null);

  const handleFilesSelect = (files) => {
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
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
        subject: "has sent an email with subject: " + '"' + subject + '"',
      };
      handleAddActivity(activity);

      setSubject("");
      setText("");
      setSelectedFiles([]);
      setView(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (viewRef.current && !viewRef.current.contains(e.target)) {
        setView(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
            Compose Email
          </h2>
          <button
            onClick={() => setOpenEmail(false)}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-all duration-300"
          >
            <svg
              className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSend} className="space-y-4">
          <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <span className="text-gray-700 font-medium">To:</span>
              <div className="text-gray-900">{customerEmail}</div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <span className="text-gray-700 font-medium">Subject:</span>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="flex-1 bg-transparent outline-none text-gray-900 placeholder-gray-400"
                placeholder="Add a subject"
                required
              />
            </div>
          </div>

          <div className="relative group">
            <textarea
              ref={textAreaRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full min-h-[300px] p-4 bg-gray-50 rounded-lg
                       text-gray-900 placeholder-gray-400 text-base leading-relaxed
                       border border-gray-200 focus:border-blue-500
                       transition-all duration-300 resize-none
                       focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Write your message here..."
              required
            />
            <div className="absolute bottom-3 right-3 text-sm text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {text.length} characters
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div className="flex items-center gap-4">
              <div className="relative">
                <AttachIcon onFilesSelect={handleFilesSelect} />
                {selectedFiles.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full transition-all duration-300">
                    {selectedFiles.length}
                  </span>
                )}
              </div>

              {selectedFiles.length > 0 && (
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setView(!viewAttached)}
                    className="text-blue-500 hover:text-blue-600 text-sm font-medium transition-colors duration-300"
                  >
                    {selectedFiles.length} file
                    {selectedFiles.length > 1 ? "s" : ""} attached
                  </button>

                  {viewAttached && (
                    <div
                      ref={viewRef}
                      className="absolute bottom-full mb-2 left-0 bg-white rounded-lg 
                               shadow-lg border border-gray-200 p-4 w-72 transition-all duration-300"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-medium text-gray-900">
                          Attachments
                        </h3>
                        <button
                          type="button"
                          onClick={() => setSelectedFiles([])}
                          className="text-sm text-red-500 hover:text-red-600 transition-colors duration-300"
                        >
                          Remove all
                        </button>
                      </div>
                      <div className="space-y-2 max-h-48 overflow-auto">
                        {selectedFiles.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between bg-gray-50 p-2 rounded-lg"
                          >
                            <span className="text-sm text-gray-900 truncate max-w-[180px]">
                              {file.name}
                            </span>
                            <span className="text-xs text-gray-500">
                              {(file.size / 1024).toFixed(1)} KB
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setOpenEmail(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 
                          hover:bg-gray-100 rounded-lg transition-all duration-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!text.trim() || !subject.trim()}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg font-medium
                          hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed
                          transform hover:-translate-y-0.5 active:translate-y-0
                          transition-all duration-300"
              >
                Send
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EmailForm;
