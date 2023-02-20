import React from "react";
import Ripples from "react-ripples";
import emailVerifyImg from "../../../assets/img/emailverify.png";
import "./emailVerify.scss";
function EmailVerify() {
  return (
    <div className="EmailVerify">
      <div className="email-verify-container">
        <img src={emailVerifyImg} alt="" />
        <div className="title">Verify your email address</div>
        <div className="sub-text">
          You've entered email@gmail.com as the email address for your acout.
          Please verify this email address by clicking button bellow.
        </div>
        <Ripples
          className="riple-btn"
          color="rgba(255,255,255, 0.5)"
          during={1200}
        >
          <button onClick={""}>Verify Your Email</button>
        </Ripples>
      </div>
    </div>
  );
}

export default EmailVerify;
