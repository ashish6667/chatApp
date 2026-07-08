import React, { useEffect } from "react";
import { useSocketContext } from "./SocketContext";
import useConversation from "../zustand/useConversation.js";
import sound from "../assets/notification.mp3";
import toast from "react-hot-toast";
import useGetAllUsers from "./useGetAllUsers.jsx";

const useGetSocketMessage = () => {
  const { socket } = useSocketContext();
  const { setMessage } = useConversation();
  const [allUsers] = useGetAllUsers();

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMessage) => {
      // Play WhatsApp notification sound for any incoming message
      const notification = new Audio(sound);
      notification.play().catch((err) => console.log("Sound play error:", err));

      const { selectedConversation, messages, unreadMessages, setUnreadMessages } = useConversation.getState();

      // Append message to active conversation only if it matches the sender's ID
      if (selectedConversation && newMessage.senderId === selectedConversation._id) {
        setMessage([...messages, newMessage]);
      } else {
        // If not viewing this chat, increment unread count and show toast notification
        const currentUnreads = { ...(unreadMessages || {}) };
        currentUnreads[newMessage.senderId] = (currentUnreads[newMessage.senderId] || 0) + 1;
        setUnreadMessages(currentUnreads);

        // Find sender's name
        const sender = allUsers.find((u) => u._id === newMessage.senderId);
        const senderName = sender ? (sender.fullname || sender.name) : "Someone";
        
        toast.success(`New message from ${senderName}`, {
          duration: 4000,
          position: "top-right",
        });
      }
    };

    socket.on("newMessage", handleNewMessage);
    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, setMessage, allUsers]);
};

export default useGetSocketMessage;
