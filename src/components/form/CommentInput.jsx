import React, { useState } from "react";
import useComment from "../../hooks/useComment";
import useActivity from "../../hooks/useActivity";

function CommentForm({ setOpenCmt, customerId }) {
  const [text, setText] = useState("");
  const { handleAddComment } = useComment();
  const { handleAddActivity } = useActivity();
  const handleAdd = () => {
    const comment = new FormData();
    comment.append("customerId", customerId);
    comment.append("content", text);

    const activity = {
      customerId: customerId,
      type: "comment",
      subject: "added a comment",
    };

    if (customerId) {
      handleAddComment(comment);
      handleAddActivity(activity);
    }
    setText("");
    setOpenCmt(false);
  };
  return (
    <div className="bg-white px-10 py-5 border-t border-gray-300">
      <p className="p-2 text-lg font-semibold text-gray-500 border-b border-gray-300 mb-2">
        Content
      </p>
      <textarea
        className="w-full p-2 rounded-md text-md resize-none focus:outline-none focus:ring-0 focus:border-transparent"
        rows="6"
        placeholder="Type your comment here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <hr className="border-gray-200" />

      <div className="flex items-center justify-end pr-10 py-2">
        <p
          onClick={() => setOpenCmt(false)}
          className="bg-black hover:bg-gray-200 text-white hover:text-black font-semibold py-1 px-2 mx-2 rounded-md cursor-pointer"
        >
          Discard
        </p>
        <p
          onClick={() => handleAdd()}
          className="bg-black hover:bg-gray-200 text-white hover:text-black font-semibold py-1 px-2 mx-2 rounded-md cursor-pointer"
        >
          Send
        </p>
      </div>
    </div>
  );
}

export default CommentForm;
