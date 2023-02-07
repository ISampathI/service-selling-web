import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../modal/Modal";
import "./orderItem.scss";

function OrderItem(props) {
  const [acceptModal, setAcceptModal] = useState(false);
  const [denyModal, setDenyModal] = useState(0);

  return (
    <div className="OrderItem">
      <div className="up">
        <div className="seller">
          <div className="profile-img">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdXrN5H9Es9LsjxqNrUFbuEXtdc6q1457prQ&usqp=CAU"
              alt=""
            />
          </div>
          <div className="container">
            <div className="name">Lernal heral</div>
          </div>
          {/* <input type="checkbox" name="" id="" /> */}
        </div>
      </div>
      {/* <i className="fa-regular fa-trash-can"></i> */}
      <div className="down">
        <Link to="/profile/orders/servicedetails" className="react-link">
          <div className="service-view">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5o1JEx5HkuIza83FgPMcXYA5aylxAwGXGyA&usqp=CAU"
              alt=""
            />
            <div className="column">
              <div className="title">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Tempora, ipsum?
              </div>
              <div className="price">RS:2000</div>
            </div>
          </div>
        </Link>
        <div className="buttons">
          {props.active != "1" && props.active != "2" ? (
            <>
              <button
                onClick={() => {
                  setAcceptModal(true);
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
            <button className="complete-accept-btn">Complete</button>
          ) : (
            <></>
          )}
        </div>
      </div>
      {acceptModal && (
        <Modal
          onClick={() => {
            setAcceptModal(false);
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
    </div>
  );
}

export default OrderItem;
