import React from "react";
import "./chatMessage.scss";

function ChatMessage(props) {
  return (
    <div
      className={
        props.type == "sender"
          ? "ChatMessage chatMessage-sender"
          : "ChatMessage chatMessage-receiver"
      }
    >
      {props.message}

      <svg
        viewBox="0 0 8 13"
        height="13"
        width="8"
        preserveAspectRatio="xMidYMid meet"
        className="message-conner-svg"
        version="1.1"
        x="0px"
        y="0px"
        enable-background="new 0 0 8 13"
      >
        <path
          opacity="0.13"
          className="message-conner"
          fill="currentColor"
          d="M1.533,3.568L8,12.193V1H2.812 C1.042,1,0.474,2.156,1.533,3.568z"
        ></path>
        <path
          className="message-conner"
          fill="currentColor"
          d="M1.533,2.568L8,11.193V0L2.812,0C1.042,0,0.474,1.156,1.533,2.568z"
        ></path>
      </svg>
    </div>
  );
}

export default ChatMessage;
