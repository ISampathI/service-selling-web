import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { API_IP_2, CategorySearchContext } from "../helper/Context";
import categoryImg from "../assets/img/category.png";

export default function CategoryCard(props) {
  const { searchCategory, setSearchCategory } = useContext(CategorySearchContext);
  let navigate = useNavigate();
  return (
    <div
      className="CategoryCard"
      onClick={(e) => {
        setSearchCategory(props.id)
        navigate("/services");
      }}
    >
      <img src={props.category_img} alt="" />
      <div className="cat-name">{props.name}</div>
    </div>
  );
}
