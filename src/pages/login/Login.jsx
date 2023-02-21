import React, { Component, useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.scss";
import {
  API_IP,
  API_IP_2,
  LoginContext,
  ProgressBarContext,
  UserContext,
} from "../../helper/Context";
import { useCookies } from "react-cookie";
import LoadingBar from "react-top-loading-bar";
import Ripples from "react-ripples";
import Modal from "../../components/modal/Modal";
import emailVerifyImg from "../../assets/img/emailverify.png";

const api = axios.create({
  baseURL: `http://${API_IP_2}/api/`,
});

function Login() {
  // const [token, setToken] = useState("");
  const navigate = useNavigate();
  const [userName, setuserName] = useState("");
  const [password, setpassword] = useState("");
  const [tempUser, setTempUser] = useState({});

  const { loggedIn, setLoggedIn } = useContext(LoginContext);
  const { user, setUser } = useContext(UserContext);
  const [cookies, setCookie] = useCookies(["token"]);
  const { progress, setProgress } = useContext(ProgressBarContext);
  const [showEVModal, setShowEVModal] = useState(false);

  const [errorDetails, setErrorDetails] = useState([]);

  const doLogin = () => {
    setProgress(0);
    api
      .post("/users/get-token", {
        email: userName,
        password: password,
      })
      .then((res) => {
        if (res.data) {
          if (res.data.user.isEmailVerified == false) {
            setTempUser(res.data.user);
            setShowEVModal(true);
          } else if(res.data.user.isEmailVerified == true) {
            setCookie("token", res.data.token, { path: "/" });
            setUser(res.data.user);
            setLoggedIn(true);
            navigate("/");
          }
          console.log(res.data);
        }
      })
      .catch((e) => {
        setErrorDetails(e);
        //console.log(e.response.data);
      });
    setProgress(100);
  };

  useEffect(() => {
    setProgress(100);
  }, []);

  return (
    <>
      <div className="Login">
        <LoadingBar
          className="loading-bar"
          progress={progress}
          height="5px"
          shadowStyle={{ display: "none" }}
          onLoaderFinished={() => setProgress(0)}
        />
        <div className="container">
          <div className="left">
            <div className="form">
              <h1>LOGIN</h1>
              <div className="title"></div>
              <div className="input-row">
                <input
                  value={userName}
                  style={
                    errorDetails.response?.status == 401
                      ? { border: "1px solid red" }
                      : {}
                  }
                  onChange={(e) => {
                    setuserName(e.target.value);
                  }}
                  type="text"
                  placeholder="User Name"
                />
              </div>
              <div className="input-row">
                <input
                  value={password}
                  style={
                    errorDetails.response?.status == 401
                      ? { border: "1px solid red" }
                      : {}
                  }
                  onChange={(e) => {
                    setpassword(e.target.value);
                  }}
                  type="password"
                  placeholder="Password"
                />
              </div>
              <Ripples
                className="riple-btn"
                color="rgba(255,255,255, 0.5)"
                during={1200}
              >
                <button onClick={doLogin}>LOGIN</button>
              </Ripples>
              <div className="row">
                <div>
                  <Link to="/signup" className="react-link">
                    {" "}
                    <span>Register Now</span>
                  </Link>
                </div>
                <span>Forgot Password?</span>
              </div>
            </div>
          </div>
          <div className="right">
            <div className="img-layer"></div>
          </div>
        </div>
        {showEVModal && (
          <Modal
            onClick={() => {
              setShowEVModal(false);
            }}
            content={() => {
              return (
                <div className="email-verify-modal">
                  <img src={emailVerifyImg} alt="" />
                  <div className="title">Verify your email address</div>
                  <div className="sub-text">
                    You've entered {tempUser.email && tempUser.email} as the
                    email address for your account. Please verify this email
                    address by clicking button bellow.
                  </div>
                </div>
              );
            }}
          />
        )}
      </div>
    </>
  );
}

export default Login;
