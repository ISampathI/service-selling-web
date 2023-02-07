import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import ServiceCard from "../../../../../../components/serviceCard/ServiceCard";
import { API_IP } from "../../../../../../helper/Context";

const api = axios.create({
  baseURL: `http://${API_IP}/api/`,
});

function NSGallery() {
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
      <div className="gallery">
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
      </div>
    </div>
  );
}

export default NSGallery;
