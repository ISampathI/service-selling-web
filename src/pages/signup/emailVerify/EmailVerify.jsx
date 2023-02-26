import axios from "axios";
import React from "react";
import Ripples from "react-ripples";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import emailVerifyImg from "../../../assets/img/emailverify.png";
import { API_IP_2 } from "../../../helper/Context";
import "./emailVerify.scss";

const api = axios.create({
  baseURL: `http://${API_IP_2}/api`,
});

function EmailVerify() {
  var { id } = useParams();
  var { token } = useParams();

  const navigate = useNavigate();
  return (
    <div className="EmailVerify">
      <div className="email-verify-container">
        <img src={emailVerifyImg} alt="" />
        <div className="title">Verify your email address</div>
        <div className="sub-text">
          You've entered email@gmail.com as the email address for your account.
          Please verify this email address by clicking button bellow.
        </div>
        <Ripples
          className="riple-btn"
          color="rgba(255,255,255, 0.5)"
          during={1200}
        >
          <button
            onClick={async () => {
              console.log(id, token);
              await api
                .post("/users/email-verify", {
                  userID: id,
                  token: token,
                })
                .then((res) => {
                  console.log(res);
                  navigate("/login");
                });
            }}
          >
            Verify Your Email
          </button>
        </Ripples>
      </div>
    </div>
  );
}

export default EmailVerify;
