import React from "react";
import "./footer.scss";

function Footer() {
  return (
    <div className="Footer">
      <div className="footer-column">
        {/* <div className="footer-row footer-logo">
          <div className="logo">
            <span>Hire</span> Now
          </div>
        </div> */}
        <div className="footer-row footer-links">
          <div className="footer-column footer-logo">
            <div className="logo">
              <span>Hire</span> Now
            </div>
            <p>The Ultimate Platform for <br /> Finding Services</p>
          </div>
          <div className="footer-column">
            <p>Home</p>
            <ul>
              <li>Home</li>
              <li>Services</li>
              <li>Sellers</li>
              <li>Login</li>
              <li>Signup</li>
              <li>About</li>
            </ul>
          </div>
        
          <div className="footer-column">
            <p>About</p>
            <ul>
              <li>Our Story</li>
              <li>Benefits</li>
              <li>Team</li>
              <li>Contact Us</li>
            </ul>
          </div>
          <div className="footer-column footer-contacts">
            <p>Get in touch</p>
            <div>Question or feedback?</div>
            <div className="div">We'd love to here from you</div>
            <div className="footer-row">
              <input type="text" />
              <button>
                <i class="fa-solid fa-chevron-right"></i>
              </button>
            </div>
            <div className="footer-row social">
              <i class="fa-brands fa-square-facebook"></i>
              <i class="fa-brands fa-square-twitter"></i>
            </div>
          </div>
        </div>
        <div className="footer-row last-row">
          <div className="copyright">
            Copyright 2023 Group 09, All right reserved.
          </div>
          <div className="footer-row">
            <p>Privacy Policy</p>
            <p>Terms of Use</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
