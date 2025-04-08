import React, { useState, useRef, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { notify } from "../../utils/Toastify";

const ChatBox = ({
  currentUser,
  currentChat,
  messages,
  onSendMessage,
  onDeleteMessage,
  loading,
}) => {
  const [newMessage, setNewMessage] = useState("");
  const [attachments, setAttachments] = useState([]);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const fileInputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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

  console.log(messages);
  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Chat Header */}
      <div className="px-8 py-5 flex items-center justify-between bg-white border-b border-gray-100">
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
      </div>

      {/* Messages Area */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-auto p-6 space-y-6 bg-gradient-to-b from-gray-50 to-white"
      >
        {messages.map((message) => (
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
                  {message.sender.name.charAt(0)}
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
                        {console.log(attachment)}
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
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
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
    </div>
  );
};

export default ChatBox;
