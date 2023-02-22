import React, { useContext } from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import ServiceCard from "../../../../components/serviceCard/ServiceCard";
import ProfileCard from "../../components/ProfileCard";
import "./nGallery.scss";
import {
  API_IP,
  API_IP_2,
  ProgressBarContext,
  UserContext,
} from "../../../../helper/Context";
import { Cookies } from "react-cookie";
import LoadingBar from "react-top-loading-bar";

const api = axios.create({
  baseURL: `http://${API_IP_2}/api/`,
});

function NGallery() {
  const [gallery, setGallery] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const [image, setImage] = useState();
  const [imageFile, setImageFile] = useState({});
  const { progress, setProgress } = useContext(ProgressBarContext);

  useEffect(() => {
    fetchData();
  }, [user]);

  const fetchData = async () => {
    setProgress(10);
    await api
      .get(`/gallery/${user._id}`)
      .then((res) => {
        setGallery(res.data.images);
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
    setProgress(100);
  };

  return (
    <div className="NGallery">
      <ProfileCard />
      <div className="Gallery">
        <label to="new" className="add-new-image">
          <input
            type="file"
            id="myFile"
            name="filename"
            accept="image/*"
            onChange={(e) => {
              // setImage(URL.createObjectURL(e.target.files[0]));
              setImageFile(e.target.files[0]);
              api
                .post(
                  `/gallery`,
                  { img: e.target.files[0], username: user.username },
                  {
                    headers: {
                      "Content-Type": "multipart/form-data",
                    },
                  }
                )
                .then((res) => {
                  console.log(res);
                })
                .catch((e) => {
                  console.log(e);
                });
            }}
          />
          <i class="fa-solid fa-circle-plus"></i>
          <p>Add New Image</p>
        </label>
        {gallery &&
          gallery.map((item, index) => (
            <div className="img">
              <div className="del-img">
                <i class="fa-solid fa-trash"></i>
              </div>
              <img src={`http://${API_IP_2}/api/${item.img}`} alt="" />
            </div>
          ))}
      </div>
      {/* <div className="gallery">
        <img
          src="https://www.paintzen.com/wp-content/uploads/2019/12/interior-paint-contractors-painting-paintzen.jpg"
          alt=""
        />
        <img
          src="https://www.paintzen.com/wp-content/uploads/2019/12/interior-paint-contractors-painting-paintzen.jpg"
          alt=""
        />
        <img
          src="https://www.paintzen.com/wp-content/uploads/2019/12/interior-paint-contractors-painting-paintzen.jpg"
          alt=""
        />
        <img
          src="https://www.paintzen.com/wp-content/uploads/2019/12/interior-paint-contractors-painting-paintzen.jpg"
          alt=""
        />
        <img
          src="https://www.paintzen.com/wp-content/uploads/2019/12/interior-paint-contractors-painting-paintzen.jpg"
          alt=""
        />
        <img
          src="https://www.paintzen.com/wp-content/uploads/2019/12/interior-paint-contractors-painting-paintzen.jpg"
          alt=""
        />
        <img
          src="https://www.paintzen.com/wp-content/uploads/2019/12/interior-paint-contractors-painting-paintzen.jpg"
          alt=""
        />
        <img
          src="https://www.paintzen.com/wp-content/uploads/2019/12/interior-paint-contractors-painting-paintzen.jpg"
          alt=""
        />
        <img
          src="https://www.paintzen.com/wp-content/uploads/2019/12/interior-paint-contractors-painting-paintzen.jpg"
          alt=""
        />
      </div> */}
    </div>
  );
}

export default NGallery;
