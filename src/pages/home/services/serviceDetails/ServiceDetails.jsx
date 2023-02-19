import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CartItem from "../../../../components/cartItem/CartItem";
import Modal from "../../../../components/modal/Modal";
import Rating from "../../../../components/rating/Rating";
import ReviewList from "../../../../components/reviewList/ReviewList";
import {
  API_IP_2,
  ChatBoxContext,
  PopUpScreenContext,
  ProgressBarContext,
  UserContext,
} from "../../../../helper/Context";
import "./serviceDetails.scss";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import Ripples from "react-ripples";

const api = axios.create({
  baseURL: `http://${API_IP_2}/api/`,
});

export default function ServiceDetails(props) {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [orderDetails, setOrderDetails] = useState("");
  const [orderComplete, setOrderComplete] = useState(0);
  const [serviceDetails, setServiceDetails] = useState({});
  const [showShareModal, setShowShareModal] = useState(false);
  const { showChatBox, setShowChatBox } = useContext(ChatBoxContext);
  const [showModal, setShowModal] = useState("");
  const { user, setUser } = useContext(UserContext);
  const { progress, setProgress } = useContext(ProgressBarContext);

  const location = useLocation();

  var { id } = useParams();

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    setProgress(30);
    await api.get(`/services/${id}`).then((res) => {
      setServiceDetails(res.data.service);
    });
    setProgress(100);
  };
  const switchBuyer = () => {
    api
      .patch(
        `/users/${user.username}`,
        { isSellerActivated: false },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        setUser(res.data);
        console.log(res.data);
      });
  };

  return (
    <div className="ServiceDetails">
      <div className="service-details-wrap">
        <div className="service-container">
          <div className="seller">
            <div className="profile-img">
              <img
                src={
                  serviceDetails.seller &&
                  `http://${API_IP_2}/${serviceDetails.seller.proPic}`
                }
                alt=""
              />
            </div>
            <div className="container1">
              <div className="name">
                {serviceDetails.seller && serviceDetails.seller.name}
              </div>
              <div className="row">
                <div className="rating-num">4.5</div>
                <Rating rating="1" />
              </div>
            </div>
            <i
              onClick={() => {
                setShowShareModal(true);
              }}
              className="fa-solid fa-share-nodes"
            ></i>
            <i onClick={() => {}} className="fa-solid fa-cart-shopping"></i>
          </div>
          <div className="title">
            {serviceDetails.service && serviceDetails.service.title}
          </div>

          <div className="service-img">
            <img
              src={
                serviceDetails.service &&
                `http://${API_IP_2}/${serviceDetails.service.serviceImg}`
              }
              alt=""
            />
          </div>
          <h1>About</h1>
          <div className="details">
            {serviceDetails.service && serviceDetails.service.description}
            <br />
          </div>
          {serviceDetails.seller && serviceDetails.seller._id != user._id && (
            <div className="buttons">
              <Ripples
                className="riple-btn"
                color="rgba(255,255,255, 0.5)"
                during={1200}
              >
                <button
                  onClick={() => {
                    !user.isSellerActivated && user.userType != "guest"
                      ? setShowPopup(true)
                      : user.isSellerActivated
                      ? setShowModal("sellerToBuyer")
                      : navigate("/login");
                  }}
                  className="hire-now-btn"
                >
                  Hire Now
                </button>
              </Ripples>
              <Ripples
                className="riple-btn"
                color="rgba(25, 189, 120, 0.5)"
                during={1200}
              >
                <button
                  onClick={() => {
                    setShowChatBox(true);
                  }}
                  className="contact-now-btn"
                >
                  Contact now
                </button>
              </Ripples>
            </div>
          )}
          <ReviewList />
        </div>
      </div>
      {showModal == "sellerToBuyer" && (
        <Modal
          onClick={() => {
            setShowModal("");
          }}
          content={() => {
            return (
              <div className="seller-to-buyer">
                <Ripples
                  className="riple-btn"
                  color="rgba(255,255,255, 0.5)"
                  during={1200}
                >
                  <button
                    onClick={() => {
                      user.isSellerActivated == true && switchBuyer();
                    }}
                  >
                    Switch To Buyer
                  </button>
                </Ripples>
              </div>
            );
          }}
        />
      )}

      {showPopup ? (
        <div className="popup-screen">
          <div className="popup-container">
            <CartItem type="hire" service={serviceDetails} />
            <div className="popup-content">
              <label htmlFor="">Additional Details</label>
              <textarea
                value={orderDetails}
                onChange={(e) => {
                  setOrderDetails(e.target.value);
                  console.log(user);
                }}
                name=""
                id=""
              ></textarea>
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
                    api
                      .post("/orders", {
                        buyerId: user._id,
                        sellerId: serviceDetails.seller._id,
                        serviceId: id,
                        message: orderDetails,
                      })
                      .then((res) => {
                        res.status == 201 && setOrderComplete(1);
                        setShowPopup(false);
                      });
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
      {showShareModal && (
        <Modal
          exit_btn="true"
          title="Share Service"
          onClick={() => {
            setShowShareModal(false);
          }}
          content={() => {
            return (
              <div className="link-share-modal">
                <div className="title">Share this service via</div>
                <div className="links">
                  <FacebookShareButton
                    url={window.location.href}
                    quote={"check this out!"}
                    hashtag="hireNow"
                  >
                    <FacebookIcon size={45} round />
                  </FacebookShareButton>
                  <TelegramShareButton
                    url={window.location.href}
                    quote={"check this out!"}
                    hashtag="hireNow"
                  >
                    <TelegramIcon size={45} round />
                  </TelegramShareButton>
                  <TwitterShareButton
                    url={window.location.href}
                    quote={"check this out!"}
                    hashtag="hireNow"
                  >
                    <TwitterIcon size={45} round />
                  </TwitterShareButton>
                  <WhatsappShareButton
                    url={window.location.href}
                    quote={"check this out!"}
                    hashtag="hireNow"
                  >
                    <WhatsappIcon size={45} round />
                  </WhatsappShareButton>
                  <EmailShareButton
                    url={window.location.href}
                    quote={"check this out!"}
                    hashtag="hireNow"
                  >
                    <EmailIcon size={45} round />
                  </EmailShareButton>
                </div>
                <div className="title">Or copy link</div>
                <div className="copy-row">
                  <i class="fa-solid fa-link"></i>
                  <input value={window.location.href} type="text" />
                  <Ripples
                    className="riple-btn"
                    color="rgba(255,255,255, 0.5)"
                    during={1200}
                  >
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                      }}
                    >
                      copy
                    </button>
                  </Ripples>
                </div>
              </div>
            );
          }}
        />
      )}
    </div>
  );
}
