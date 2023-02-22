import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import defaultImg from "../../assets/img/defaultpropic.png";
import { API_IP_2 } from "../../helper/Context";
import "./cartItem.scss";

const api = axios.create({
  baseURL: `http://${API_IP_2}/api/`,
});
function CartItem(props) {
  const [checked, setChecked] = useState(false);
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    if (props.onChecked != undefined) {
      if (props.checked) {
        props.onChecked();
      } else {
        props.onUnChecked();
      }
    }
    setChecked(props.checked);
  }, [props.checked]);

  return (
    <div
      style={
        props.isSelected == true
          ? { border: "2px solid rgb(200,200,200,1)" }
          : {}
      }
      className={props.type != "hire" ? "CartItem CI-normal" : "CartItem"}
      onClick={() => {
        props.onClickOnItem();
        setSelected(!selected);
      }}
    >
      <div className="up">
        <div className="seller">
          <div className="profile-img">
            <img
              src={
                props.service.seller.proPic
                  ? `http://${API_IP_2}/api/${props.service.seller.proPic}`
                  : defaultImg
              }
              alt=""
            />
          </div>
          <div className="container">
            <div className="name">{props.service.seller.name}</div>
          </div>
          {props.type != "hire" ? (
            <input
              onChange={(e) => {
                if (e.target.checked) {
                  props.onChecked();
                } else {
                  props.onUnChecked();
                }
                setChecked(e.target.checked);
              }}
              checked={checked ? true : false}
              type="checkbox"
              name=""
              id=""
            />
          ) : (
            <></>
          )}
        </div>
      </div>
      {props.type != "hire" ? (
        <i
          onClick={props.onClickRemove}
          className="fa-regular fa-trash-can"
        ></i>
      ) : (
        <></>
      )}
      <Link to={`/profile/services/view/${props.service.service._id}`} className="react-link">
        <div className="down">
          <img
            src={`http://${API_IP_2}/api/${props.service.service.serviceImg}`}
            alt=""
          />
          <div className="column">
            <div className="title">{props.service.service.title}</div>
            <div className="price">
              {props.service.service.price > 0
                ? props.service.service.price + "LKR"
                : "N/D"}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default CartItem;
