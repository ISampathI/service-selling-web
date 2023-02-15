import React, { useState } from "react";

function EditUserInfo() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updateUserData = () => {
    console.log({
      firstName: firstName,
      lastName: lastName,
      email: email,
      mobileNumber: mobileNumber,
      address: {
        addressLine1: addressLine1,
        addressLine2: addressLine2,
        city: city,
        province: province,
      },
    });
  };

  return (
    <div className="EditUserInfo">
      <div className="edit-left">
        <div className="userinfo-form">
          <div className="row">
            <div className="column">
              <label htmlFor="">
                First Name <span>*</span>
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
            </div>
            <div className="spacer"></div>
            <div className="column">
              <label htmlFor="">
                Last Name <span>*</span>
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="row">
            <div className="column">
              <label htmlFor="">
                Email Address <span>*</span>
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="spacer"></div>
            <div className="column">
              <label htmlFor="">
                Mobile Number <span>*</span>
              </label>
              <input
                type="text"
                value={mobileNumber}
                onChange={(e) => {
                  setMobileNumber(e.target.value);
                }}
              />
            </div>
          </div>
          <label htmlFor="">
            Address <span>*</span>
          </label>
          <div className="form-sub-container">
            <div className="column-fw">
              <label htmlFor="">
                Address line 1 <span>*</span>
              </label>
              <input
                type="text"
                value={addressLine1}
                onChange={(e) => {
                  setAddressLine1(e.target.value);
                }}
              />
              <label htmlFor="">
                Address line 2 <span>*</span>
              </label>
              <input
                type="text"
                value={addressLine2}
                onChange={(e) => {
                  setAddressLine2(e.target.value);
                }}
              />
            </div>
            <div className="row">
              <div className="column">
                <label htmlFor="">
                  City <span>*</span>
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                  }}
                />
              </div>
              <div className="spacer"></div>
              <div className="column">
                <label htmlFor="">
                  Province <span>*</span>
                </label>
                <select>
                  <option>Colombo</option>
                  <option>Gampaha</option>
                  <option>Kalutara</option>
                  <option>Kandy</option>
                  <option>Matale</option>
                  <option>Nuwara Eliya</option>
                  <option>Galle</option>
                  <option>Matara</option>
                  <option>Hambantota</option>
                  <option>Jaffna</option>
                  <option>Kilinochchi</option>
                  <option>Mannar</option>
                  <option>Vavuniya</option>
                  <option>Mullaitivu</option>
                  <option>Batticaloa</option>
                  <option>Ampara</option>
                  <option>Trincomalee</option>
                  <option>Kurunegala</option>
                  <option>Puttalam</option>
                  <option>Anuradhapura</option>
                  <option>Polonnaruwa</option>
                  <option>Badulla</option>
                  <option>Moneragala</option>
                  <option>Ratnapura</option>
                  <option>Kegalle</option>
                </select>
              </div>
            </div>
            <button onClick={updateUserData} className="update-btn">
              Update
            </button>
          </div>
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

export default EditUserInfo;
