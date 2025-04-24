import React, { useEffect } from "react";
import useComment from "../../hooks/useComment";
import ChatIcon from "../../assets/commentIcon";
import CloseIcon from "../../assets/CloseIcon";

function Comment({ customerId, setOpenForm }) {
  const { isLoading, comments, handleGetComments, handleDeleteCmt } =
    useComment();

  useEffect(() => {
    if (customerId) {
      handleGetComments(customerId);
    }
  }, [customerId]);

  const onDelete = (id, content) => {
    handleDeleteCmt(id, customerId, content);
  };

  return (
    <div className="bg-white h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <ChatIcon className="w-5 h-5 text-blue-500" />
              Comments
            </h2>
          </div>

          <button
            onClick={() => setOpenForm(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200 flex items-center gap-2"
          >
            <span>+</span>
            Add Comment
          </button>
        </div>
      </div>

      {comments && comments.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1 text-gray-400">
          <ChatIcon className="h-8 w-8 text-gray-400" />
          <p>Comment empty</p>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto px-10 py-8 space-y-8">
          {comments.map((cmt) => (
            <div key={cmt._id} className="flex flex-row justify-start">
              <div className="w-10">
                <ChatIcon className="w-4 h-4 text-gray-500" />
              </div>
              <div className="flex flex-col items-start w-full max-w-3xl">
                <p className="text-sm text-gray-500 mb-2">
                  <span className="font-bold text-black">
                    {cmt.userId.name}
                  </span>{" "}
                  added a <span className="font-bold text-black">comment</span>
                </p>
                <div className="flex items-center justify-between bg-gray-100 w-full px-5 py-3 rounded-xl text-black">
                  <p className="break-words mr-4 whitespace-pre-wrap">
                    {cmt.content}
                  </p>
                  <div
                    onClick={() => onDelete(cmt._id, cmt.content)}
                    className="w-fit flex-shrink-0"
                  >
                    <CloseIcon className="w-6 h-6 p-1 bg-gray-200 rounded-lg cursor-pointer hover:bg-red-400 hover:text-white" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Comment;
