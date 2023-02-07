import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import ServiceCard from "../../../../components/serviceCard/ServiceCard";
import ProfileCard from "../../components/ProfileCard";
import "./nGallery.scss";
import { API_IP } from "../../../../helper/Context";

const api = axios.create({
  baseURL: `http://${API_IP}/api/`,
});

function NGallery() {
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
    <div className="NGallery">
      <ProfileCard />
      <div className="Gallery">
        <div to="new" className="add-new-image">
          <i class="fa-solid fa-circle-plus"></i>
          <p>Add New Image</p>
        </div>
        {servicesList.map((item, index) => (
          <img
          src="https://www.paintzen.com/wp-content/uploads/2019/12/interior-paint-contractors-painting-paintzen.jpg"
          alt=""
        />
        ))}
        <div className="add-new-image add-new-image-h"></div>
        <div className="add-new-image add-new-image-h"></div>
        <div className="add-new-image add-new-image-h"></div>
      </div>
      {/* <div className="gallery">
        <img
          src="https://www.paintzen.com/wp-content/uploads/2019/12/interior-paint-contractors-painting-paintzen.jpg"
          alt=""
        />
        <img
          src="https://www.paintzen.com/wp-content/uploads/2019/12/interior-paint-contractors-painting-paintzen.jpg"
          alt=""
        />
        <img
          src="https://www.paintzen.com/wp-content/uploads/2019/12/interior-paint-contractors-painting-paintzen.jpg"
          alt=""
        />
        <img
          src="https://www.paintzen.com/wp-content/uploads/2019/12/interior-paint-contractors-painting-paintzen.jpg"
          alt=""
        />
        <img
          src="https://www.paintzen.com/wp-content/uploads/2019/12/interior-paint-contractors-painting-paintzen.jpg"
          alt=""
        />
        <img
          src="https://www.paintzen.com/wp-content/uploads/2019/12/interior-paint-contractors-painting-paintzen.jpg"
          alt=""
        />
        <img
          src="https://www.paintzen.com/wp-content/uploads/2019/12/interior-paint-contractors-painting-paintzen.jpg"
          alt=""
        />
        <img
          src="https://www.paintzen.com/wp-content/uploads/2019/12/interior-paint-contractors-painting-paintzen.jpg"
          alt=""
        />
        <img
          src="https://www.paintzen.com/wp-content/uploads/2019/12/interior-paint-contractors-painting-paintzen.jpg"
          alt=""
        />
      </div> */}
    </div>
  );
}

export default NGallery;
