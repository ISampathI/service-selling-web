import axios from "axios";
import React, { Component, useContext, useEffect, useState } from "react";
import { Outlet, NavLink, useOutletContext, useParams } from "react-router-dom";
import {
  API_IP_2,
  LoginContext,
  ProgressBarContext,
  UserContext,
} from "../../../../helper/Context";
import Footer from "../../../../layouts/Footer";
import "./sellerDetails.scss";
import defaultImg from "../../../../assets/img/defaultpropic.png";
import Rating from "../../../../components/rating/Rating";

const api = axios.create({
  baseURL: `http://${API_IP_2}/api/`,
});

export default function SellerDetails(props) {
  const [sellerDetails, setSellerDetails] = useState({});

  const { loggedIn } = useContext(LoginContext);
  const { user } = useContext(UserContext);
  const { progress, setProgress } = useContext(ProgressBarContext);

  var { username } = useParams();

  useEffect(() => {
    fetchData();
  }, [username]);

  const fetchData = () => {
    setProgress(30);
    api
      .get(`/users/${username}`)
      .then((res) => {
        setSellerDetails(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
    setProgress(100);
  };

  return (
    <div className="SellerDetails">
      <div className="seller-details-wrapper">
        <div className="profile">
          <div className="profile-img">
            <img
              src={
                sellerDetails.proPic
                  ? `http://${API_IP_2}/api/${sellerDetails.proPic}`
                  : defaultImg
              }
              alt=""
            />
          </div>
          <div className="container1">
            <div className="name">
              {sellerDetails && sellerDetails.firstName}{" "}
              {sellerDetails && sellerDetails.lastName}
            </div>
            {sellerDetails.rating > 0 && (
              <div className="row">
                <div className="rating-num">
                  {sellerDetails && sellerDetails.rating}
                </div>

                <div className="rating-sub">
                  <Rating
                    rating={
                      sellerDetails && sellerDetails.rating <= 5
                        ? sellerDetails.rating
                        : "2"
                    }
                  />
                  <div className="reviews">
                    {sellerDetails
                      ? sellerDetails.ratingCount != undefined
                        ? sellerDetails.ratingCount
                        : "0"
                      : "0"}{" "}
                    reviews
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="container2">
            <ul>
              <li>
                <span>Job</span>
                <span>
                  {sellerDetails.job != undefined ? sellerDetails.job : "-"}
                </span>
              </li>
              <li>
                <span>Availability</span>
                <span>
                  {sellerDetails.availability != undefined
                    ? sellerDetails.availability
                    : "-"}
                </span>
              </li>
              {/* <li>
                <span>Age</span>
                <span>
                  {sellerDetails.age != undefined ? sellerDetails.age : "-"}
                </span>
              </li> */}
              <li>
                <span>Location</span>
                <span>
                  {sellerDetails.city != undefined ? sellerDetails.city : "-"}
                </span>
              </li>
            </ul>
          </div>
          <div className="seller-about-text">About</div>
          <div className="seller-about">
            {sellerDetails && sellerDetails.about}
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
