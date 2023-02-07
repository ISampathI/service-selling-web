import React from "react";
import "./modal.scss";

function Modal(props) {
  return (
    <div onClick={props.onClick} className="Modal">
      <div className="modal-container">{props.content()}</div>
    </div>
  );
}

export default Modal;
