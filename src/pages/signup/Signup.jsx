import axios from "axios";
import React, { Component, useContext, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { API_IP_2, LoginContext, UserContext } from "../../helper/Context";
import "./signup.scss";

const api = axios.create({
  baseURL: `http://${API_IP_2}/api`,
});

function Signup() {
  const { loggedIn, setLoggedIn } = useContext(LoginContext);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies();

  const [userName, setuserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const doRegister = () => {
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
            console.log(res.data)
          }
        });
    } else {
      console.log("password not matching");
    }
  };

  return (
    <>
      <div className="Signup">
        <div className="container">
          <div className="left">
            <div className="form">
              <h1>Sign Up</h1>
              <div className="input-row">
                <input
                  type="text"
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
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
                <input
                  type="text"
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
              <button onClick={doRegister}>SIGN UP</button>
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
