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
  API_IP_2,
  CategorySearchContext,
  ChatBoxContext,
  LoginContext,
  UserContext,
} from "../../helper/Context";
import AppHeader from "../../layouts/AppHeader";
import Chat from "../../components/chat/Chat";
import "./home.scss";
import Footer from "../../layouts/Footer";
import { useCookies } from "react-cookie";

const api = axios.create({
  baseURL: `http://${API_IP_2}/`,
});
function Home() {
  const { loggedIn, setLoggedIn } = useContext(LoginContext);
  const { user, setUser } = useContext(UserContext);
  const { showChatBox, setShowChatBox } = useContext(ChatBoxContext);
  const [cookies, setCookie] = useCookies();
  const [searchCategory, setSearchCategory] = useState("");

  useEffect(() => {
    api
      .post(
        "/api/users/check-token",
        {},
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      )
      .then((res) => {
        if (res.data) {
          console.log(res.data,"!!!!!!!!!!!!!!");
          if (res.data.status) {
            setUser(res.data);
            setLoggedIn(true);
          }
        }
      });
  }, []);

  return (
    <>
      <CategorySearchContext.Provider
        value={{ searchCategory, setSearchCategory }}
      >
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
        {showChatBox && <Chat className="Chat" />}
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
      </CategorySearchContext.Provider>
    </>
  );
}

export default Home;
