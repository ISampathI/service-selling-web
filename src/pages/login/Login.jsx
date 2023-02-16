import React, { Component, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.scss";
import {
  API_IP,
  API_IP_2,
  LoginContext,
  UserContext,
} from "../../helper/Context";
import { useCookies } from "react-cookie";

const api = axios.create({
  baseURL: `http://${API_IP_2}/api/`,
});

function Login() {
  // const [token, setToken] = useState("");
  const navigate = useNavigate();
  const [userName, setuserName] = useState("");
  const [password, setpassword] = useState("");

  const { loggedIn, setLoggedIn } = useContext(LoginContext);
  const { user, setUser } = useContext(UserContext);
  const [cookies, setCookie] = useCookies(["token"]);

  const doLogin = () => {
    api
      .post("/users/get-token", {
        email: userName,
        password: password,
      })
      .then((res) => {
        if (res.data) {
          setCookie("token", res.data.token, { path: "/" });
          setUser(res.data.user);
          setLoggedIn(true);
          navigate("/");
          console.log(res.data)
        }
      });
  };

  useEffect(() => {
    api.get("/login").then((res) => {
      if (res.data.loggedIn) {
      }
    });
  }, []);

  return (
    <>
      <div className="Login">
        <div className="container">
          <div className="left">
            <div className="form">
              <h1>LOGIN</h1>
              <div className="title"></div>
              <div className="input-row">
                <input
                  value={userName}
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
                  onChange={(e) => {
                    setpassword(e.target.value);
                  }}
                  type="password"
                  placeholder="Password"
                />
              </div>
              <button onClick={doLogin}>LOGIN</button>
              <div className="row">
                <div>
                  <input type="checkbox" name="" id="" />
                  <span>Remember me</span>
                </div>
                <span>Forgot Password?</span>
              </div>
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

export default Login;
