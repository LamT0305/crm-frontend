import React, { useState, useRef, useEffect, use } from "react";
import { formatDistanceToNow, getHours, set } from "date-fns";
import { notify } from "../../utils/Toastify";
import ExclamationMark from "../../assets/ExclamationMark";
import useMessage from "../../hooks/useMessage";
import AddUserIcon from "../../assets/AddUserIcon";
import useUser from "../../hooks/useUser";
import { useAuth } from "../../context/AuthContext";

const ChatBox = ({
  currentUser,
  currentChat,
  messages,
  onSendMessage,
  onDeleteMessage,
  loading,
}) => {
  const { group, setGroupDetails } = useMessage();
  const [newMessage, setNewMessage] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [viewDetail, setViewDetail] = useState(false);
  const [viewMembers, setViewMembers] = useState(false);
  const [viewAttachment, setViewAttachment] = useState(false);

  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const fileInputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (currentChat) {
      setViewDetail(false);
    }
  }, [currentChat]);

  const handleSend = (e) => {
    e.preventDefault();
    if (newMessage.trim() || attachments.length > 0) {
      const formData = new FormData();
      if (currentChat.type === "group") {
        formData.append("groupId", currentChat._id);
      } else if (currentChat.type === "direct") {
        formData.append("receiverId", currentChat._id);
      } else {
        notify.error("Invalid chat type");
        return;
      }
      formData.append("content", newMessage.trim());
      attachments.forEach((file) => {
        formData.append("files", file);
      });
      onSendMessage(formData);
      setNewMessage("");
      setAttachments([]);
    }
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setAttachments((prev) => [...prev, ...files]);
  };

  const removeAttachment = (index) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const isOwnMessage = (message) => {
    return message.sender._id === currentUser._id;
  };

  if (!currentChat) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 rounded-lg bg-white shadow-sm">
          <p className="text-xl text-gray-500 font-medium">
            Select a conversation to start messaging
          </p>
          <p className="text-sm text-gray-400 mt-2">
            Choose from your existing chats or start a new conversation
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Chat Header */}
      <div className="px-8 py-5 flex items-center justify-between bg-white border-b border-gray-100">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <div className="">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center overflow-hidden mr-4 shadow-lg">
                {currentChat.avatar ? (
                  <img
                    src={currentChat.avatar}
                    alt={currentChat.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-white text-xl font-semibold">
                    {currentChat.name.charAt(0)}
                  </span>
                )}
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {currentChat.name}
              </h2>
              <p className="text-sm text-gray-500 flex items-center">
                <span
                  className={`w-2 h-2 rounded-full ${
                    currentChat.type === "group"
                      ? "bg-purple-500"
                      : "bg-green-500"
                  } mr-2`}
                ></span>
                {currentChat.type === "group"
                  ? `${currentChat.members?.length || 0} members`
                  : "Active now"}
              </p>
            </div>
          </div>

          <div
            onClick={() => {
              setViewDetail(true);
              if (currentChat.type === "group") {
                setGroupDetails(currentChat._id);
              }
            }}
            className="cursor-pointer"
          >
            <ExclamationMark className={"w-6 h-6"} />
          </div>
        </div>
      </div>

      {/* Messages Area */}
      {!viewDetail ? (
        <MessageArea
          messages={messages}
          chatref={chatContainerRef}
          messageEndRef={messagesEndRef}
          isOwnMessage={isOwnMessage}
          onDeleteMessage={onDeleteMessage}
        />
      ) : (
        <DetailsModal
          viewMembers={viewMembers}
          setViewMembers={setViewMembers}
          viewAttachment={viewAttachment}
          setViewAttachment={setViewAttachment}
          currentChat={currentChat}
          setView={setViewDetail}
          group={group}
          getGroupDetails={setGroupDetails}
        />
      )}

      {/* Message Input */}
      {!viewDetail && (
        <form onSubmit={handleSend} className="px-6 py-4 bg-white">
          {/* Attachment preview */}
          {attachments.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {attachments.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full"
                >
                  <span className="text-sm truncate max-w-[200px]">
                    {file.name}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeAttachment(index)}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-3 rounded-full hover:bg-gray-100 transition-colors duration-200"
            >
              <svg
                className="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                />
              </svg>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              className="hidden"
              multiple
            />
            <input
              type="text"
              className="flex-1 border border-gray-200 rounded-full px-6 py-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button
              type="submit"
              disabled={!newMessage.trim() && attachments.length === 0}
              className={`p-3 rounded-full transition-colors duration-200 ${
                newMessage.trim() || attachments.length > 0
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
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
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ChatBox;

const MessageArea = ({
  messages,
  chatref,
  messageEndRef,
  isOwnMessage,
  onDeleteMessage,
}) => {
  return (
    <div
      ref={chatref}
      className="flex-1 overflow-auto p-6 space-y-6 bg-gradient-to-b from-gray-50 to-white"
    >
      {Array.isArray(messages) &&
        messages.map((message) => (
          <div
            key={message._id}
            className={`flex gap-3 group ${
              isOwnMessage(message) ? "flex-row-reverse" : "flex-row"
            }`}
          >
            <div className="w-8 h-8 rounded-full bg-blue-100 flex-shrink-0 overflow-hidden">
              {message.sender.avatar ? (
                <img
                  src={message.sender.avatar}
                  alt={message.sender.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="w-full h-full flex items-center justify-center text-blue-600 font-medium">
                  {message.sender?.name?.charAt(0)}
                </span>
              )}
            </div>
            <div
              className={`max-w-[70%] flex flex-col ${
                isOwnMessage(message) ? "items-end" : "items-start"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium text-gray-700">
                  {message.sender.name}
                </span>
                <span className="text-xs text-gray-500">
                  {formatDistanceToNow(new Date(message.createdAt), {
                    addSuffix: true,
                  })}
                </span>
              </div>
              <div
                className={`p-3 rounded-2xl shadow-sm max-w-[25vw] break-words ${
                  isOwnMessage(message)
                    ? "bg-blue-600 text-white"
                    : "bg-white border border-gray-100 text-gray-800"
                }`}
              >
                <p className="leading-relaxed">{message.content}</p>
              </div>
              <div>
                {message.attachments && message.attachments.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {message.attachments.map((attachment) => (
                      <div key={attachment._id}>
                        <a
                          href={attachment.path || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500! hover:text-blue-700! underline!"
                        >
                          {attachment.filename}
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {isOwnMessage(message) && (
                <button
                  onClick={() => onDeleteMessage(message._id)}
                  className="text-gray-400 hover:text-red-500 transition-colors duration-200 p-1 mt-1 opacity-0 group-hover:opacity-100"
                  title="Delete message"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        ))}
      <div ref={messageEndRef} />
    </div>
  );
};

const DetailsModal = ({
  viewMembers,
  setViewMembers,
  viewAttachment,
  setViewAttachment,
  currentChat,
  setView,
  getGroupDetails,
  group,
}) => {
  const {
    loading,
    attachments,
    handleGetAttachmentsInDirectMS,
    handleGetAttachmentsInGroupMS,
    addMemberToGroup,
    handleRemoveMember,
    handleDeleteGroup,
  } = useMessage();
  const { users, handleGetWorkspaceUsers } = useUser();
  const [openForm, setOpenForm] = useState(false);
  const { user } = useAuth();

  const handleAddMember = () => {
    // Logic to add a member goes here
    setOpenForm(true);
    handleGetWorkspaceUsers();
  };

  useEffect(() => {
    if (currentChat.type === "group") {
      getGroupDetails(currentChat._id);
    }
  }, [currentChat]);

  const modalRef = useRef(null);
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setView(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [setView]);

  const onViewAttachments = () => {
    if (currentChat.type === "group") {
      handleGetAttachmentsInGroupMS(currentChat._id);
    } else {
      handleGetAttachmentsInDirectMS(currentChat._id);
    }
    setViewAttachment(!viewAttachment);
  };

  return (
    <div className="flex-1 overflow-auto space-y-6 bg-gradient-to-b from-gray-50 to-white">
      <div className="bg-white rounded-lg p-8 shadow-2xl w-full h-full">
        <div className="cursor-pointer" onClick={() => setView(false)}>
          <svg
            className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </div>
        <div className="w-full flex justify-center">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-blue-600 text-lg">
              {currentChat.name.charAt(0)}
            </span>
          </div>
        </div>

        {openForm && (
          <AddMemberForm
            openForm={openForm}
            setOpenForm={setOpenForm}
            users={users}
            members={group?.members || []}
            handleAddMember={addMemberToGroup}
            group={group}
          />
        )}
        <h2 className="text-2xl font-bold mb-4 text-gray-800 w-full text-center">
          {currentChat.name}
        </h2>

        {currentChat.type === "group" &&
          group &&
          user &&
          group.creator?._id === user._id && (
            <div className="flex justify-center">
              <div onClick={handleAddMember}>
                <AddUserIcon
                  className={
                    "w-15 h-15 border p-3 rounded-full cursor-pointer mr-2"
                  }
                />
              </div>

              <div>
                <svg
                  className="w-15 h-15 border p-3 rounded-full cursor-pointer text-red-500 hover:text-red-600 transition-colors duration-200 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  onClick={() => {
                    if (
                      window.confirm(
                        "Are you sure you want to delete this group? This action cannot be undone."
                      )
                    ) {
                      handleDeleteGroup(group._id);
                    }
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </div>
            </div>
          )}
        <div className="flex flex-col items-center w-full max-h-[50vh] overflow-y-auto">
          <h3
            onClick={() => onViewAttachments()}
            className="text-lg font-semibold mt-4 mb-2 text-gray-700 shadow-md px-3 py-4 rounded-3xl border border-gray-200 cursor-pointer w-full"
          >
            View attachments
          </h3>
          {viewAttachment && (
            <>
              {loading ? (
                <div className="flex justify-center items-center p-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : (
                <>
                  {attachments && (
                    <div className="mt-4 space-y-2 max-h-[40vh] overflow-y-auto w-full">
                      {attachments.map((a) => (
                        <div
                          key={a._id}
                          className="flex items-center gap-3 p-3 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition-colors duration-200"
                        >
                          <svg
                            className="w-6 h-6 text-blue-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                            />
                          </svg>
                          <a
                            target="_blank"
                            href={a.path || "#"}
                            className="text-blue-600 hover:text-blue-800 underline"
                          >
                            {a.filename}
                          </a>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </>
          )}

          {currentChat.type === "group" && (
            <>
              <h3
                onClick={() => setViewMembers(!viewMembers)}
                className="text-lg font-semibold mt-4 mb-2 text-gray-700 shadow-md px-3 py-4 rounded-3xl border border-gray-200 cursor-pointer w-full"
              >
                View group members
              </h3>

              {viewMembers && (
                <>
                  {loading ? (
                    <div className="flex justify-center items-center p-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                  ) : (
                    group && (
                      <div className="mt-4 bg-white rounded-xl shadow-sm max-h-[40vh] overflow-y-auto w-full">
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                  Name
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                  Email
                                </th>
                                {group.creator &&
                                  user &&
                                  group.creator._id === user._id && (
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                      Action
                                    </th>
                                  )}
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {[...group.members]
                                ?.sort((a, b) => {
                                  if (a._id === group.creator._id) return -1;
                                  if (b._id === group.creator._id) return 1;
                                  return 0;
                                })
                                .map((member, index) => (
                                  <tr
                                    key={member._id}
                                    className="hover:bg-gray-50 transition-colors duration-200"
                                  >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <div className="flex items-center">
                                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                                          <span className="text-blue-600 font-medium text-sm">
                                            {member.name.charAt(0)}
                                          </span>
                                        </div>
                                        <div className="ml-4">
                                          <div className="text-sm font-medium text-gray-900">
                                            {member.name}
                                          </div>
                                          {member._id === group.creator._id && (
                                            <div className="text-xs text-blue-600">
                                              Group Admin
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                      {member.email}
                                    </td>
                                    {group.creator &&
                                      user &&
                                      group.creator._id === user._id &&
                                      member._id !== group.creator._id && (
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex justify-start">
                                          <button
                                            onClick={() =>
                                              handleRemoveMember(
                                                group._id,
                                                member._id
                                              )
                                            }
                                            className="text-red-600 hover:text-red-900 transition-colors duration-200"
                                          >
                                            Remove
                                          </button>
                                        </td>
                                      )}
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const AddMemberForm = ({
  setOpenForm,
  users,
  members,
  handleAddMember,
  group,
}) => {
  const [text, setText] = useState("");
  const [userId, setUserId] = useState("");
  const [viewListUser, setViewListUser] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setOpenForm(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (group && text && userId) {
      handleAddMember(group._id, userId);
      setText("");
      setUserId("");
      setOpenForm(false);
    } else {
      notify.error("Please provide an email!");
    }
  };

  const filterUsers = users?.filter(
    (user) => !members?.some((us) => us._id === user._id)
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div
        ref={formRef}
        className="bg-white rounded-2xl p-8 shadow-2xl w-full max-w-md"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Add a new member</h2>
          <button
            onClick={() => setOpenForm(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email address
            </label>
            <div className="relative">
              <input
                onClick={() => setViewListUser(true)}
                value={text}
                onChange={(e) => setText(e.target.value)}
                type="email"
                id="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Search by email..."
              />
              {text && (
                <button
                  type="button"
                  onClick={() => setText("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>

            {viewListUser && text.length > 0 && (
              <div className="mt-2 max-h-[240px] overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg">
                <ul className="divide-y divide-gray-200">
                  {filterUsers &&
                    filterUsers
                      .filter((user) =>
                        user.email.toLowerCase().includes(text.toLowerCase())
                      )
                      .map((user) => (
                        <li
                          key={user._id}
                          className="p-4 hover:bg-gray-50 cursor-pointer transition-colors duration-150 flex items-center space-x-3"
                          onClick={() => {
                            setText(user.email);
                            setUserId(user._id);
                            setViewListUser(false);
                          }}
                        >
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-medium text-sm">
                              {user.email.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <span className="text-gray-700">{user.email}</span>
                        </li>
                      ))}
                </ul>
              </div>
            )}
          </div>

          <div className="flex items-center justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => setOpenForm(false)}
              className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
            >
              Add member
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
