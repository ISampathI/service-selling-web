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
import emailVerifyImg from "../../assets/img/emailverify.png";
import Modal from "../../components/modal/Modal";

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
  const [showEVModal, setShowEVModal] = useState(false);

  const [errorDetails, setErrorDetails] = useState({});

  const doRegister = async () => {
    setProgress(10);
    let err = {};

    if (password == "" || confirmPassword == "") {
      if (password == "") {
        err.password = { kind: "required", path: "password" };
      }
      if (confirmPassword == "") {
        err.confirmPassword = { kind: "required", path: "confirmPassword" };
      }
      setErrorDetails(err);
    } else if (password != confirmPassword) {
      setErrorDetails({
        password: { kind: "confirmation doesn't match", path: "password" },
      });
    } else {
      await api
        .post("/users/signup", {
          username: userName,
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
        })
        .then((res) => {
          console.log(res);
          if (res.data) {
            if (res.data.isEmailSent) {
              setShowEVModal(true);
            }
          }
        })
        .catch((e) => {
          let err = e.response.data.error.errors;
          if (password == "") {
            err.password = { kind: "required", path: "password" };
          }
          if (confirmPassword == "") {
            err.confirmPassword = { kind: "required", path: "confirmPassword" };
          }
          setErrorDetails(err);
          console.log(errorDetails, "####");
        });
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
                <div className="error-message">
                  {errorDetails.username != undefined
                    ? `${errorDetails.username?.path} ${errorDetails.username?.kind}`
                    : ""}
                </div>
              </div>
              <div className="input-row input-row-col">
                <div className="input-column">
                  <input
                    type="text"
                    style={
                      errorDetails.firstName && { border: "1px solid red" }
                    }
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                  />
                  <div className="error-message">
                    {errorDetails.firstName != undefined
                      ? `${errorDetails.firstName?.path} ${errorDetails.firstName?.kind}`
                      : ""}
                  </div>
                </div>
                <div className="input-column">
                  <input
                    type="text"
                    style={errorDetails.lastName && { border: "1px solid red" }}
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                  />
                  <div className="error-message">
                    {errorDetails.lastName != undefined
                      ? `${errorDetails.lastName?.path} ${errorDetails.lastName?.kind}`
                      : ""}
                  </div>
                </div>
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
                <div className="error-message">
                  {errorDetails.email != undefined
                    ? `${errorDetails.email?.path} ${
                        errorDetails.email?.kind != "user defined"
                          ? errorDetails.email?.kind
                          : "validation failed"
                      }`
                    : ""}
                </div>
              </div>
              <div className="input-row">
                <input
                  type="text"
                  style={errorDetails.password && { border: "1px solid red" }}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <div className="error-message">
                  {errorDetails.password != undefined
                    ? `${errorDetails.password?.path} ${errorDetails.password?.kind}`
                    : ""}
                </div>
              </div>
              <div className="input-row">
                <input
                  type="text"
                  style={errorDetails.confirmPassword && { border: "1px solid red" }}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                />
                <div className="error-message">
                  {errorDetails.confirmPassword != undefined
                    ? `${errorDetails.confirmPassword?.path} ${errorDetails.confirmPassword?.kind}`
                    : ""}
                </div>
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
        {showEVModal && (
          <Modal
            onClick={() => {
              setShowEVModal(false);
            }}
            content={() => {
              return (
                <div className="email-verify-ad-container">
                  <img src={emailVerifyImg} alt="" />
                  <div className="title">Verify your email address</div>
                  <div className="sub-text">
                    You've entered {email && email} as the email address for
                    your account. Please check your inbox and verify this email.
                  </div>
                  <Ripples
                    className="riple-btn"
                    color="rgba(255,255,255, 0.5)"
                    during={1200}
                  >
                    <button
                      onClick={() => {
                        navigate("/login");
                      }}
                    >
                      ok
                    </button>
                  </Ripples>
                </div>
              );
            }}
          />
        )}
      </div>
    </>
  );
}

export default Signup;
