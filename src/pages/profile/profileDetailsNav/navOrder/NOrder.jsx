import React, { useContext, useEffect, useState } from "react";
import OrderItem from "../../../../components/orderItem/OrderItem";
import "./nOrder.scss";
import axios from "axios";
import { Link, NavLink, Outlet } from "react-router-dom";
import { API_IP, API_IP_2, UserContext } from "../../../../helper/Context";
import { createContext } from "react";
import defaultImg from "../../../../assets/img/defaultpropic.jpg";

const api = axios.create({
  baseURL: `http://${API_IP_2}/api/`,
});

export const NOrderActiveUserContext = createContext();
function NOrder() {
  const [orderList, setOrderList] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const [activeUser, setActiveUser] = useState();

  useEffect(() => {
    fetchData();
  }, [user]);

  const fetchData = () => {
    api.get("/services").then((res) => {
      setOrderList(res.data);
    });
  };

  return (
    <NOrderActiveUserContext.Provider value={{ activeUser, setActiveUser }}>
      <div className="NOrder">
        <div className="order-list">
          <div className="left">
            <div className="cart-header">
              <div className="order-nav">
                <ul>
                  {user.userType == "seller" &&
                  user.isSellerActivated == true ? (
                    <NavLink
                      to={"/profile/orders/neworders"}
                      className={({ isActive }) =>
                        isActive ? "active-seller-nav" : "seller-nav"
                      }
                    >
                      <li>New</li>
                    </NavLink>
                  ) : (
                    <NavLink
                      to={"/profile/orders/pendingorders"}
                      className={({ isActive }) =>
                        isActive ? "active-seller-nav" : "seller-nav"
                      }
                    >
                      <li>Pending</li>
                    </NavLink>
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
                  src={
                    activeUser != null
                      ? `http://${API_IP_2}/${activeUser.serviceImg}`
                      : defaultImg
                  }
                  alt=""
                />
              </div>
              <div className="container1">
                <div className="name">{activeUser && activeUser.name}</div>
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
              <Link to={activeUser && `/sellers/${activeUser.name}/services`}>
                <button disabled={!activeUser}>View Profile</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </NOrderActiveUserContext.Provider>
  );
}

export default NOrder;
