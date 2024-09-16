import React, { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "../Messages/Message";
import useListenMessage from "../../hooks/useListenMessage";

const Messages = () => {
  const { messages, loading } = useGetMessages();
  useListenMessage();

  const lastMessageRef = useRef();

  useEffect(() => {
    // Ensure the scroll only happens after the messages have been rendered
    if (messages.length > 0) {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    console.log(messages)
  }, [messages]);

  return (
    <div className="px-4 flex-1 overflow-auto ">
      {!loading && messages.length > 0
        ? messages.map((message, index) => (
            <div
              key={message._id}
              ref={index === messages.length - 1 ? lastMessageRef : null}
            >
              <Message message={message} />
            </div>
          ))
        : null}
      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading && messages.length === 0 && (
        <p>Send a message to start a conversation</p>
      )}
    </div>
  );
};

export default Messages;
