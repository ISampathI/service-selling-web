import React from "react";
import { API_IP_2 } from "../../helper/Context";
import Review from "./review/Review";
import "./reviewList.scss";
function ReviewList(props) {
  return (
    <div className="ReviewList">
      <div className="review-list-title">Review and Rating</div>
      <div className="review-container">
        {props.reviewList && props.reviewList.map((item, index) => (
          <Review
            name={item.name}
            proPic={item.proPic}
            id={item._id}
            rating= {item.rating}
            review={item.review}
            date = {item.date}
          />
        ))}
      </div>
    </div>
  );
}

export default ReviewList;
