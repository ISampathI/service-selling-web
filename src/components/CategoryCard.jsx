import React from "react";
import { useNavigate } from "react-router-dom";
import { API_IP_2 } from "../helper/Context";

export default function CategoryCard(props) {
  let navigate = useNavigate();

  return (
    <div
      className="CategoryCard"
      onClick={(e) => {
        navigate("/services");
      }}
    >
      <img src={`http://${API_IP_2}/${props.category_img}`} alt="" />
      <div className="cat-name">{props.name}</div>
    </div>
  );
}
