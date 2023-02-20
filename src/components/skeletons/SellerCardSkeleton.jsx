import React from "react";
import "./sellerCardSkeleton.scss";

function SellerCardSkeleton(props) {
  return (
    <div className="SellerCardSkeleton">
      <div className="img"></div>
      <div className="seller-name"></div>
      <div className="rating"></div>
      <div className="seller-details-container"></div>
    </div>
  );
}

export default SellerCardSkeleton;
