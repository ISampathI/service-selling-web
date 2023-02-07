import React, { createContext, useState } from "react";
import ChatUser from "./chatUser/ChatUser";
import "./chat.scss";
import ChatMessage from "./chatMessage/ChatMessage";
import { ChatBoxContext } from "../../helper/Context";

function Chat() {
  const [selectedUser, setSelectedUser] = useState(0);

  return (
    <ChatBoxContext.Provider value={{ selectedUser, setSelectedUser }}>
      <div className="Chat">
        <div className="chat-container">
          <div className="left">
            <div className="search-bar">
              <div className="wrapper">
                <i className="fa-solid fa-magnifying-glass"></i>
                <input type="text" placeholder="Serach User" />
              </div>
            </div>
            <ChatUser user_id="0" />
            <ChatUser user_id="1" />
            <ChatUser user_id="2" />
            <ChatUser user_id="3" />
            <ChatUser user_id="4" />
            <ChatUser user_id="5" />
            <ChatUser user_id="6" />
            <ChatUser user_id="7" />
            <ChatUser user_id="8" />
            <ChatUser user_id="9" />
            <ChatUser user_id="10" />
            <ChatUser user_id="11" />
          </div>
          <div className="right">
            <div className="up">
              <ChatMessage message="Lorem ipsum dolor sit amet." />
              <ChatMessage
                type="sender"
                message="Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, dignissimos."
              />
              <ChatMessage message="Lorem ipsum dolor sit" />
              <ChatMessage
                type="sender"
                message="Lorem ipsum dolor sit amet consectetur"
              />
              <ChatMessage message="Lorem ipsum dolor sit amet." />
              <ChatMessage
                type="sender"
                message="Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, dignissimos."
              />
              <ChatMessage message="Lorem ipsum dolor sit" />
              <ChatMessage
                type="sender"
                message="Lorem ipsum dolor sit amet consectetur"
              />
              <ChatMessage message="Lorem ipsum dolor sit amet." />
              <ChatMessage
                type="sender"
                message="Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, dignissimos."
              />
              <ChatMessage message="Lorem ipsum dolor sit" />
              <ChatMessage
                type="sender"
                message="Lorem ipsum dolor sit amet consectetur"
              />
              <ChatMessage message="Lorem ipsum dolor sit amet." />
              <ChatMessage
                type="sender"
                message="Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, dignissimos."
              />
              <ChatMessage message="Lorem ipsum dolor sit" />
              <ChatMessage
                type="sender"
                message="Lorem ipsum dolor sit amet consectetur"
              />
            </div>
            <div className="down">
              <input type="text" placeholder="Type a message here" />
              <i class="fa-solid fa-paper-plane"></i>
            </div>
          </div>
        </div>
      </div>
    </ChatBoxContext.Provider>
  );
}

export default Chat;
