import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import OrderItem from "../../../../components/orderItem/OrderItem";
import { API_IP_2, UserContext } from "../../../../helper/Context";

const api = axios.create({
  baseURL: `http://${API_IP_2}/api/`,
});

function ActiveOrdersNav() {
  const [orderList, setOrderList] = useState([]);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    fetchData();
  }, [user]);

  const fetchData = () => {
    if (user.userType == "seller" && user.isSellerActivated) {
      api.get(`/orders/seller-active-orders/${user._id}`).then((res) => {
        setOrderList(res.data.orders);
      });
    } else if (user.userType == "buyer" || user.isSellerActivated == false) {
      api.get(`/orders/buyer-active-orders/${user._id}`).then((res) => {
        setOrderList(res.data.orders);
      });
    }
  };
  return (
    <>
      {orderList && orderList.map((item, index) => (
        <OrderItem
          orderId={item._id}
          name={item.name}
          serviceImg={item.serviceImg}
          title={item.title}
          active="1"
        />
      ))}
    </>
  );
}

export default ActiveOrdersNav;
