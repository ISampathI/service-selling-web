import React, { Component } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { ChatBoxContext } from "../../helper/Context";
import "./sellerCard.scss";

function SellerCard(props) {
  const { showChatBox, setShowChatBox } = useContext(ChatBoxContext);
  return (
    <Link to={`/sellers/${props.username}/services`} className="reactLink">
      <div className="SellerCard">
        <img src={props.profile_img} alt="" />
        <div className="seller-name">
          {props.username}
        </div>
        <div className="seller-ratings">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
        </div>
        <div className="seller-details-container">
          {props.about.slice(0, 130)}...
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
