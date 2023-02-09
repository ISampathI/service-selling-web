import React, { useEffect, useState } from "react";
import "./cartItem.scss";

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
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdXrN5H9Es9LsjxqNrUFbuEXtdc6q1457prQ&usqp=CAU"
              alt=""
            />
          </div>
          <div className="container">
            <div className="name">Lernal heral {props.cart_id}</div>
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
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5o1JEx5HkuIza83FgPMcXYA5aylxAwGXGyA&usqp=CAU"
          alt=""
        />
        <div className="column">
          <div className="title">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora,
            ipsum?
          </div>
          <div className="price">RS:2000</div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
