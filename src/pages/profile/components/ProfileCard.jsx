import React, { useContext, useEffect } from "react";
import { API_IP_2, LoginContext, UserContext } from "../../../helper/Context";
import "./profileCard.scss";

function Profile() {
  const { loggedIn } = useContext(LoginContext);
  const { user } = useContext(UserContext);

  useEffect(() => {
    console.log(user)
  }, [user]);

  return (
    <div className="Profile">
      <div className="profile-img">
        <img src={user.proPic && `http://${API_IP_2}/${user.proPic}`} alt="" />
      </div>
      <div className="container1">
        <div className="name">
          {user.firstName} {user.lastName}
        </div>
        <div className="row">
          <div className="rating-num">4.5</div>
          <div className="rating-sub">
            <div className="rating-star">
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
            </div>
            <div className="reviews">10 reviews</div>
          </div>
        </div>
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
          <li>25</li>
          <li>{user.location}</li>
        </ul>
      </div>
      <div className="seller-about-text">About</div>
      <div className="seller-about">
        {user.about}
      </div>
    </div>
  );
}

export default Profile;
