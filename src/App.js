import "./App.scss";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AppHeader from "./layouts/AppHeader";
import Land from "./pages/home/home/Land";
import { Navigate, Route, Routes } from "react-router-dom";
import Services from "./pages/home/services/Services";
import Sellers from "./pages/home/sellers/Sellers";
import ServiceDetails from "./pages/home/services/serviceDetails/ServiceDetails";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Home from "./pages/home/Home";
import SellerDetails from "./pages/home/sellers/sellerDetails/SellerDetails";
import SellerDetailsNav from "./pages/home/sellers/sellerDetails/sellerDetailsNav/SellerDetailsNav";
import { ChatBoxContext, LoginContext, UserContext } from "./helper/Context";
import { useEffect, useState } from "react";
import Cart from "./pages/home/cart/Cart";
import Chat from "./components/chat/Chat";
import Profile from "./pages/profile/Profile";
import NServices from "./pages/profile/profileDetailsNav/nav-services/NServices";
import NGallery from "./pages/profile/profileDetailsNav/nav-gallery/NGallery";
import EditService from "./pages/profile/components/EditService";
import NOrder from "./pages/profile/profileDetailsNav/navOrder/NOrder";
import NSetings from "./pages/profile/profileDetailsNav/navSetings/NSetings";
import EditUserInfo from "./pages/profile/components/EditUserInfo";
import EditSellerInfo from "./pages/profile/components/EditSellerInfo";
import NewOrdersNav from "./pages/profile/profileDetailsNav/navOrder/NewOrdersNav";
import ActiveOrdersNav from "./pages/profile/profileDetailsNav/navOrder/ActiveOrdersNav";
import CompletedOrdersNav from "./pages/profile/profileDetailsNav/navOrder/CompletedOrdersNav";
import OrderServiceDetails from "./pages/profile/profileDetailsNav/navOrder/orderServiceDetails/OrderServiceDetails";
function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [showChatBox, setShowChatBox] = useState(false);

  return (
    <div className="App">
      <LoginContext.Provider value={{ loggedIn, setLoggedIn }}>
        <UserContext.Provider value={{ user, setUser }}>
          <ChatBoxContext.Provider value={{ showChatBox, setShowChatBox }}>
            <Routes>
              <Route path="/" element={<Home />}>
                <Route path="" element={<Land />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/services" element={<Services />}>
                  <Route path="servicedetails" element={<ServiceDetails />} />
                </Route>
                <Route path="/sellers" element={<Sellers />}>
                  
                  <Route path="servicedetails" element={<ServiceDetails />} />
                </Route>
                <Route path="sellers/sellerdetails" element={<SellerDetails />}>
                    <Route
                      path="services"
                      element={<SellerDetailsNav name="services" />}
                    />
                    <Route
                      path="gallery"
                      element={<SellerDetailsNav name="gallery" />}
                    />
                    <Route
                      path="chat"
                      element={<SellerDetailsNav name="chat" />}
                    />
                  </Route>
              </Route>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile" element={<Profile />}>
                <Route path="services" element={<NServices />} />
                <Route path="orders" element={<NOrder />}>
                  <Route
                    path=""
                    element={
                      <Navigate
                        to={
                          user.role == "seller"
                            ? "neworders"
                            : user.role == "buyer"
                            ? "activeorders"
                            : ""
                        }
                      />
                    }
                  />
                  <Route path="neworders" element={<NewOrdersNav />} />
                  <Route path="activeorders" element={<ActiveOrdersNav />} />
                  <Route
                    path="completedorders"
                    element={<CompletedOrdersNav />}
                  />

                  <Route
                    path="servicedetails"
                    element={<OrderServiceDetails type="order" />}
                  />
                </Route>
                <Route path="gallery" element={<NGallery />} />
                <Route path="cart" element={<Cart />} />
                <Route path="settings" element={<NSetings />}>
                  <Route path="" element={<Navigate to="userinfo" />} />
                  <Route path="userinfo" element={<EditUserInfo />} />
                  <Route path="sellerinfo" element={<EditSellerInfo />} />
                </Route>

                <Route path="services/view" element={<ServiceDetails />} />
                <Route path="services/edit" element={<EditService />} />
                <Route
                  path="services/new"
                  element={<EditService type="new" />}
                />
              </Route>
            </Routes>
          </ChatBoxContext.Provider>
        </UserContext.Provider>
      </LoginContext.Provider>
    </div>
  );
}

export default App;
