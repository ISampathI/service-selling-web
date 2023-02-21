import React from "react";
import "./modal.scss";

function Modal(props) {
  return (
    <div onClick={props.exit_btn ? () => {} : props.onClick} className="Modal">
      <div className="modal-wrapper">
        <div className="modal-container">
          <div className="title-bar-wrapper">
            {props.exit_btn && (
              <>
                <div className="title">{props.title}</div>
                <button onClick={props.onClick} className="exit-btn">
                  <i class="fa-solid fa-xmark"></i>
                </button>
              </>
            )}
          </div>
          <div className="content">{props.content()}</div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
