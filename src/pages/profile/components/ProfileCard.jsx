import React, { useContext, useEffect } from "react";
import { API_IP_2, LoginContext, UserContext } from "../../../helper/Context";
import "./profileCard.scss";
import defaultImg from "../../../assets/img/defaultpropic.png";
import Rating from "../../../components/rating/Rating";

function Profile() {
  const { loggedIn } = useContext(LoginContext);
  const { user } = useContext(UserContext);

  useEffect(() => {}, [user]);

  return (
    <div className="Profile">
      <div className="profile-img">
        <img
          src={
            user.proPic
              ? `http://${API_IP_2}/api/${user.proPic}`
              : { defaultImg }
          }
          alt=""
        />
      </div>
      <div className="container1">
        <div className="name">
          {user.firstName} {user.lastName}
        </div>
        {user.rating > 0 &&
        <div className="row">
          <div className="rating-num">{user.rating > 0 && user.rating}</div>
          <div className="rating-sub">
            {user.rating && <Rating rating={user.rating} />}
            <div className="reviews">
              {user.ratingCount > 0 ? user.ratingCount + "Reviews" : ""}
            </div>
          </div>
        </div>}
      </div>
      <div className="container2">
        <ul>
          <li>Job</li>
          <li>Availability</li>
          <li>Age</li>
          <li>Location</li>
        </ul>
        <ul>
          <li>{user.job}</li>
          <li>{user.availability}</li>
          <li>{user.age}</li>
          <li>{user.location}</li>
        </ul>
      </div>
      <div className="seller-about-text">About</div>
      <div className="seller-about">{user.about}</div>
    </div>
  );
}

export default Profile;
