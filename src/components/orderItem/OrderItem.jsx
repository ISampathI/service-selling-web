import axios from "axios";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { API_IP_2, UserContext } from "../../helper/Context";
import Modal from "../modal/Modal";
import "./orderItem.scss";
import Ripples from "react-ripples";
import defaultImg from "../../assets/img/defaultpropic.png";

const api = axios.create({
  baseURL: `http://${API_IP_2}/api/`,
});
function OrderItem(props) {
  const { user, setUser } = useContext(UserContext);
  const [orderPrice, setOrderPrice] = useState();
  const [acceptModal, setAcceptModal] = useState(false);
  const [denyModal, setDenyModal] = useState(0);
  const [completeModal, setCompleteModal] = useState(0);
  const [reviewModal, setReviewModal] = useState(0);
  const [ratingStares, setRatingStares] = useState(1);
  const [review, setReview] = useState("");

  return (
    <div
      className={props.selected ? "OrderItem OrderItemSelected" : "OrderItem"}
    >
      <div className="up">
        <div className="seller" onClick={props.onClickOnHeader}>
          <div className="profile-img">
            <img
              src={
                props.proPic != undefined
                  ? `http://${API_IP_2}/api/${props.proPic}`
                  : defaultImg
              }
              alt=""
            />
          </div>
          <div className="container">
            <div className="name">{props.name}</div>
          </div>
          {/* <input type="checkbox" name="" id="" /> */}
        </div>
      </div>
      {/* <i className="fa-regular fa-trash-can"></i> */}
      <div className="down">
        <Link
          to={`/profile/orders/servicedetails/${props.orderId}`}
          className="react-link"
        >
          <div className="service-view">
            <img src={`http://${API_IP_2}/api/${props.serviceImg}`} alt="" />
            <div className="column">
              <div className="title">{props.title}</div>
              <div className="price">{props.price}</div>
            </div>
          </div>
        </Link>
        <div className="buttons">
          {props.active != "1" && props.active != "2" && props.active != "3" ? (
            <>
              <button
                onClick={() => {
                  setAcceptModal(true);
                  api
                    .patch(`/orders/${props.orderId}`, [
                      { propName: "status", value: "active" },
                    ])
                    .then((res) => {});
                }}
                className="order-accept-btn"
              >
                Accept
              </button>
              <button
                onClick={() => {
                  setDenyModal(true);
                }}
                className="order-deny-btn"
              >
                Deny
              </button>
            </>
          ) : (
            <></>
          )}
          {props.active == "1" ? (
            <button
              onClick={() => {
                user.userType == "seller" && user.isSellerActivated
                  ? setCompleteModal(1)
                  : setCompleteModal(2);
              }}
              className="complete-accept-btn"
            >
              Complete
            </button>
          ) : (
            <></>
          )}
          {props.active == "3" ? (
            <button disabled className="pending-accept-btn">
              Pending...
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>
      {acceptModal && (
        <Modal
          onClick={() => {
            setAcceptModal(false);
            props.onClickOnComplete();
          }}
          content={() => {
            return (
              <div className="order-accept">
                <i class="fa-regular fa-circle-check"></i>
                <span>Order Accepted !</span>
              </div>
            );
          }}
        />
      )}
      {(denyModal == 1 || denyModal == 2) && (
        <Modal
          onClick={
            denyModal == 2
              ? () => {
                  setDenyModal(0);
                }
              : () => {}
          }
          content={() => {
            return denyModal == 1 ? (
              <div className="order-deny">
                <div className="title">Cancel Order?</div>
                <div className="qustion">
                  Are you sure you want to cancel this order?
                </div>
                <div className="buttons">
                  <button
                    onClick={() => {
                      setDenyModal(2);
                    }}
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => {
                      setDenyModal(0);
                    }}
                  >
                    No
                  </button>
                </div>
                {/* <i class="fa-regular fa-circle-xmark"></i>
                <span>Order Deny !</span> */}
              </div>
            ) : denyModal == 2 ? (
              <div className="order-deny-message">
                <i class="fa-regular fa-circle-check"></i>
                <span>Order canceled !</span>
              </div>
            ) : (
              <></>
            );
          }}
        />
      )}
      {reviewModal == 1 && (
        <Modal
          content={() => {
            return (
              <div className="review-modal">
                <div className="title">Service Review</div>
                <img src="" alt="" />
                <div className="name">{props.name}m</div>
                <p>Rate and review the service</p>
                <div className="stars">
                  <i
                    onClick={() => {
                      setRatingStares(1);
                    }}
                    class={
                      ratingStares >= 1
                        ? "fa-solid fa-star"
                        : "fa-regular fa-star"
                    }
                  ></i>
                  <i
                    onClick={() => {
                      setRatingStares(2);
                    }}
                    class={
                      ratingStares >= 2
                        ? "fa-solid fa-star"
                        : "fa-regular fa-star"
                    }
                  ></i>
                  <i
                    onClick={() => {
                      setRatingStares(3);
                    }}
                    class={
                      ratingStares >= 3
                        ? "fa-solid fa-star"
                        : "fa-regular fa-star"
                    }
                  ></i>
                  <i
                    onClick={() => {
                      setRatingStares(4);
                    }}
                    class={
                      ratingStares >= 4
                        ? "fa-solid fa-star"
                        : "fa-regular fa-star"
                    }
                  ></i>
                  <i
                    onClick={() => {
                      setRatingStares(5);
                    }}
                    class={
                      ratingStares >= 5
                        ? "fa-solid fa-star"
                        : "fa-regular fa-star"
                    }
                  ></i>
                </div>
                <textarea
                  value={review}
                  onChange={(e) => {
                    setReview(e.target.value);
                  }}
                />
                <Ripples
                  className="riple-btn"
                  color="rgba(255,255,255, 0.5)"
                  during={1200}
                >
                  <button
                    onClick={() => {
                      const reviewObject = {
                        service: props.serviceId,
                        buyer: user._id,
                        rating: ratingStares,
                        review: review,
                      };
                      console.log(reviewObject);
                      api
                        .post(`/reviews`, reviewObject)
                        .then((res) => {
                          console.log(res);
                          setReviewModal(0);
                          props.onClickOnComplete();
                        })
                        .catch((e) => {});
                    }}
                  >
                    Submit Review
                  </button>
                </Ripples>
              </div>
            );
          }}
        ></Modal>
      )}
      {completeModal == 1 && (
        <Modal
          exit_btn="true"
          title="Payment"
          onClick={() => {
            setCompleteModal(0);
          }}
          content={() => {
            return (
              <div className="order-complete-seller">
                <div className="details">
                  <ul>
                    <li>Buyer name</li>
                  </ul>
                  <ul>
                    <li>Jhon ali</li>
                  </ul>
                </div>
                <div className="payment-amount">
                  <p>Payment</p>{" "}
                  <input
                    value={orderPrice}
                    onChange={(e) => {
                      setOrderPrice(e.target.value);
                    }}
                    placeholder="Enter Amount"
                    type="number"
                  />
                </div>
                <div className="buttons">
                  <button
                    onClick={() => {
                      api
                        .patch(`/orders/${props.orderId}`, [
                          { propName: "status", value: "completed" },
                          { propName: "price", value: orderPrice },
                        ])
                        .then((res) => {
                          props.onClickOnComplete();
                        });
                      setCompleteModal(0);
                    }}
                  >
                    Submit
                  </button>
                </div>
                {/* <i class="fa-regular fa-circle-check"></i>
                <span>Order Completed !</span> */}
              </div>
            );
          }}
        />
      )}
      {completeModal == 2 && (
        <Modal
          exit_btn="true"
          title="Pay Summery"
          onClick={() => {
            setCompleteModal(0);
          }}
          content={() => {
            return (
              <div className="order-complete-buyer">
                <div className="details">
                  <ul>
                    <li>Seller name</li>
                  </ul>
                  <ul>
                    <li>Jhon ali</li>
                  </ul>
                </div>
                <div className="payment-amount">
                  <p>payment amount</p> <span>5000</span>
                </div>
                <div className="buttons">
                  <button
                    onClick={() => {
                      api
                        .patch(`/orders/${props.orderId}`, [
                          { propName: "status", value: "completed" },
                          { propName: "paid", value: true },
                          { propName: "method", value: "online" },
                        ])
                        .then((res) => {
                          setCompleteModal(0);
                          setReviewModal(1);
                        });
                    }}
                  >
                    <i class="fa-regular fa-credit-card"></i>Pay Online
                  </button>
                  <button
                    onClick={() => {
                      api
                        .patch(`/orders/${props.orderId}`, [
                          { propName: "status", value: "completed" },
                          { propName: "paid", value: true },
                          { propName: "method", value: "cash" },
                        ])
                        .then((res) => {
                          props.onClickOnComplete();
                        });
                      setCompleteModal(0);
                    }}
                  >
                    <i class="fa-regular fa-handshake"></i>Cash
                  </button>
                </div>
              </div>
            );
          }}
        />
      )}
    </div>
  );
}

export default OrderItem;
