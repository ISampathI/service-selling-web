import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import ServiceCard from "../../../../../../components/serviceCard/ServiceCard";
import { API_IP } from "../../../../../../helper/Context";

const api = axios.create({
  baseURL: `http://${API_IP}/api/`,
  withCredentials: true,
});

function NSServices() {
  const [servicesList, setServicesList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await api.get("/services").then((res) => {
      setServicesList(res.data);
    });
  };
  return (
    <div className="SellerDetailsNav">
      <div className="services">
        {servicesList.map((item, index) => {
          if (index < 6) {
            return (
              <ServiceCard
                service_img={item.service_img}
                title={item.title}
                type="1"
              />
            );
          }
        })}
      </div>
    </div>
  );
}

export default NSServices;
