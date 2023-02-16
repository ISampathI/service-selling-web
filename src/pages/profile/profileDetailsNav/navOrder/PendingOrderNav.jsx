import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import OrderItem from "../../../../components/orderItem/OrderItem";
import { API_IP_2, UserContext } from "../../../../helper/Context";

const api = axios.create({
  baseURL: `http://${API_IP_2}/api/`,
});

function PendingOrderNav() {
  const [orderList, setOrderList] = useState([]);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    fetchData();
  }, [user]);

  const fetchData = () => {
    api.get(`/orders/buyer-pending-orders/${user._id}`).then((res) => {
      setOrderList(res.data.orders);
    });
  };
  return (
    <>
      {orderList.map((item, index) => (
        <OrderItem active="3"/>
      ))}
    </>
  );
}

export default PendingOrderNav;
