import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import CartItem from "../../../../components/cartItem/CartItem";
import ReviewList from "../../../../components/reviewList/ReviewList";
import { API_IP_2, PopUpScreenContext } from "../../../../helper/Context";
import "./serviceDetails.scss";

const api = axios.create({
  baseURL: `http://${API_IP_2}/api/`,
});

export default function ServiceDetails(props) {
  const [showPopup, setShowPopup] = useState(false);
  const [orderComplete, setOrderComplete] = useState(0);
  const [serviceDetails, setServiceDetails] = useState({});

  var { id } = useParams();

  useEffect(() => {
    fetchData();
  }, [id, serviceDetails]);

  const fetchData = () => {
    api.get(`/services/${id}`).then((res) => {
      setServiceDetails(res.data.service);
    });
  };

  return (
    <div className="ServiceDetails">
      <div className="service-details-wrap">
        <div className="service-container">
          <div className="seller">
            <div className="profile-img">
              <img
                src={serviceDetails.seller && serviceDetails.seller.proPic}
                alt=""
              />
            </div>
            <div className="container1">
              <div className="name">
                {serviceDetails.seller && serviceDetails.seller.name}
              </div>
              <div className="row">
                <div className="rating-num">4.5</div>
                <div className="rating-sub">
                  <div className="rating-star">
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                  </div>
                  <div className="reviews">10 reviews</div>
                </div>
              </div>
            </div>
            <i className="fa-solid fa-share-nodes"></i>
            <i className="fa-solid fa-cart-shopping"></i>
          </div>
          <div className="title">
            {serviceDetails.service && serviceDetails.service.title}
          </div>

          <img
            className="service-img"
            src={serviceDetails.service && serviceDetails.service.serviceImg}
            alt=""
          />
          <h1>About</h1>
          <div className="details">
            {serviceDetails.service && serviceDetails.description}
            <br />
          </div>
          <div className="buttons">
            <button
              onClick={() => {
                setShowPopup(true);
              }}
              className="hire-now-btn"
            >
              Hire Now
            </button>
            <button className="contact-now-btn">Contact now</button>
          </div>
          <ReviewList />
        </div>
      </div>
      {showPopup ? (
        <div className="popup-screen">
          <div className="popup-container">
            <CartItem type="hire" />
            <div className="popup-content">
              <label htmlFor="">Additional Details</label>
              <textarea name="" id=""></textarea>
              <div className="row">
                <div className="loader-container">
                  {orderComplete == 2 ? (
                    <i className="fa-regular fa-circle-check"></i>
                  ) : (
                    <></>
                  )}
                  <TailSpin
                    height="40"
                    width="40"
                    color="#4fa94d"
                    ariaLabel="tail-spin-loading"
                    radius="0"
                    visible={orderComplete == 1}
                  />
                </div>
                <div className="spacer"></div>
                <button
                  onClick={() => {
                    setOrderComplete(1);
                  }}
                  className="place-order-btn"
                >
                  Place Order
                </button>
              </div>
            </div>
            <div
              onClick={() => {
                setOrderComplete(0);
                setShowPopup(false);
              }}
              className="popup-close-btn"
            >
              <i class="fa-solid fa-xmark"></i>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
