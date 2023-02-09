import axios from "axios";
import React, {
  Component,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Link, Outlet } from "react-router-dom";
import {
  API_IP,
  ChatBoxContext,
  LoginContext,
  UserContext,
} from "../../helper/Context";
import AppHeader from "../../layouts/AppHeader";
import Chat from "../../components/chat/Chat";
import "./home.scss";
const api = axios.create({
  baseURL: `http://${API_IP}/`,
});
function Home() {
  const { loggedIn, setLoggedIn } = useContext(LoginContext);
  const { user, setUser } = useContext(UserContext);
  const { showChatBox, setShowChatBox } = useContext(ChatBoxContext);

  useEffect(() => {
    api.get("/login").then((res) => {
      console.log(res.data.user, "++-+-+-+-");
      if (res.data.loggedIn) {
        setLoggedIn(true);
        setUser(res.data.user);
      }
    });
  }, []);

  return (
    <>
      <div
        onClick={(e) => {
          if (e.target.className != "contact-now-btn") {
            setShowChatBox(false);
          } else {
            setShowChatBox(true);
          }
        }}
      >
        <AppHeader />
        <Outlet />
      </div>
      {showChatBox ? <Chat className="Chat" /> : <></>}
      {loggedIn && !showChatBox ? (
        <div
          className="float-chat"
          onClick={() => {
            setShowChatBox(true);
          }}
        >
          <div className="sub-float-div">
            <div className="chat-dec"></div>
            <i className="fa-solid fa-message"></i>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default Home;
