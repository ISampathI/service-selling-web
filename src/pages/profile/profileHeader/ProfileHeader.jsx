import React, { useContext, useEffect } from "react";
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
import "./profileHeader.scss";
import axios from "axios";
import {
  API_IP,
  API_IP_2,
  LoginContext,
  UserContext,
} from "../../../helper/Context";
import Footer from "../../../layouts/Footer";
import { Cookies, useCookies } from "react-cookie";

const api = axios.create({
  baseURL: `http://${API_IP_2}/`,
});
export default function ProfileHeader(props) {
  let navigate = useNavigate();
  const { loggedIn, setLoggedIn } = useContext(LoginContext);
  const { user, setUser } = useContext(UserContext);
  const [cookies, setCookie] = useCookies(["token"]);

  useEffect(() => {
  }, []);

  const doLogout = () => {
    // api.get("/logout").then((res) => {
    //   setLoggedIn(false);
    //   setUser({});
    // });
  };

  const switchSeller = (toSeller = true) => {
    console.log("eeeee");
    api
      .patch(
        `api/users/${user.username}`,
        { isSellerActivated: toSeller },
        {
          headers: {
            Authorization: `Bearer ${Cookies.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        setUser(res.data);
      });
  };
  return (
    <>
      <div className="ProfileHeader">
        <Link to="/" style={{ textDecoration: "none" }} className="react-link">
          <div className="logo">
            <span>Hire</span> Now
          </div>
          <div className="logo-md">
            <i class="fa-solid fa-bars"></i>
          </div>
        </Link>
        {/* <div className="search-bar">
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
        </div> */}
        <div className="nav-bar">
          {/* <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "active-nav" : "text-link"
            }
          >
            <nav>Home</nav>
          </NavLink> */}
          {user.userType == "seller" && user.isSellerActivated == true ? (
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
          {user.userType == "seller" && user.isSellerActivated == true ? (
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
              {user.userType == "seller" && user.isSellerActivated == true ? (
                <Link
                  to="/"
                  onClick={() => {
                    switchSeller(false);
                  }}
                >
                  <button className="signup switch-btn">Switch to Buyer</button>
                </Link>
              ) : (
                <Link
                  to="/"
                  onClick={() => {
                    switchSeller(true);
                  }}
                >
                  <button className="signup switch-btn">
                    Switch to Seller
                  </button>
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
