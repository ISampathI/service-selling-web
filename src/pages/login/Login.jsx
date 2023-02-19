import React, { Component, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
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
  const { progress, setProgress } = useContext(ProgressBarContext);

  const [errorDetails, setErrorDetails] = useState([]);

  const doLogin = () => {
    setProgress(0);
    // axios.get("https://social-jobs-stay-103-247-50-166.loca.lt/",{

    // }).then((res)=>{
    //   console.log(res);
    // })
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
