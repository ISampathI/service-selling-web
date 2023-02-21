import React from "react";
import { Link } from "react-router-dom";
import "./serviceCard.scss";
import defaultImg from "../../assets/img/defaultpropic.png";
import { API_IP_2 } from "../../helper/Context";

function createContent(props) {
  return (
    <div className="ServiceCard">
      <img src={props.service_img && props.service_img} alt="" />
      <div
        className="service-title"
        style={props.type ? (props.type == "2" ? { border: "0" } : {}) : {}}
      >
        {props.title}
      </div>
      <div className="seller">
        {props.type == "0" ? (
          <>
            <img
              src={
                props.profile_img
                  ? `http://${API_IP_2}/${props.profile_img}`
                  : defaultImg
              }
              alt=""
              className="seller-propic"
            />
            {props.rating > 0 && (
              <div className="rating">
                <i class="fa-solid fa-star"></i>
                <p>{props.rating}</p>
              </div>
            )}

            <div className="seller-details">
              <div className="seller-name">{props.name}</div>
              <div className="seller-location">
                <i class="fa-solid fa-location-dot"></i>
                <div className="seller-city">{props.location}</div>
              </div>
            </div>
            <div className="seller-price">
              {props.price > 0 ? props.price + "LKR" : "N/D"}
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
      <button className="hire-now-btn">Hire Now</button>
      {props.type == "2" ? (
        <div className="hover-container">
          <Link to={`/profile/services/view/${props.id}`}>
            <i class="fa-solid fa-eye"></i>
          </Link>
          <Link to={`/profile/services/edit/${props.id}`}>
            <i class="fa-solid fa-pen-to-square"></i>
          </Link>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
export default function ServiceCard(props) {
  if (props.type == "1") {
    return (
      <Link to={`/services/servicedetails/${props.id}`} className="reactLink">
        {createContent(props)}
      </Link>
    );
  } else if (props.type == "2") {
    return createContent(props);
  } else {
    return (
      <Link to={`/services/servicedetails/${props.id}`} className="reactLink">
        {createContent(props)}
      </Link>
    );
  }
}
