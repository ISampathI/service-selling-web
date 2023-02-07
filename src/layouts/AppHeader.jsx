import React, { useContext } from "react";
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
import "./appHeader.scss";
import axios from "axios";
import { LoginContext, UserContext } from "../helper/Context";

const api = axios.create({
  baseURL: "http://localhost:5001/",
});
export default function AppHeader(props) {
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
        <div className="logo">
          <span>Hire</span> Now
        </div>
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
                <button className="login">Log in</button>
              </Link>
              <Link to="/signup">
                <button className="signup">Sign up</button>
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
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdXrN5H9Es9LsjxqNrUFbuEXtdc6q1457prQ&usqp=CAU"
                  alt=""
                />
                <div className="account-hover-list">
                  <div className="title">Welcome back</div>
                  <ul>
                    <Link
                      to="/profile/services"
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
