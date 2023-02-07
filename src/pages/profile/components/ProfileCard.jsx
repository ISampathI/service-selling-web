import React, { useContext } from "react";
import { LoginContext, UserContext } from "../../../helper/Context";
import "./profileCard.scss";

function Profile() {
  const { loggedIn } = useContext(LoginContext);
  const { user } = useContext(UserContext);

  return (
    <div className="Profile">
      <div className="profile-img">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdXrN5H9Es9LsjxqNrUFbuEXtdc6q1457prQ&usqp=CAU"
          alt=""
        />
      </div>
      <div className="container1">
        <div className="name">Lernal heral</div>
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
          <li>Gardner</li>
          <li>Full time</li>
          <li>25</li>
          <li>Kegalle</li>
        </ul>
      </div>
      <div className="seller-about-text">About</div>
      <div className="seller-about">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero debitis
        ab asperiores dicta officiis nam maiores temporibus iste, enim illum
        reprehenderit sint magnam impedit hic aut quibusdam vel nihil
        accusantium dignissimos quaerat mollitia numquam. Incidunt, suscipit
        quidem. Laborum, alias aliquam sit laudantium accusantium hic non
        distinctio cumque! Perspiciatis, labore quis!
      </div>
    </div>
  );
}

export default Profile;
