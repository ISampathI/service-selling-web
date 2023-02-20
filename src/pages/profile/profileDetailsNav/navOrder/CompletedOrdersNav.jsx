import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import OrderItem from "../../../../components/orderItem/OrderItem";
import { API_IP_2, UserContext } from "../../../../helper/Context";
import { NOrderActiveUserContext } from "./NOrder";

const api = axios.create({
  baseURL: `http://${API_IP_2}/api/`,
});

function CompletedOrdersNav() {
  const [orderList, setOrderList] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const { activeUser, setActiveUser } = useContext(NOrderActiveUserContext);
  

  useEffect(() => {
    fetchData();
  }, [user]);

  const fetchData = () => {
    if (user.userType == "seller" && user.isSellerActivated) {
      api.get(`/orders/seller-completed-orders/${user._id}`).then((res) => {
        setOrderList(res.data.orders);
        setActiveUser(res.data.orders ? res.data.orders[0] : null);
      }).catch((e)=>{
        console.log(e);
      });
    } else if (user.userType == "buyer" || user.isSellerActivated == false) {
      api.get(`/orders/buyer-completed-orders/${user._id}`).then((res) => {
        setOrderList(res.data.orders);
        setActiveUser(res.data.orders ? res.data.orders[0] : null);
      }).catch((e)=>{
        console.log(e);
      });
    }

    // api.get(`/orders/buyer-pending-orders/${user._id}`).then((res) => {
    //   setOrderList(res.data.orders);
    // });
  };
  return (
    <>
      {orderList &&
        orderList.map((item, index) => (
          <OrderItem
          selected = {activeUser._id == item._id && true}
            orderId={item._id}
            name={item.name}
            serviceImg={item.serviceImg}
            title={item.title}
            active="2"
            onClickOnHeader={() => {
              setActiveUser(item);
            }}
          />
        ))}
    </>
  );
}

export default CompletedOrdersNav;
