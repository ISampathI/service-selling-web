import React from "react";

function EditSellerInfo() {
  return (
    <div className="EditSellerInfo">
      <div className="edit-left">
        <div className="sellerinfo-form">
          <div className="row">
            <div className="column">
              <label htmlFor="">
                Job Title <span>*</span>
              </label>
              <input type="text" />
            </div>
            <div className="spacer"></div>
            <div className="column">
              <label htmlFor="">
                Date of Birth <span>*</span>
              </label>
              <input type="text" />
            </div>
          </div>
          <label htmlFor="">
            About <span>*</span>
          </label>
          <textarea name="" id=""></textarea>
        </div>
      </div>
      <div className="edit-right">
        <div className="profile-img">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdXrN5H9Es9LsjxqNrUFbuEXtdc6q1457prQ&usqp=CAU"
            alt=""
          />
        </div>
        <button className="upload-np-btn">Upload New Photo</button>
      </div>
    </div>
  );
}

export default EditSellerInfo;
