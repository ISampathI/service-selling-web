import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import { API_IP_2, UserContext } from "../../../../helper/Context";
import "./buyerToSeller.scss";
import defaultImg from "../../../../assets/img/defaultpropic.png";
import { useNavigate } from "react-router-dom";

const api = axios.create({
  baseURL: `http://${API_IP_2}/api/`,
});

function BuyerToSeller() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState();
  const [imageFile, setImageFile] = useState({});

  const [job, setJob] = useState("");
  const [dob, setDob] = useState("");
  const [location, setLocation] = useState("");
  const [availability, setAvailability] = useState("Full Time");
  const [about, setAbout] = useState("");
  const [errorDetails, setErrorDetails] = useState({});

  const { user, setUser } = useContext(UserContext);

  const navigation = useNavigate();

  const updateUserData = async () => {
    let err = {};
    if (firstName == undefined || firstName == "") {
      err.firstName = { path: "firstName", kind: "required" };
    }
    if (lastName == undefined || lastName == "") {
      err.lastName = { path: "lastName", kind: "required" };
    }
    if (email == undefined || email == "") {
      err.email = { path: "email", kind: "required" };
    }
    if (mobileNumber == undefined || mobileNumber == "") {
      err.mobileNumber = { path: "mobileNumber", kind: "required" };
    }
    if (addressLine1 == undefined || addressLine1 == "") {
      err.addressLine1 = { path: "addressLine1", kind: "required" };
    }
    if (city == undefined || city == "") {
      err.city = { path: "city", kind: "required" };
    }
    if (district == undefined || district == "") {
      setDistrict("Colombo");
      //err.district = { path: "district", kind: "required" };
    }
    if (job == undefined || job == "") {
      err.job = { path: "job", kind: "required" };
    }
    if (dob == undefined || dob == "") {
      err.dob = { path: "dob", kind: "required" };
    }
    if (location == undefined || location == "") {
      err.location = { path: "location", kind: "required" };
    }
    if (availability == undefined || availability == "") {
      err.availability = { path: "availability", kind: "required" };
    }
    if (about == undefined || about == "") {
      err.about = { path: "about", kind: "required" };
    }
    setErrorDetails(err);
    if (Object.keys(err).length == 0) {
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
        job: job,
        dob: dob,
        location: location,
        availability: availability,
        about: about,
        userType: "seller",
        isSellerActivated: true,
      };

      await api
        .patch(`/users/${user._id}`, userObject, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res);
          setUser(res.data.user);
          navigation("/profile/services");
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
    }
  };

  useEffect(() => {
    setJob(user.job && user.job);
    setAbout(user.about && user.about);
    setAvailability(user.availability && user.availability);
    setLocation(user.location && user.location);
    setImage(
      user.proPic ? `http://${API_IP_2}/api/${user.proPic}` : defaultImg
    );
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.email);
    setDob(user.dob && user.dob.split("T")[0]);
    setMobileNumber(user.phoneNumber && user.phoneNumber);
    setAddressLine1(user.address && user.address.addressLine1);
    setAddressLine2(user.address && user.address.addressLine2);
    setCity(user.address && user.address.city);
    setDistrict(user.address && user.address.district);
    setErrorDetails({});
  }, [user]);

  const updateSeller = () => {
    const userObject = {
      job: job,
      dob: dob,
      location: location,
      availability: availability,
      about: about,
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
      userType: "seller",
      isSellerActivated: "true",
    };
    console.log(userObject);
    api
      .patch(`/users/${user.username}`, userObject, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="BuyerToSeller">
      <div className="edit-profile">
        <div className="up">
          <div className="seting-nav">
            <div className="title">Seller Registration</div>
          </div>
        </div>
        <div className="down">
          <div className="edit-left">
            <div className="sellerinfo-form">
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
                  <div className="error-message">
                    {errorDetails.firstName != undefined
                      ? `${errorDetails.firstName?.path} ${errorDetails.firstName?.kind}`
                      : ""}
                  </div>
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
                  <div className="error-message">
                    {errorDetails.lastName != undefined
                      ? `${errorDetails.lastName?.path} ${errorDetails.lastName?.kind}`
                      : ""}
                  </div>
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
                  <div className="error-message">
                    {errorDetails.email != undefined
                      ? `${errorDetails.email?.path} ${errorDetails.email?.kind}`
                      : ""}
                  </div>
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
                  <div className="error-message">
                    {errorDetails.mobileNumber != undefined
                      ? `${errorDetails.mobileNumber?.path} ${errorDetails.mobileNumber?.kind}`
                      : ""}
                  </div>
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
                  <div
                    className="error-message"
                    style={{ marginTop: "-30px", marginBottom: "1rem" }}
                  >
                    {errorDetails.addressLine1 != undefined
                      ? `${errorDetails.addressLine1?.path} ${errorDetails.addressLine1?.kind}`
                      : ""}
                  </div>
                  <label htmlFor="">Address line 2</label>
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
                    <div className="error-message">
                      {errorDetails.city != undefined
                        ? `${errorDetails.city?.path} ${errorDetails.city?.kind}`
                        : ""}
                    </div>
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
                    <div className="error-message">
                      {errorDetails.district != undefined
                        ? `${errorDetails.district?.path} ${errorDetails.district?.kind}`
                        : ""}
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <br />
              <div className="row">
                <div className="column">
                  <label htmlFor="">
                    Job Title <span>*</span>
                  </label>
                  <input
                    type="text"
                    value={job}
                    name="job"
                    onChange={(e) => {
                      setJob(e.target.value);
                    }}
                  />
                  <div className="error-message">
                    {errorDetails.job != undefined
                      ? `${errorDetails.job?.path} ${errorDetails.job?.kind}`
                      : ""}
                  </div>
                </div>
                <div className="spacer"></div>
                <div className="column">
                  <label htmlFor="">
                    Date of Birth <span>*</span>
                  </label>
                  <input
                    type="date"
                    value={dob}
                    name="dob"
                    onChange={(e) => {
                      setDob(e.target.value);
                    }}
                  />
                  <div className="error-message">
                    {errorDetails.dob != undefined
                      ? `${errorDetails.dob?.path} ${errorDetails.dob?.kind}`
                      : ""}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="column">
                  <label htmlFor="">
                    Location <span>*</span>
                  </label>
                  <input
                    type="text"
                    value={location}
                    name="locaiton"
                    onChange={(e) => {
                      setLocation(e.target.value);
                    }}
                  />
                  <div className="error-message">
                    {errorDetails.location != undefined
                      ? `${errorDetails.location?.path} ${errorDetails.location?.kind}`
                      : ""}
                  </div>
                </div>
                <div className="spacer"></div>
                <div className="column">
                  <label htmlFor="">
                    Availability <span>*</span>
                  </label>
                  <select
                    name="availability"
                    value={availability}
                    onChange={(e) => {
                      setAvailability(e.target.value);
                    }}
                  >
                    <option value="Full Time">Full Time</option>
                    <option value="Part Time">Part Time</option>
                  </select>
                  <div className="error-message">
                    {errorDetails.availability != undefined
                      ? `${errorDetails.availability?.path} ${errorDetails.availability?.kind}`
                      : ""}
                  </div>
                </div>
              </div>
              <label htmlFor="">
                About <span>*</span>
              </label>
              <textarea
                value={about}
                name="about"
                onChange={(e) => {
                  setAbout(e.target.value);
                }}
              ></textarea>
              <div className="error-message" style={{ marginTop: "-30px" }}>
                {errorDetails.about != undefined
                  ? `${errorDetails.about?.path} ${errorDetails.about?.kind}`
                  : ""}
              </div>
              <button className="update-btn" onClick={updateUserData}>
                Create Seller Account
              </button>
            </div>
          </div>
          <div className="edit-right">
            <div className="profile-img">
              <img
                src={
                  image != ""
                    ? image
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdXrN5H9Es9LsjxqNrUFbuEXtdc6q1457prQ&usqp=CAU"
                }
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
      </div>
    </div>
  );
}

export default BuyerToSeller;
