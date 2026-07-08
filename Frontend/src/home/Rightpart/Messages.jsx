import React, { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessage from "../../context/useGetMessage.js";
import Loading from "../../components/Loading.jsx";
function Messages() {
  const { loading, messages } = useGetMessage();
  console.log(messages);

  const lastMsgRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      if (lastMsgRef.current) {
        lastMsgRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  }, [messages]);
  return (
    <div
      className="overflow-y-auto scroll-smooth w-full px-5 h-full "
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
      {loading ? (
        <Loading />
      ) : (
        messages.length > 0 &&
        messages.map((message) => (
          <div key={message._id} ref={lastMsgRef}>
            <Message message={message} />
          </div>
        ))
      )}
      {!loading && messages.length === 0 && (
        <div>
          <p className="text-center mt-14">Say! Hi to start the conversation</p>
        </div>
      )}
    </div>
  );
}

export default Messages;
