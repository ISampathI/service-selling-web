import React, { useContext } from "react";
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
import "./profileHeader.scss";
import axios from "axios";
import { API_IP, LoginContext, UserContext } from "../../../helper/Context";

const api = axios.create({
    baseURL: `http://${API_IP}/`
});
export default function ProfileHeader(props) {
  let navigate = useNavigate();
  const { loggedIn, setLoggedIn } = useContext(LoginContext);
  const { user, setUser } = useContext(UserContext);

  const doLogout = () => {
    api.get("/logout").then((res) => {
      setLoggedIn(false);
      setUser({});
    });
  };
  return (
    <>
      <div className="Header">
        <Link to="/" style={{ textDecoration: "none" }}>
          <div className="logo">
            <span>Hire</span> Now
          </div>
        </Link>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search"
            onKeyUp={(event) => {
              if (event.key == "Enter") {
                console.log(event.target.value);
                navigate("/services");
              }
            }}
          />
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
        <div className="nav-bar">
          {/* <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "active-nav" : "text-link"
            }
          >
            <nav>Home</nav>
          </NavLink> */}
          {user.role == "seller" ? (
            <NavLink
              to="/profile/services"
              className={({ isActive }) =>
                isActive ? "active-nav" : "text-link"
              }
            >
              <nav>Services</nav>
            </NavLink>
          ) : (
            <></>
          )}
          {user.role == "seller" ? (
            <NavLink
              to="/profile/gallery"
              className={({ isActive }) =>
                isActive ? "active-nav" : "text-link"
              }
            >
              <nav>Gallery</nav>
            </NavLink>
          ) : (
            <></>
          )}
          <NavLink
            to="/profile/orders"
            className={({ isActive }) =>
              isActive ? "active-nav" : "text-link"
            }
          >
            <nav>Orders</nav>
          </NavLink>
          <NavLink
            to="/profile/settings"
            className={({ isActive }) =>
              isActive ? "active-nav" : "text-link"
            }
          >
            <nav>Settings</nav>
          </NavLink>
        </div>
        <div className="buttons">
          {!loggedIn ? (
            <>
              <Link to="/login">
                <button className="login">Log in</button>
              </Link>
              <Link to="/signup">
                <button className="signup">Sign up</button>
              </Link>
            </>
          ) : (
            <>
              {user.role == "seller" ? (
                <Link to="/">
                  <button className="signup switch-btn">Switch to Buyer</button>
                </Link>
              ) : (
                <Link to="/profile">
                  <button className="signup switch-btn">Switch to Seller</button>
                </Link>
              )}

              <Link to="/profile/cart">
                <button className="icon">
                  <i className="fa-solid fa-cart-shopping"></i>
                </button>
              </Link>
              <div className="profile-img">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdXrN5H9Es9LsjxqNrUFbuEXtdc6q1457prQ&usqp=CAU"
                  alt=""
                />
                <div className="account-hover-list">
                  <div className="title">Welcome back</div>
                  <ul>
                    <li onClick={doLogout}>Log Out</li>
                  </ul>
                </div>
              </div>
              {/* <button className="signup" onClick={doLogout}>
                Logout
              </button> */}
            </>
          )}
        </div>
      </div>
    </>
  );
}
