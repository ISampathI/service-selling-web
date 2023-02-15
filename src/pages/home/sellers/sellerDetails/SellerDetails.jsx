import axios from "axios";
import React, { Component, useContext, useEffect, useState } from "react";
import { Outlet, NavLink, useOutletContext, useParams } from "react-router-dom";
import {
  API_IP_2,
  LoginContext,
  UserContext,
} from "../../../../helper/Context";
import Footer from "../../../../layouts/Footer";
import "./sellerDetails.scss";

const api = axios.create({
  baseURL: `http://${API_IP_2}/api/`,
});

export default function SellerDetails(props) {
  const [sellerDetails, setSellerDetails] = useState({});

  const { loggedIn } = useContext(LoginContext);
  const { user } = useContext(UserContext);

  var { username } = useParams();

  useEffect(() => {
    fetchData();
  }, [username]);

  const fetchData = () => {
    api.get(`/users/${username}`).then((res) => {
      setSellerDetails(res.data);
      console.log(res.data);
    });
  };

  return (
    <div className="SellerDetails">
      <div className="seller-details-wrapper">
        <div className="profile">
          <div className="profile-img">
            <img src={sellerDetails.proPic} alt="" />
          </div>
          <div className="container1">
            <div className="name">
              {sellerDetails.firstname} {sellerDetails.lastname}
            </div>
            <div className="row">
              <div className="rating-num">{sellerDetails.rating}</div>
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
              <li>{sellerDetails.job}</li>
              <li>{sellerDetails.availability}</li>
              <li>25</li>
              <li>{sellerDetails.city}</li>
            </ul>
          </div>
          <div className="seller-about-text">About</div>
          <div className="seller-about">
            {sellerDetails.about}
          </div>
          <button className="contact-now-btn">Private Chat</button>
        </div>
        <div className="for-small">
          <div className="seller-about-text">About</div>
          <div className="seller-about">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero
            debitis ab asperiores dicta officiis nam maiores temporibus iste,
            enim illum reprehenderit sint magnam impedit hic aut quibusdam vel
            nihil accusantium dignissimos quaerat mollitia numquam. Incidunt,
            suscipit quidem. Laborum, alias aliquam sit laudantium accusantium
            hic non distinctio cumque! Perspiciatis, labore quis!
          </div>
          <button className="contact-now-btn">Private Chat</button>
        </div>
        <div className="main-container">
          <div className="seller-container-nav">
            <ul>
              <NavLink
                to={`/sellers/${username}/services`}
                className={({ isActive }) =>
                  isActive ? "active-seller-nav" : "seller-nav"
                }
              >
                <li>Services</li>
              </NavLink>
              <NavLink
                to={`/sellers/${username}/gallery`}
                className={({ isActive }) =>
                  isActive ? "active-seller-nav" : "seller-nav"
                }
              >
                <li>Gallery</li>
              </NavLink>
            </ul>
          </div>
          <div className="seller-nav-container">
            <Outlet />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
