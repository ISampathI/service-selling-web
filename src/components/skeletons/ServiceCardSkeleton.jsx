import React from "react";
import "./serviceCardSkeleton.scss";

function ServiceCardSkeleton(props) {
  return (
    <div className="ServiceCardSkeleton">
      <div className="img"></div>
      <div className="service-title"></div>
      <div className="seller">
        {props.type == "0" ? (
          <>
            <div className="seller-propic"></div>
            <div className="seller-details">-</div>
          </>
        ) : (
          <></>
        )}
      </div>
      <button className="hire-now-btn"></button>
      {props.type == "2" ? (
        <div className="hover-container">
          <i class="fa-solid fa-eye"></i>

          <i class="fa-solid fa-pen-to-square"></i>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default ServiceCardSkeleton;
