import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { createContext, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import CartItem from "../../../../../components/cartItem/CartItem";
import "./orderServiceDetails.scss";
import LoadingBar from "react-top-loading-bar";
import { useContext } from "react";
import { API_IP_2, ProgressBarContext } from "../../../../../helper/Context";
import { useEffect } from "react";
import axios from "axios";


const api = axios.create({
  baseURL: `http://${API_IP_2}/api/`,
});


export default function OrderServiceDetails(props) {
  const [order, setOrder] = useState([]);
  const { progress, setProgress } = useContext(ProgressBarContext);
  var { id } = useParams();

  useEffect(() => {
    console.log("hello");
    fetchData();
  }, [id]);

  const fetchData = async () => {
    setProgress(10);
    await api
      .get(`/orders/${id}`)
      .then((res) => {
        setOrder(res.data)
      })
      .catch((e) => {
        console.log(e);
      });
    setProgress(100);
  };

  return (
    <div className="OrderServiceDetails">
      <div className="service-details-wrap">
        <div className="service-container">
          <div className="seller"></div>
          <div className="title">
            {order.title && order.title}
          </div>

          <img
            className="service-img"
            src={order.serviceImg && `http://${API_IP_2}/api/${order.serviceImg}`}
            alt=""
          />
          <h1>About</h1>
          <div className="details">
          {order.description && order.description}
            <br />
          </div>
          <h3>Additional details</h3>
          <div className="additional-details">
            {order.message && order.message}
          </div>
        </div>
      </div>
    </div>
  );
}
