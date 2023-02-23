import React from "react";
import "./rating.scss";

function Rating(props) {
  return (
    <div className="Rating">
      {props.rating && props.rating && parseInt(props.rating) < 5 ? (
        <div className="rating-star">
          {Array(parseInt(props.rating))
            .fill(1)
            .map((item, i) => (
              <i className="fa-solid fa-star"></i>
            ))}

          {parseFloat(props.rating) % parseInt(props.rating) >= 0.5 && (
            <i class="fa-solid fa-star-half-stroke"></i>
          )}
          {Array(5 - Math.round(parseFloat(props.rating)))
            .fill(1)
            .map((item, i) => (
              <i class="fa-regular fa-star"></i>
            ))}
        </div>
      ) : (
        <div className="rating-star">
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
        </div>
      )}
    </div>
  );
}

export default Rating;
