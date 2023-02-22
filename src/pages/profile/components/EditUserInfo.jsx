import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import { API_IP_2, ProgressBarContext, UserContext } from "../../../helper/Context";
import defaultImg from "../../../assets/img/defaultpropic.png";

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
  const [district, setDistrict] = useState("colombo");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState();
  const [imageFile, setImageFile] = useState({});
  const { user, setUser } = useContext(UserContext);
  const { progress, setProgress } = useContext(ProgressBarContext);

  useEffect(() => {
    setProgress(10);
    setImage(user.proPic ? `http://${API_IP_2}/api/${user.proPic}` : defaultImg);
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.email);
    setMobileNumber(user.phoneNumber && user.phoneNumber);
    setAddressLine1(user.address && user.address.addressLine1);
    setAddressLine2(user.address && user.address.addressLine2);
    setCity(user.address && user.address.city);
    setDistrict(user.address && user.address.district);
    setProgress(100);
  }, [user]);

  const updateUserData = async() => {
    setProgress(10)
    const userObject = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      mobileNumber: mobileNumber,
      address: {
        addressLine1: addressLine1,
        addressLine2: addressLine2,
        city: city,
        district: district,
      },
      proPic: imageFile,
    };
    console.log(userObject);
    await api
      .patch(`/users/${user._id}`, userObject, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setUser(res.data.user);
      })
      .catch((e) => {
        console.log(e);
      });
      setProgress(100)
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
                  District <span>*</span>
                </label>
                <select
                  name="district"
                  value={district}
                  onChange={(e) => {
                    setDistrict(e.target.value);
                  }}
                >
                  <option value="colombo">Colombo</option>
                  <option value="gampaha">Gampaha</option>
                  <option value="kalutara">Kalutara</option>
                  <option value="kandy">Kandy</option>
                  <option value="matale">Matale</option>
                  <option value="nuwara Eliya">Nuwara Eliya</option>
                  <option value="galle">Galle</option>
                  <option value="matara">Matara</option>
                  <option value="hambantota">Hambantota</option>
                  <option value="jaffna">Jaffna</option>
                  <option value="kilinochchi">Kilinochchi</option>
                  <option value="mannarama">Mannarama</option>
                  <option value="vavuniya">Vavuniya</option>
                  <option value="mullaitivu">Mullaitivu</option>
                  <option value="batticaloa">Batticaloa</option>
                  <option value="ampara">Ampara</option>
                  <option value="trincomalee">Trincomalee</option>
                  <option value="kurunegala">Kurunegala</option>
                  <option value="puttalam">Puttalam</option>
                  <option value="anuradhapura">Anuradhapura</option>
                  <option value="polonnaruwa">Polonnaruwa</option>
                  <option value="badulla">Badulla</option>
                  <option value="moneragala">Moneragala</option>
                  <option value="ratnapura">Ratnapura</option>
                  <option value="kegalle">Kegalle</option>
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
            }}
          />
        </label>
      </div>
    </div>
  );
}

export default EditUserInfo;
