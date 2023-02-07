import React, { Component } from "react";
import "./signup.scss";
function Signup() {
  return (
    <>
      <div className="Signup">
        <div className="container">
          <div className="left">
            <div className="form">
              <h1>Sign Up</h1>
              <div className="input-row">
                <input type="text" placeholder="User Name" />
              </div>
              <div className="input-row">
                <input type="text" placeholder="First Name" />
                <input type="text" placeholder="Last Name" />
              </div>
              <div className="input-row">
                <input type="text" placeholder="Email Address" />
              </div>
              <div className="input-row">
                <input type="text" placeholder="Password" />
              </div>
              <div className="input-row">
                <input type="text" placeholder="Confirm Password" />
              </div>
              <button>SIGN UP</button>
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
