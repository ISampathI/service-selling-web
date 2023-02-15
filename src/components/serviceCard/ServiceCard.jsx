import React from "react";
import { Link } from "react-router-dom";
import "./serviceCard.scss";

function createContent(props) {
  return (
    <div className="ServiceCard">
      <img src={props.service_img} alt="" />
      <div className="seller">
        {props.type == "0" ? (
          <>
            <img src={props.profile_img} alt="" className="seller-propic" />

            <div className="seller-details">
              <div className="seller-name">{props.name}</div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
      <div className="service-title">{props.title}</div>
      <button className="hire-now-btn">Hire Now</button>
      {props.type == "2" ? (
        <div className="hover-container">
          <Link to="/profile/services/view">
            <i class="fa-solid fa-eye"></i>
          </Link>
          <Link to="/profile/services/edit">
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
      <Link to="/sellers/servicedetails" className="reactLink">
        {createContent(props)}
      </Link>
    );
  } else if (props.type == "2") {
    return createContent(props);
  } else {
    return (
      <Link to={`/services/servicedetails/${props.id}`}  className="reactLink">
        {createContent(props)}
      </Link>
    );
  }
}
