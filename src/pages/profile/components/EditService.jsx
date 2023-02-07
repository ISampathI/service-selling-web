import React from "react";
import "./editService.scss";

function EditService(props) {
  return (
    <div className="EditService">
      <div className="es-wrap">
        <div className="option-path">
          {props.type == "new" ? "Service > New" : "Service > Edit"}
        </div>
        <div className="edit-service-container">
          <form>
            <label htmlFor="">Title</label>
            <input type="text" />
            <label htmlFor="">Description</label>
            <textarea />
            <label htmlFor="">Service image</label>
            <div className="service-img">
              <i class="fa-solid fa-cloud-arrow-up"></i>
              <p>
                Upload a Image
                <span>Drag and drop image here</span>
              </p>
            </div>
            <div className="buttons">
              <div className="update-service button">
                {props.type == "new" ? "Save" : "Update"}
              </div>
            </div>
            {props.type != "new" ? (
              <div className="delete-service-dev">
                <p>
                  Caution: Deleting this service is permanent and cannot be
                  recovered.
                </p>
                <div className="delete-service button">
                  <i className="fa-solid fa-trash-can"></i>Delete
                </div>
              </div>
            ) : (
              <></>
            )}
          </form>

          {/* {props.type != "new" ? (
            <div className="edit-service-view">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5o1JEx5HkuIza83FgPMcXYA5aylxAwGXGyA&usqp=CAU"
                alt=""
              />
              <div className="title">
                Lorem ipsum dolor sit amet consectetur adipisicing elit At unde.
              </div>
              <div className="desc">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum
                numquam odit reiciendis fugit explicabo ad eligendi impedit
                consequuntur quibusdam asperiores eius repellat itaque quis,
                iste consequatur nostrum vero ab in porro corrupti, facilis quas
                delectus! Quam laborum sit, minima odit sunt non ullam dicta
                tempore libero corporis? Iure, quaerat in?
              </div>
            </div>
          ) : (
            <></>
          )} */}
        </div>
      </div>
    </div>
  );
}

export default EditService;
