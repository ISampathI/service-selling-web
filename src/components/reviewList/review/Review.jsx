import React from "react";
import "./review.scss";
import defaultImg from "../../../assets/img/defaultpropic.png";
import { API_IP_2 } from "../../../helper/Context";
import Rating from "../../rating/Rating";

function Review(props) {
  return (
    <div className="Review">
      <div className="review-user">
        <div className="profile-img">
          <img
            src={
              props.proPic
                ? `http://${API_IP_2}/api/${props.proPic}`
                : defaultImg
            }
            alt=""
          />
        </div>
        <div className="container">
          <div className="row">
            <div className="name">{props.name && props.name}</div>
            <Rating rating={props.rating && props.rating} />
          </div>
          <div className="review-date">{props.date && props.date}</div>
        </div>
      </div>
      <div className="review-message">{props.review && props.review}</div>
    </div>
  );
}

export default Review;
