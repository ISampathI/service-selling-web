import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import {
  API_IP_2,
  ProgressBarContext,
  UserContext,
} from "../../../helper/Context";

const api = axios.create({
  baseURL: `http://${API_IP_2}/api/`,
});

function EditSellerInfo() {
  const [image, setImage] = useState();
  const [imageFile, setImageFile] = useState({});
  const [job, setJob] = useState("");
  const [dob, setDob] = useState("");
  const [location, setLocation] = useState("");
  const [availability, setAvailability] = useState("Full Time");
  const [about, setAbout] = useState("");

  const { user, setUser } = useContext(UserContext);
  const { progress, setProgress } = useContext(ProgressBarContext);

  useEffect(() => {
    setProgress(10);
    setImage(user.proPic && `http://${API_IP_2}/api/${user.proPic}`);
    setJob(user.job && user.job);
    setDob(user.dob && user.dob.split("T")[0]);
    setAbout(user.about && user.about);
    setAvailability(user.availability && user.availability);
    setLocation(user.location && user.location);
    setProgress(100);
  }, [user]);

  const updateSeller = async () => {
    setProgress(10);
    const userObject = {
      job: job,
      dob: dob,
      location: location,
      availability: availability,
      about: about,
      proPic: imageFile,
    };
    await api
      .patch(`/users/${user._id}`, userObject, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setUser(res.data.user);
        console.log(res.data.user, "LL");
      })
      .catch((e) => {
        console.log(e);
      });
    setProgress(100);
  };

  return (
    <div className="EditSellerInfo">
      <div className="edit-left">
        <div className="sellerinfo-form">
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
          <button className="update-btn" onClick={updateSeller}>
            Update
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
  );
}

export default EditSellerInfo;
