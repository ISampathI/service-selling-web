import axios from "axios";
import React, {
  Component,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  API_IP,
  API_IP_2,
  CategorySearchContext,
  ChatBoxContext,
  LoginContext,
  ProgressBarContext,
  UserContext,
} from "../../helper/Context";
import AppHeader from "../../layouts/AppHeader";
import Chat from "../../components/chat/Chat";
import "./home.scss";
import Footer from "../../layouts/Footer";
import { useCookies } from "react-cookie";
import LoadingBar from "react-top-loading-bar";
import Ripples from "react-ripples";

const api = axios.create({
  baseURL: `http://${API_IP_2}/`,
});
function Home() {
  const navigate = useNavigate();
  const { loggedIn, setLoggedIn } = useContext(LoginContext);
  const { user, setUser } = useContext(UserContext);
  const { showChatBox, setShowChatBox } = useContext(ChatBoxContext);
  const { progress, setProgress } = useContext(ProgressBarContext);
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
          console.log(res.data, "!!!!!!!!!!!!!!");
          if (res.data.status) {
            setUser(res.data);
            setLoggedIn(true);
          }
        }
      }).catch((e)=>{
        console.log(e);
      });
  }, []);

  return (
    <>
      <CategorySearchContext.Provider
        value={{ searchCategory, setSearchCategory }}
      >
        <div
          onClick={(e) => {
            if (
              e.target.className != "contact-now-btn" ||
              user.userType == "guest"
            ) {
              setShowChatBox(false);
            } else {
              setShowChatBox(true);
            }
            if (
              e.target.className == "contact-now-btn" &&
              user.userType == "guest"
            ) {
              user.userType == "guest" && navigate("/login");
            }
          }}
        >
          <LoadingBar
            className="loading-bar"
            progress={progress}
            height="5px"
            shadowStyle={{ display: "none" }}
            onLoaderFinished={() => setProgress(0)}
          />
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
