import React, { useContext, useEffect, useState } from "react";
import OrderItem from "../../../../components/orderItem/OrderItem";
import "./nOrder.scss";
import axios from "axios";
import { NavLink, Outlet } from "react-router-dom";
import { API_IP, API_IP_2, UserContext } from "../../../../helper/Context";

const api = axios.create({
  baseURL: `http://${API_IP_2}/api/`,
});

function NOrder() {
  const [orderList, setOrderList] = useState([]);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    api.get("/services").then((res) => {
      setOrderList(res.data);
    });
  };

  return (
    <div className="NOrder">
      <div className="order-list">
        <div className="left">
          <div className="cart-header">
            <div className="order-nav">
              <ul>
                {user.userType == "seller"  && user.isSellerActivated == true ? (
                  <NavLink
                    to={"/profile/orders/neworders"}
                    className={({ isActive }) =>
                      isActive ? "active-seller-nav" : "seller-nav"
                    }
                  >
                    <li>New</li>
                  </NavLink>
                ) : (
                  <></>
                )}

                <NavLink
                  to={"/profile/orders/activeorders"}
                  className={({ isActive }) =>
                    isActive ? "active-seller-nav" : "seller-nav"
                  }
                >
                  <li>Active</li>
                </NavLink>
                <NavLink
                  to={"/profile/orders/completedorders"}
                  className={({ isActive }) =>
                    isActive ? "active-seller-nav" : "seller-nav"
                  }
                >
                  <li>Completed</li>
                </NavLink>
              </ul>
            </div>
          </div>
          <Outlet />
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
              {/* <div className="row">
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
              </div> */}
            </div>
            <button>View Profile</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NOrder;
