import React from "react";
import useConversation from "../../zustand/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";
import { defaultAvatar } from "../../components/ProfileModal";

function Chatuser() {
  const { selectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();

  const getOnlineUsersStatus = (userId) => {
    if (!userId) return "offline";
    return onlineUsers.includes(userId) ? "online" : "offline";
  };

  const isUserOnline = getOnlineUsersStatus(selectedConversation?._id) === "online";

  return (
    <div className="flex space-x-3 items-center justify-center w-full bg-gray-800 hover:bg-gray-700 duration-300 ">
      <div className="relative">
        <div className={`avatar ${isUserOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full ">
            <img
              src={selectedConversation?.avatar || defaultAvatar}
              className="rounded-full"
            />
          </div>
        </div>
        {/* Online/Offline Indicator */}
        <span
          className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-gray-800 ${
            isUserOnline ? "bg-green-500" : "bg-gray-500"
          }`}
        ></span>
      </div>
      <div>
        <h1 className="text-xl">
          {selectedConversation?.fullname || selectedConversation?.name || "Unknown User"}
        </h1>
        <span className="text-sm">
          {getOnlineUsersStatus(selectedConversation?._id)}
        </span>
      </div>
    </div>
  );
}

export default Chatuser;
