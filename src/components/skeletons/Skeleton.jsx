import React from "react";
import "./skeleton.scss";

function Skeleton(type) {
  return (
    <div className="Skeleton-Wrapper">
      <div className={`skeleton ${type}`}></div>
    </div>
  );
}

export default Skeleton;
