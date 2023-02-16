import React, { Component, useContext, useEffect } from "react";
import {
  Outlet,
  NavLink,
  useOutletContext,
  useLocation,
} from "react-router-dom";
import Chat from "../../components/chat/Chat";
import {
  API_IP,
  API_IP_2,
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
import Footer from "../../layouts/Footer";
import { Cookies, useCookies } from "react-cookie";

const api = axios.create({
  baseURL: `http://${API_IP_2}/`,
});

export default function Profile(props) {
  const { loggedIn, setLoggedIn } = useContext(LoginContext);
  const { user, setUser } = useContext(UserContext);
  const { showChatBox, setShowChatBox } = useContext(ChatBoxContext);

  const [showProfileCard, setShowProfileCard] = useState(false);

  useEffect(() => {
    api
      .post(
        "/api/users/check-token",
        {},
        {
          headers: {
            Authorization: `Bearer ${Cookies.token}`,
          },
        }
      )
      .then((res) => {
        if (res.data) {
          setUser(res.data);
          setLoggedIn(true);
          //navigate("/");
          console.log(res.data)
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
          <Footer />
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
