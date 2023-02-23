import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import OrderItem from "../../../../components/orderItem/OrderItem";
import {
  API_IP_2,
  ProgressBarContext,
  UserContext,
} from "../../../../helper/Context";
import { NOrderActiveUserContext } from "./NOrder";
import LoadingBar from "react-top-loading-bar";

const api = axios.create({
  baseURL: `http://${API_IP_2}/api/`,
});

function PendingOrderNav() {
  const [orderList, setOrderList] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const { activeUser, setActiveUser } = useContext(NOrderActiveUserContext);
  const { progress, setProgress } = useContext(ProgressBarContext);

  useEffect(() => {
    fetchData();
  }, [user]);

  const fetchData = async () => {
    setProgress(10);
    await api
      .get(`/orders/buyer-pending-orders/${user._id}`)
      .then((res) => {
        setOrderList(res.data.orders);
        setActiveUser(res.data.orders ? res.data.orders[0] : null);
      })
      .catch((e) => {
        console.log(e);
      });
    setProgress(100);
  };
  return (
    <>
      {orderList &&
        orderList.map((item, index) => (
          <OrderItem
            selected={activeUser._id == item._id && true}
            orderId={item._id}
            name={item.name}
            serviceImg={item.serviceImg}
            title={item.title}
            active="3"
            proPic={item.proPic}
            serviceId = {item.service}
            onClickOnHeader={() => {
              setOrderList([
                ...orderList.slice(0, index),
                ...orderList.slice(index + 1),
              ]);
            }}
          />
        ))}
    </>
  );
}

export default PendingOrderNav;
