import React, { useContext, useEffect } from "react";
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
import "./appHeader.scss";
import axios from "axios";
import {
  API_IP_2,
  ChangeHeaderNavColorContext,
  LoginContext,
  ProgressBarContext,
  UserContext,
} from "../helper/Context";
import { useCookies } from "react-cookie";
import defaultImg from "../assets/img/defaultpropic.jpg";

const api = axios.create({
  baseURL: `http://${API_IP_2}/`,
});
export default function AppHeader(props) {
  let navigate = useNavigate();
  const { loggedIn, setLoggedIn } = useContext(LoginContext);
  const { user, setUser } = useContext(UserContext);
  const { changeHeaderNavColor, setChangeHeaderNavColor } = useContext(
    ChangeHeaderNavColorContext
  );
  const [cookies, setCookie] = useCookies(["token"]);
  const { progress, setProgress } = useContext(ProgressBarContext);
  
  const doLogout = () => {

    setCookie("token", "expired", { path: "/" });
    setLoggedIn(false);
    navigate("/");
  };

  useEffect(() => {}, [user]);

  return (
    <>
      <div className={changeHeaderNavColor ? "Header header-scroll" : "Header"}>
        <div className="logo">
          <span>Hire</span> Now
        </div>
        <div className="logo-md">
          <i class="fa-solid fa-bars"></i>
        </div>
        <div className="search-bar">
          <input
            type="text"
            placeholder="What services are you looking for?"
            onKeyUp={(event) => {
              if (event.key == "Enter") {
                navigate("/services");
              }
            }}
          />
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
        <div className="nav-bar">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "active-nav" : "text-link"
            }
          >
            <nav>Home</nav>
          </NavLink>
          <NavLink
            to="/services"
            className={({ isActive }) =>
              isActive ? "active-nav" : "text-link"
            }
          >
            <nav>Services</nav>
          </NavLink>
          <NavLink
            to="/sellers"
            className={({ isActive }) =>
              isActive ? "active-nav" : "text-link"
            }
          >
            <nav>Sellers</nav>
          </NavLink>
          <NavLink
            to="/whyhirenow"
            className={({ isActive }) =>
              isActive ? "active-nav" : "text-link"
            }
          >
            <nav>About</nav>
          </NavLink>
        </div>
        <div className="buttons">
          {!loggedIn ? (
            <>
              <Link to="/login">
                <button className="login">Sign in</button>
              </Link>
              <Link to="/signup">
                <button className="signup">Register Now</button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/cart">
                <button className="icon">
                  <i className="fa-solid fa-cart-shopping"></i>
                </button>
              </Link>
              <div className="profile-img">
                <img
                  src={user.proPic ? `http://${API_IP_2}/${user.proPic}`: defaultImg}
                  alt=""
                />
                <div className="account-hover-list">
                  <div className="title">Welcome back</div>
                  <ul>
                    <Link
                      to={
                        user.userType == "seller" &&
                        user.isSellerActivated == true
                          ? "/profile/services"
                          : user.userType == "buyer" ||
                            user.userType == "seller"
                          ? "/profile/orders"
                          : "/"
                      }
                      style={{ textDecoration: "none" }}
                      className="react-link"
                    >
                      <li>My Profile</li>
                    </Link>
                    <li>My Cart</li>
                    <li>Message Center</li>
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
