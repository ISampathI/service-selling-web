import React, { Component, useContext, useEffect } from "react";
import {
  Outlet,
  NavLink,
  useOutletContext,
  useLocation,
} from "react-router-dom";
import Chat from "../../components/chat/Chat";
import {
  ChatBoxContext,
  LoginContext,
  UserContext,
} from "../../helper/Context";
import AppHeader from "../../layouts/AppHeader";
import "./profile.scss";
import ProfileHeader from "./profileHeader/ProfileHeader";
import ProfileCard from "./components/ProfileCard";
import { useState } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5001/",
  withCredentials: true,
});

export default function Profile(props) {
  const { loggedIn, setLoggedIn } = useContext(LoginContext);
  const { user, setUser } = useContext(UserContext);
  const { showChatBox, setShowChatBox } = useContext(ChatBoxContext);

  const [showProfileCard, setShowProfileCard] = useState(false);

  useEffect(() => {
    api.get("/login").then((res) => {
      if (res.data.loggedIn) {
        setLoggedIn(true);
        setUser(res.data.user);
      }
    });
  }, []);

  return (
    <>
      <ProfileHeader />
      <div
        className="ProfileDetails"
        onClick={(e) => {
          if (e.target.className != "contact-now-btn") {
            setShowChatBox(false);
          } else {
            setShowChatBox(true);
          }
        }}
      >
        <div className="main-container">
          <Outlet />
        </div>
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
