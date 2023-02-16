import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import OrderItem from "../../../../components/orderItem/OrderItem";
import { API_IP_2 } from "../../../../helper/Context";

const api = axios.create({
  baseURL: `http://${API_IP_2}/api/`,
});

function CompletedOrdersNav() {
  const [orderList, setOrderList] = useState([]);
  const { user, setUser } = useContext(useContext);

  useEffect(() => {
    fetchData();
  }, [user]);

  const fetchData = () => {
    api.get(`/orders/buyer-completed-orders/${user._id}`).then((res) => {
      setOrderList(res.data.orders);
    });
  };
  return (
    <>
      {orderList.map((item, index) => (
        <OrderItem active="2" />
      ))}
    </>
  );
}

export default CompletedOrdersNav;
