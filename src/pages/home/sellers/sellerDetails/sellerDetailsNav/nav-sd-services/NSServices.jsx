import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import ServiceCard from "../../../../../../components/serviceCard/ServiceCard";
import { API_IP, API_IP_2 } from "../../../../../../helper/Context";
import { useParams } from "react-router-dom";

const api = axios.create({
  baseURL: `http://${API_IP_2}/api/`,
});

function NSServices() {
  const [servicesList, setServicesList] = useState([]);

  var { username } = useParams();

  useEffect(() => {
    fetchData();
  }, [username]);

  const fetchData = () => {
    api.get(`/services/seller-services/${username}`).then((res) => {
      setServicesList(res.data.services);
    }).catch((e)=>{
      console.log(e);
    });
  };

  return (
    <div className="SellerDetailsNav">
      <div className="services">
        {servicesList?.map((item, index) => {
          return (
            <ServiceCard
              service_img={`http://${API_IP_2}/api/${item.serviceImg}`}
              title={item.title}
              id={item._id}
              type="1"
            />
          );
        })}
      </div>
    </div>
  );
}

export default NSServices;
