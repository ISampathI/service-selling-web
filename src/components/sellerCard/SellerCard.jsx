import React, { Component } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { API_IP_2, ChatBoxContext } from "../../helper/Context";
import "./sellerCard.scss";
import defaultImg from "../../assets/img/defaultpropic.png";

function SellerCard(props) {
  const { showChatBox, setShowChatBox } = useContext(ChatBoxContext);
  return (
    <Link to={`/sellers/${props.username}/services`} className="reactLink">
      <div className="SellerCard">
        <img
          src={
            props.profile_img
              ? `http://${API_IP_2}/api/${props.profile_img}`
              : defaultImg
          }
          alt=""
        />
        <div className="seller-name">{props.username}</div>
        {/* <div className="rating">
          <i class="fa-solid fa-star"></i>
          <p>5.0</p>
        </div> */}
        <div className="seller-details-container">
          {props.about && props.about.slice(0, 90)}...
        </div>
        {/* <div className="buttons">
          <button className="view-profile-btn">
            <Link
              to="/sellers/sellerdetails/services"
              className="view-profile-btn reactLink"
            >
              View Profile{" "}
            </Link>
          </button>
          <button className="contact-now-btn">Contact now</button>
        </div> */}
      </div>
    </Link>
  );
}

export default SellerCard;
