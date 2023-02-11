import React from "react";
import "./review.scss";

function Review() {
  return (
    <div className="Review">
      <div className="review-user">
        <div className="profile-img">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdXrN5H9Es9LsjxqNrUFbuEXtdc6q1457prQ&usqp=CAU"
            alt=""
          />
        </div>
        <div className="container">
          <div className="row">
            <div className="name">Lernal heral</div>
            <div className="rating-star">
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
            </div>
          </div>
          <div className="review-date">2023-23-05</div>
        </div>
      </div>
      <div className="review-message">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem
        veritatis magnam, sapiente atque numquam dolore. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum minus atque odio omnis ut! Fugiat iusto eligendi praesentium optio nulla?
      </div>
    </div>
  );
}

export default Review;
