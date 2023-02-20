import axios from "axios";
import React, { useEffect, useState } from "react";
import defaultImg from "../../assets/img/defaultpropic.png";
import { API_IP_2 } from "../../helper/Context";
import "./cartItem.scss";

const api = axios.create({
  baseURL: `http://${API_IP_2}/api/`,
});
function CartItem(props) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(props.checked);
  }, [props.checked]);

  return (
    <div className={props.type != "hire" ? "CartItem CI-normal" : "CartItem"}>
      <div className="up">
        <div className="seller">
          <div className="profile-img">
            <img
              src={
                props.service.seller.proPic
                  ? `http://${API_IP_2}/${props.service.seller.proPic}`
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
      <div className="down">
        <img
          src={`http://${API_IP_2}/${props.service.service.serviceImg}`}
          alt=""
        />
        <div className="column">
          <div className="title">{props.service.service.title}</div>
          <div className="price">RS:2000</div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
