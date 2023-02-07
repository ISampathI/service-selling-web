import React, { useState } from "react";
import CartItem from "../../../components/cartItem/CartItem";
import "./cart.scss";

function Cart() {
  const [checkedAll, setCheckedAll] = useState(false);

  return (
    <div className="Cart">
      <div className="services-list">
        <div className="left">
          <div className="cart-header">
            <h1>
              Service Cart <span>(10)</span>
            </h1>
            <div className="spacer"></div>
            {checkedAll ? <button>Remove All</button> : <></>}
            <input
              type="checkbox"
              name=""
              id=""
              onChange={(e) => {
                setCheckedAll(e.target.checked);
              }}
            />
          </div>
          <CartItem checked={checkedAll} />
          <CartItem checked={checkedAll} />
          <CartItem checked={checkedAll} />
          <CartItem checked={checkedAll} />
          <CartItem checked={checkedAll} />
          <CartItem checked={checkedAll} />
          <CartItem checked={checkedAll} />
          <CartItem checked={checkedAll} />
          <CartItem checked={checkedAll} />
          <CartItem checked={checkedAll} />
          <CartItem checked={checkedAll} />
        </div>
        <div className="right">
          <div className="profile">
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
                <li>Year experience</li>
              </ul>
              <ul>
                <li>Gardner</li>
                <li>Full time</li>
                <li>25</li>
                <li>Kegalle</li>
                <li>6</li>
              </ul>
            </div>
            <button>Hire Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
