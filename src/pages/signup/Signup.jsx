import axios from "axios";
import React, { Component, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import {
  API_IP_2,
  LoginContext,
  ProgressBarContext,
  UserContext,
} from "../../helper/Context";
import "./signup.scss";
import Ripples from "react-ripples";

const api = axios.create({
  baseURL: `http://${API_IP_2}/api`,
});

function Signup() {
  const { loggedIn, setLoggedIn } = useContext(LoginContext);
  const { user, setUser } = useContext(UserContext);
  const { progress, setProgress } = useContext(ProgressBarContext);

  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies();

  const [userName, setuserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errorDetails, setErrorDetails] = useState({});

  const doRegister = () => {
    setProgress(10);
    if (password == confirmPassword) {
      api
        .post("/users/signup", {
          username: userName,
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
        })
        .then((res) => {
          if (res.data) {
            navigate("/login");
          }
        })
        .catch((e) => {
          setErrorDetails(e.response.data.error.errors);
        });
    } else {
      console.log("password not matching");
    }
    setProgress(100);
  };
  useEffect(() => {
    setProgress(100);
  }, []);
  return (
    <>
      <div className="Signup">
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
              <h1>Sign Up</h1>
              <div className="input-row">
                <input
                  type="text"
                  style={errorDetails.username && { border: "1px solid red" }}
                  placeholder="User Name"
                  value={userName}
                  onChange={(e) => {
                    setuserName(e.target.value);
                  }}
                />
              </div>
              <div className="input-row">
                <input
                  type="text"
                  style={errorDetails.firstName && { border: "1px solid red" }}
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
                <input
                  type="text"
                  style={errorDetails.lastName && { border: "1px solid red" }}
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </div>
              <div className="input-row">
                <input
                  type="text"
                  style={errorDetails.email && { border: "1px solid red" }}
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div className="input-row">
                <input
                  type="text"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <div className="input-row">
                <input
                  type="text"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                />
              </div>
              <Ripples
                className="riple-btn"
                color="rgba(255,255,255, 0.5)"
                during={1200}
              >
                <button onClick={doRegister}>SIGN UP</button>
              </Ripples>
            </div>
          </div>
          <div className="right">
            <div className="img-layer"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
