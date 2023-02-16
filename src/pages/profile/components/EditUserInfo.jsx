import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import { API_IP_2, UserContext } from "../../../helper/Context";

const api = axios.create({
  baseURL: `http://${API_IP_2}/api/`,
});

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
  const [image, setImage] = useState();
  const [imageFile, setImageFile] = useState({});
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    setImage(`http://${API_IP_2}/${user.proPic}`);
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.email);
    setMobileNumber(user.phoneNumber);
    setAddressLine1(user.address.addressLine1);
    setAddressLine2(user.address.addressLine2);
    setCity(user.address.city);
    setProvince(user.address.province);
  }, [user]);

  const updateUserData = () => {
    const userObject = {
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
      proPic: imageFile,
    };
    api
      .patch(`/users/${user.username}`, userObject, {
        headers: {
          Authorization: `Bearer ${Cookies.token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setUser(res.data);
      });
  };

  return (
    <div className="EditUserInfo">
      <div className="edit-left">
        <from className="userinfo-form">
          <div className="row">
            <div className="column">
              <label htmlFor="">
                First Name <span>*</span>
              </label>
              <input
                type="text"
                value={firstName}
                name="firstName"
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
                name="lastName"
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
                name="email"
                disabled
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
                name="mobileNumber"
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
                name="addressLine1"
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
                name="addressLine2"
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
                  name="city"
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
                <select
                  name="province"
                  value={province}
                  onChange={(e) => {
                    setCity(e.target.value);
                  }}
                >
                  <option value="Colombo">Colombo</option>
                  <option value="Gampaha">Gampaha</option>
                  <option value="Kalutara">Kalutara</option>
                  <option value="Kandy">Kandy</option>
                  <option value="Matale">Matale</option>
                  <option value="Nuwara Eliya">Nuwara Eliya</option>
                  <option value="Galle">Galle</option>
                  <option value="Matara">Matara</option>
                  <option value="Hambantota">Hambantota</option>
                  <option value="Jaffna">Jaffna</option>
                  <option value="Kilinochchi">Kilinochchi</option>
                  <option value="Mannar">Mannar</option>
                  <option value="Vavuniya">Vavuniya</option>
                  <option value="Mullaitivu">Mullaitivu</option>
                  <option value="Batticaloa">Batticaloa</option>
                  <option value="Ampara">Ampara</option>
                  <option value="Trincomalee">Trincomalee</option>
                  <option value="Kurunegala">Kurunegala</option>
                  <option value="Puttalam">Puttalam</option>
                  <option value="Anuradhapura">Anuradhapura</option>
                  <option value="Polonnaruwa">Polonnaruwa</option>
                  <option value="Badulla">Badulla</option>
                  <option value="Moneragala">Moneragala</option>
                  <option value="Ratnapura">Ratnapura</option>
                  <option value="Kegalle">Kegalle</option>
                </select>
              </div>
            </div>
            <button className="update-btn" onClick={updateUserData}>
              Update
            </button>
            {/* <button type="submit">aaa</button> */}
          </div>
        </from>
      </div>
      <div className="edit-right">
        <div className="profile-img">
          <img
            src={
              image != ""
                ? image
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdXrN5H9Es9LsjxqNrUFbuEXtdc6q1457prQ&usqp=CAU"
            }
            alt=""
          />
        </div>
        <label class="upload-np-btn">
          Upload New Photo
          <input
            type="file"
            id="myFile"
            name="filename"
            accept="image/*"
            onChange={(e) => {
              setImage(URL.createObjectURL(e.target.files[0]));
              setImageFile(e.target.files[0]);
              console.log(e.target.files[0]);
            }}
          />
        </label>
      </div>
    </div>
  );
}

export default EditUserInfo;
