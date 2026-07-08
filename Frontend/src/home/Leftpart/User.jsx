import React from "react";
import useConversation from "../../zustand/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";
import { defaultAvatar } from "../../components/ProfileModal";

function User({ user }) {
  const { selectedConversation, setSelectedConversation, unreadMessages, clearUnreadMessages } = useConversation();
  const isSelected = selectedConversation?._id === user._id;
  const { socket, onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(user._id);

  const unreadCount = unreadMessages?.[user._id] || 0;

  const handleClick = () => {
    setSelectedConversation(user);
    if (unreadCount > 0) {
      clearUnreadMessages(user._id);
    }
  };

  return (
    <div
      className={`hover:bg-slate-600 duration-300  mt-2 ${
        isSelected ? "bg-slate-700 " : ""
      }`}
      onClick={handleClick}>
      <div className="flex space-x-4 px-5 py-2 hover:bg-slate-700 duration-300 cursor-pointer items-center justify-between">
        <div className="flex space-x-4 items-center">
          <div className={`avatar ${isOnline ? "online" : ""}`}>
            <div className="w-14 rounded-full">
              <img
                src={user.avatar || defaultAvatar}
                alt={`${user.fullname || user.name || "User"}'s profile`}
              />
            </div>
            {isOnline && (
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
            )} 
          </div>
          <div>
            <h1 className="font-bold">{user.fullname || user.name}</h1>
            <span>{user.email}</span>
          </div>
        </div>

        {/* Unread count badge */}
        {unreadCount > 0 && (
          <span className="bg-green-500 text-slate-900 font-bold rounded-full w-6 h-6 flex items-center justify-center text-xs animate-pulse">
            {unreadCount}
          </span>
        )}
      </div>
    </div>
  );
}

export default User;
