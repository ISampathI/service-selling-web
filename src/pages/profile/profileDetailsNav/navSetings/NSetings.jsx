import React, { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { UserContext } from "../../../../helper/Context";
import "./nSetings.scss";

function NSetings() {
  const { user, setUser } = useContext(UserContext);

  return (
    <div className="NSetings">
      <div className="edit-profile">
        <div className="up">
          <div className="seting-nav">
            <ul>
              <NavLink
                to={"/profile/settings/userinfo"}
                className={({ isActive }) =>
                  isActive ? "active-seller-nav" : "seller-nav"
                }
              >
                <li>User Info</li>
              </NavLink>
              {user.userType == "seller"  && user.isSellerActivated == true ?<NavLink
                to={"/profile/settings/sellerinfo"}
                className={({ isActive }) =>
                  isActive ? "active-seller-nav" : "seller-nav"
                }
              >
                <li>Seller Info</li>
              </NavLink>:<></>}
            </ul>
          </div>
        </div>
        <div className="down">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default NSetings;
