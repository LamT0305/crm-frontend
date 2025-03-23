import React, { useEffect } from "react";
import useComment from "../hooks/useComment";
import ChatIcon from "../assets/commentIcon";
import CloseIcon from "../assets/CloseIcon";
import useActivity from "../hooks/useActivity";

function Comment({ customerId }) {
  const { isLoading, comments, handleGetComments, handleDeleteCmt } =
    useComment();
  const { handleAddActivity } = useActivity();
  useEffect(() => {
    if (customerId) {
      handleGetComments(customerId);
    }
  }, [customerId]);

  const onDelete = (id, content) => {
    handleDeleteCmt(id);
    const activity = {
      customerId: customerId,
      type: "comment",
      subject: "has deleted comment: " + '"' + content + '"',
    };
    handleAddActivity(activity);
  };

  return (
    <div className="bg-white h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between shadow-md py-2 px-8">
        <p className="font-bold text-lg">Comments</p>
        <p className="bg-black py-1 px-2 cursor-pointer rounded-xl text-white hover:bg-gray-200 hover:text-black">
          + Comment
        </p>
      </div>

      {comments.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-gray-400 h-full">
          <ChatIcon className={"h-8 w-8 text-gray-400"} />
          <p>Comment empty</p>
        </div>
      ) : (
        <div className="px-10 py-8 max-h-[clamp(200px,75vh,75vh)] overflow-auto">
          {comments.map((cmt) => (
            <div key={cmt._id} className=" flex flex-row justify-start mb-8">
              <div className="w-10">
                <ChatIcon className={"w-4 h-4 text-gray-500"} />
              </div>

              <div className="flex flex-col items-start w-[80%]">
                <p className="text-sm text-gray-500 mb-2">
                  <span className="font-bold  text-black">
                    {cmt.userId.name}{" "}
                  </span>
                  added a <span className="font-bold text-black">comment</span>
                </p>
                <div className="flex items-center justify-between bg-gray-100 w-full px-5 py-3 rounded-xl text-black">
                  <p>{cmt.content}</p>

                  <div
                    onClick={() => onDelete(cmt._id, cmt.content)}
                    className="w-fit"
                  >
                    <CloseIcon
                      className={
                        "w-6 h-6 p-1 bg-gray-200 rounded-lg cursor-pointer hover:bg-red-400 hover:text-white"
                      }
                    />
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
