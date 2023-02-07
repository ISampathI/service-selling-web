import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import ServiceCard from "../../../../components/serviceCard/ServiceCard";
import ProfileCard from "../../components/ProfileCard";
import "./nservices.scss";
import { Link } from "react-router-dom";

const api = axios.create({
  baseURL: "http://localhost:5001/api/",
  withCredentials: true,
});

function NServices() {
  const [servicesList, setServicesList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    api.get("/services").then((res) => {
      setServicesList(res.data);
    });
  };

  return (
    <div className="ProfileDetailsNav">
      <ProfileCard />
      <div className="services">
        <Link to="new" className="add-new-service">
          <i class="fa-solid fa-circle-plus"></i>
          <p>Create New Service</p>
        </Link>
        {servicesList.map((item, index) => (
          <ServiceCard
            service_img={item.service_img}
            title={item.title}
            type="2"
          />
        ))}
        <div className="add-new-service add-new-service-h"></div>
        <div className="add-new-service add-new-service-h"></div>
        <div className="add-new-service add-new-service-h"></div>
      </div>
    </div>
  );
}

export default NServices;
