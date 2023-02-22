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

function NSGallery() {
  const [imgList, setImgList] = useState([]);

  var { username } = useParams();

  useEffect(() => {
    fetchData();
  }, [username]);

  const fetchData = () => {
    api.get(`/gallery/${username}`).then((res) => {
      setImgList(res.data.images);
    }).catch((e)=>{
      console.log(e);
    });
  };
  return (
    <div className="SellerDetailsNav">
      <div className="gallery">
        {imgList && imgList.map((item, index) => {
          return <img src={`http://${API_IP_2}/api/${item.img}`} alt="" />;
        })}
      </div>
    </div>
  );
}

export default NSGallery;
