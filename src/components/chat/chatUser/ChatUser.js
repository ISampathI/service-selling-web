import React, { useContext, useState } from "react";
import { ChatBoxContext } from "../../../helper/Context";
import "./chatUser.scss";

function ChatUser(props) {
  const { selectedUser, setSelectedUser } = useContext(ChatBoxContext);

  return (
    <div
      onClick={() => {
        setSelectedUser(props.user_id);
      }}
      className={
        props.user_id == selectedUser ? "ChatUser ChatUser-checked" : "ChatUser"
      }
    >
      <div className="seller">
        <div className="profile-img">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdXrN5H9Es9LsjxqNrUFbuEXtdc6q1457prQ&usqp=CAU"
            alt=""
          />
        </div>
        <div className="container">
          <div className="name">Lernal heral</div>
          <div className="last-mg">Lorem ipsum dolor sit amet.</div>
        </div>
      </div>
    </div>
  );
}

export default ChatUser;
