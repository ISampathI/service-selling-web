import React from "react";
import Review from "./review/Review";
import "./reviewList.scss";
function ReviewList() {
  return (
    <div className="ReviewList">
      <div className="review-list-title">Review and Rating</div>
      <div className="review-container">
        <Review />
        <Review />
        <Review />
        <Review />
        <Review />
      </div>
    </div>
  );
}

export default ReviewList;
