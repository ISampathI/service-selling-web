import React from "react";
import { useNavigate } from "react-router-dom";

export default function CategoryCard(props) {
  let navigate = useNavigate();

  return (
    <div className="CategoryCard" onClick={(e)=>{
      navigate("/services");
    }}>
      <img src={props.category_img} alt="" />
      <div className="cat-name">{props.name}</div>
    </div>
  );
}
