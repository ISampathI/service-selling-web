import React, { createContext, useContext, useEffect, useState } from "react";
import CartItem from "../../../components/cartItem/CartItem";
import "./cart.scss";
import axios from "axios";
import {
  API_IP,
  API_IP_2,
  ChangeHeaderNavColorContext,
  ProgressBarContext,
  UserContext,
} from "../../../helper/Context";
import Footer from "../../../layouts/Footer";
import defaultImg from "../../../assets/img/defaultpropic.png";
import Rating from "../../../components/rating/Rating";

const api = axios.create({
  baseURL: `http://${API_IP_2}/`,
});
export const CartListContext = createContext();

function Cart() {
  const { user, setUser } = useContext(UserContext);
  const [checkedAll, setCheckedAll] = useState(false);
  const [cartList, setCartList] = useState([]);
  const [selectedList, setSelectedList] = useState([]);
  const [updateUi, setUpdateUi] = useState(false);
  const [checkedUser, setCheckedUser] = useState([]);
  const [selectedItem, setSelectedItem] = useState(0);
  const { progress, setProgress } = useContext(ProgressBarContext);

  const { changeHeaderNavColor, setChangeHeaderNavColor } = useContext(
    ChangeHeaderNavColorContext
  );

  useEffect(() => {
    setChangeHeaderNavColor(true);
    fetchData();
  }, []);

  const fetchData = async () => {
    setProgress(10);
    await api
      .get(`/api/cart/cart-items/${user._id}`, {})
      .then((res) => {
        setCartList(res.data.cartItems);
        setCheckedUser(res.data.cartItems[0].service.seller);
      })
      .catch((e) => {
        console.log(e);
      });
    setProgress(100);
  };
  const removeFromList = (index) => {
    setCartList([...cartList.slice(0, index), ...cartList.slice(index + 1)]);
    //setUpdateUi(!updateUi);
  };
  return (
    <CartListContext.Provider value={{ updateUi, setUpdateUi }}>
      <div className="Cart">
        <div className="services-list">
          <div className="left">
            <div className="cart-header">
              <h1>
                Service Cart <span>({cartList ? cartList.length : 0})</span>
              </h1>
              <div className="spacer"></div>
              {checkedAll || selectedList.length > 0 ? (
                <button
                  onClick={async () => {
                    setProgress(10);
                    await api
                      .get(`/api/cart/delete-all/`, {
                        cartIds: selectedList.filter((value, index, array) => {
                          return selectedList.indexOf(value) === index;
                        }),
                      })
                      .then((res) => {
                        setProgress(100);
                        console.log(res);
                      })
                      .catch((e) => {
                        console.log(e);
                      });
                  }}
                >
                  Remove All
                </button>
              ) : (
                <></>
              )}
              <input
                type="checkbox"
                name=""
                id=""
                onChange={(e) => {
                  setCheckedAll(e.target.checked);
                  let tempList = [];
                  e.target.checked &&
                    cartList.forEach((element) => {
                      tempList.push(element._id);
                    });

                  console.log("##", tempList);
                  setSelectedList(tempList);
                }}
              />
            </div>
            {cartList &&
              cartList.length > 0 &&
              cartList.map((item, index) => (
                <CartItem
                  cart_id={index}
                  cartItem_id={item._id}
                  service={item.service}
                  isSelected={index == selectedItem}
                  onClickOnItem={() => {
                    setCheckedUser(item.service.seller);
                    setSelectedItem(index);
                  }}
                  onChecked={() => {
                    setSelectedList([...selectedList, item._id]);
                  }}
                  onUnChecked={() => {
                    setSelectedList(
                      selectedList.filter((sitem) => sitem != item._id)
                    );
                  }}
                  onClickRemove={async () => {
                    setProgress(10);
                    await api
                      .delete(`/api/cart/${item._id}`)
                      .then(() => {
                        setProgress(100);
                      })
                      .catch(() => {});
                    removeFromList(index);
                  }}
                  checked={checkedAll}
                />
              ))}
          </div>
          <div className="right">
            <div className="profile">
              <div className="profile-img">
                <img
                  src={
                    checkedUser.proPic
                      ? `http://${API_IP_2}/api/${checkedUser.proPic}`
                      : defaultImg
                  }
                  alt=""
                />
              </div>
              <div className="container1">
                <div className="name">
                  {checkedUser.name ? checkedUser.name : "Seeller"}
                </div>
                <div className="row">
                  <div className="rating-num">
                    {checkedUser.rating ? checkedUser.rating : "-"}
                  </div>
                  <div className="rating-sub">
                    <Rating rating={"3"} />
                    <div className="reviews">10 reviews</div>
                  </div>
                </div>
              </div>
              {/* <div className="container2">
                <ul>
                  <li>Job</li>
                  <li>Availability</li>
                  <li>Age</li>
                  <li>Location</li>
                </ul>
                <ul>
                  <li>{checkedUser.job ? checkedUser.job : "-"}dhjfdgjhfgsfhdsgfsjhfgdsfjsg</li>
                  <li>{checkedUser.availability ? checkedUser.availability : "-"}</li>
                  <li>{checkedUser.age ? checkedUser.age : "-"}</li>
                  <li>{checkedUser.city ? checkedUser.city : "-"}</li>
                </ul>
              </div> */}
              <div className="container2">
                <ul>
                  <li>
                    <span>Job</span>
                    <span>{checkedUser.job ? checkedUser.job : "-"}</span>
                  </li>
                  <li>
                    <span>Availability</span>
                    <span>
                      {checkedUser.availability != undefined
                        ? checkedUser.availability
                        : "-"}
                    </span>
                  </li>
                  <li>
                    <span>Age</span>
                    <span>
                      {checkedUser.age != undefined ? checkedUser.age : "-"}
                    </span>
                  </li>
                  <li>
                    <span>Location</span>
                    <span>
                      {checkedUser.city != undefined ? checkedUser.city : "-"}
                    </span>
                  </li>
                </ul>
              </div>
              <button>Hire Now</button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </CartListContext.Provider>
  );
}

export default Cart;
