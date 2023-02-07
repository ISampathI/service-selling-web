import React from "react";
import { useNavigate } from "react-router-dom";

export default function CategoryCard() {
  let navigate = useNavigate();

  return (
    <div className="CategoryCard" onClick={(e)=>{
      navigate("/services");
    }}>
      <img src={require("../assets/img/workers/Asset 1.png")} alt="" />
      <div className="cat-name">All</div>
    </div>
  );
}
