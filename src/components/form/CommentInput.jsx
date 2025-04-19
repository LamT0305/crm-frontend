import React, { useEffect, useRef, useState } from "react";
import useComment from "../../hooks/useComment";

function CommentForm({ setOpenCmt, customerId }) {
  const [text, setText] = useState("");
  const { handleAddComment } = useComment();

  const handleAdd = () => {
    const comment = new FormData();
    comment.append("customerId", customerId);
    comment.append("content", text);

    if (customerId) {
      handleAddComment(comment, customerId);
    }
    setText("");
    setOpenCmt(false);
  };

  const cmtRef = useRef(null);
  useEffect(() => {
    //handle click outside
    const handleClickOutside = (e) => {
      if (cmtRef.current && !cmtRef.current.contains(e.target)) {
        setOpenCmt(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });
  return (
    <div
      ref={cmtRef}
      className="bg-white rounded-lg shadow-lg absolute bottom-0 w-[80%]"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
            Add Comment
          </h2>
          <button
            onClick={() => setOpenCmt(false)}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg
              className="w-5 h-5"
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

        <div className="relative">
          <textarea
            className="w-full min-h-[200px] p-4 bg-gray-50 rounded-lg
                     text-gray-900 placeholder-gray-400
                     border border-gray-200 focus:border-blue-500
                     resize-none focus:outline-none focus:ring-1 focus:ring-blue-500
                     transition-colors"
            placeholder="Type your comment here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="absolute bottom-3 right-3 text-sm text-gray-400">
            {text.length} characters
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 mt-6 pt-6 border-t border-gray-100">
          <button
            onClick={() => setOpenCmt(false)}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 
                     hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            disabled={!text.trim()}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg
                     hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed
                     transition-colors"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default CommentForm;
