import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import OrderItem from "../../../../components/orderItem/OrderItem";
import { API_IP_2, ProgressBarContext, UserContext } from "../../../../helper/Context";
import { NOrderActiveUserContext } from "./NOrder";
import LoadingBar from "react-top-loading-bar";

const api = axios.create({
  baseURL: `http://${API_IP_2}/api/`,
});

function ActiveOrdersNav() {
  const [orderList, setOrderList] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const { activeUser, setActiveUser } = useContext(NOrderActiveUserContext);
  const { progress, setProgress } = useContext(ProgressBarContext);

  useEffect(() => {
    fetchData();
    console.log([user, orderList]);
  }, [user]);

  const fetchData = async() => {
    setProgress(10)
    if (user.userType == "seller" && user.isSellerActivated) {
      await api.get(`/orders/seller-active-orders/${user._id}`).then((res) => {
        setOrderList(res.data.orders);
        setActiveUser(res.data.orders ? res.data.orders[0] : null);
        console.log(res.data.orders);
      }).catch((e)=>{
        console.log(e);
      });
    } else if (user.userType == "buyer" || user.isSellerActivated == false) {
      await api.get(`/orders/buyer-active-orders/${user._id}`).then((res) => {
        res.data.orders && setOrderList(res.data.orders);
        setActiveUser(res.data.orders ? res.data.orders[0] : null);
        console.log(res.data.orders);
      }).catch((e)=>{
        console.log(e);
      });
    }
    setProgress(100)
  };
  return (
    <>
      {orderList &&
        orderList.map((item, index) => (
          <OrderItem
            selected={activeUser._id == item._id && true}
            orderId={item._id}
            name={item.name}
            proPic={item.proPic}
            serviceImg={item.serviceImg}
            title={item.title}
            active="1"
            onClickOnHeader={() => {
              setActiveUser(item);
            }}
            onClickOnComplete={() => {
              setOrderList([...orderList.slice(0, index), ...orderList.slice(index + 1)])
            }}
          />
        ))}
    </>
  );
}

export default ActiveOrdersNav;
