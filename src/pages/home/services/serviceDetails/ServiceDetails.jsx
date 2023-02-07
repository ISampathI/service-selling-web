import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { createContext, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import CartItem from "../../../../components/cartItem/CartItem";
import { PopUpScreenContext } from "../../../../helper/Context";
import "./serviceDetails.scss";

export default function ServiceDetails(props) {
  const [showPopup, setShowPopup] = useState(false);
  const [orderComplete, setOrderComplete] = useState(0);

  return (
    <div className="ServiceDetails">
      <div className="service-details-wrap">
        <div className="service-container">
          <div className="seller">
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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem,
            necessitatibus.
          </div>

          <img
            className="service-img"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5o1JEx5HkuIza83FgPMcXYA5aylxAwGXGyA&usqp=CAU"
            alt=""
          />
          <h1>About</h1>
          <div className="details">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
            mollitia alias ipsa labore inventore? Veniam pariatur inventore
            necessitatibus et numquam atque! Magni quod aliquid at, recusandae
            saepe perspiciatis nulla maiores accusamus et corporis neque.
            Voluptate voluptas fugit mollitia rem iusto quisquam, distinctio
            quas impedit facere quibusdam explicabo fuga delectus dolore!
            <br />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
            consequuntur ut error quos omnis voluptatibus qui sapiente natus
            sunt cupiditate dolor veritatis fuga, reiciendis eos fugit similique
            debitis odio suscipit deserunt quibusdam perferendis, unde facere!
            Rerum fuga nihil deleniti natus? Beatae, repellat dicta! Minus
            dolore tenetur itaque doloremque facilis provident.
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
