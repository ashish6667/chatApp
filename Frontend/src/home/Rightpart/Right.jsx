import React from "react";
import Chatuser from "./Chatuser";
import Messages from "./Messages";
import Typesend from "./Typesend";
import useConversation from "../../zustand/useConversation.js";
import { useAuth } from "../../context/AuthProvider.jsx";

function Right() {
  const { selectedConversation } = useConversation();

  return (
    <div className="w-full bg-slate-900 text-gray-300">
      <div className="h-screen flex flex-col">
        {!selectedConversation ? (
          <NoChatSelected />
        ) : (
          <>
            <Chatuser />
            <div className="flex-1 overflow-y-auto h-full w-full">
              <Messages />
            </div>
            <Typesend />
          </>
        )}
      </div>
    </div>
  );
}

export default Right;

const NoChatSelected = () => {
  const [authUser] = useAuth();
  console.log(authUser);
  return (
    <div className="relative">
      <div className="flex h-screen items-center justify-center">
        <h1 className="text-center">
          Welcome{" "}
          <span className="font-semibold text-xl">
            {authUser?.user?.fullname || authUser?.user?.name || "User"} (You)
          </span>
          <br />
          No chat selected, please start conversation by selecting anyone from
          your contacts.
        </h1>
      </div>
    </div>
  );
};
