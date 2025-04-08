import React, { use, useEffect, useRef, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import SearchIcon from "../../assets/SearchIcon";
import useUser from "../../hooks/useUser";

const ChatList = ({ conversations, currentChat, onSelectChat }) => {
  const { handleGetWorkspaceUsers, handleFilterUsers, users } = useUser();
  const [showSearch, setShowSearch] = useState(false);
  const [inputValue, setInputValue] = useState("");
  useEffect(() => {
    handleGetWorkspaceUsers();
  }, []);

  const searchRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex-1">
      <div className="flex items-center justify-between w-full relative p-4">
        <h2 className="text-xl font-semibold">Direct Messages</h2>
        <div onClick={() => setShowSearch(!showSearch)}>
          <SearchIcon className={"w-[20px] h-[20px] cursor-pointer"} />
        </div>
        {showSearch && (
          <div
            ref={searchRef}
            className="absolute right-0 top-[100%] bg-white z-[1000] shadow-lg h-[30vh] overflow-y-auto p-4 w-full"
          >
            <input
              type="text"
              value={inputValue}
              placeholder="Search users"
              className="w-full border border-gray-200 p-2 rounded-md"
              onChange={(e) => {
                setInputValue(e.target.value);
                handleFilterUsers("name", e.target.value);
              }}
            />
            <>
              {users &&
                inputValue.length > 0 &&
                users.map((user) => (
                  <div
                    onClick={() => {
                      onSelectChat({ ...user, type: "direct" });
                      setShowSearch(false);
                    }}
                    key={user._id}
                    className="flex items-center gap-3 p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-blue-600 text-lg">
                        {user.name?.charAt(0)}
                      </span>
                    </div>
                    <p className="font-medium">{user.name}</p>
                  </div>
                ))}
            </>
          </div>
        )}
      </div>
      <hr className="border-gray-200" />
      <ul className="p-0">
        {conversations.map((chat) => (
          <li
            key={chat._id}
            onClick={() => {
              onSelectChat({ ...chat, type: "direct", unreadCount: 0 });
            }}
            className={`flex items-center p-3 cursor-pointer transition-colors duration-200 ${
              currentChat?._id === chat._id ? "bg-gray-100" : "hover:bg-gray-50"
            }`}
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden">
                {chat.avatar ? (
                  <img
                    src={chat.avatar}
                    alt={chat.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-blue-600 text-lg">
                    {chat.name.charAt(0)}
                  </span>
                )}
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white z-50"></div>
            </div>

            <div className="ml-3 flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <span className="font-medium">{chat.name}</span>
              </div>
              <p className="text-sm text-gray-500 truncate">
                {chat.lastMessage?.content || "No messages yet"}
              </p>
            </div>

            {chat.unreadCount > 0 && currentChat?._id !== chat._id && (
              <div className="ml-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {chat.unreadCount}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
