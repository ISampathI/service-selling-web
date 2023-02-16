import React from "react";
import { useNavigate } from "react-router-dom";
import { API_IP_2 } from "../helper/Context";
import categoryImg from "../assets/img/category.png";

export default function CategoryCard(props) {
  let navigate = useNavigate();
  console.log(props.category_img)
  return (
    <div
    style={{backgroundImage:`url(${props.category_img})`}}
      className="CategoryCard"
      onClick={(e) => {
        navigate("/services");
      }}
    >
      <img src={props.category_img} alt="" />
      <div className="cat-name">{props.name}</div>
    </div>
  );
}
