import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_IP_2, UserContext } from "../../../helper/Context";
import ImageUploading from "react-images-uploading";
import "./editService.scss";
import { useCookies } from "react-cookie";

const api = axios.create({
  baseURL: `http://${API_IP_2}/api/`,
});

function EditService(props) {
  const [serviceDetails, setServiceDetails] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState([]);
  const [imageFile, setImageFile] = useState({});
  const [category, setCategory] = useState("Other");
  const [cookies, setCookie] = useCookies(["token"]);

  const { user, setUser } = useContext(UserContext);

  var { id } = useParams();

  useEffect(() => {
    if (props.type != "New") {
      fetchData();
    }
  }, [id]);

  const updateService = () => {
    api
      .patch(
        `/services/${id}`,
        [
          { propName: "title", value: title },
          { propName: "img", value: imageFile },
          { propName: "category", value: category },
          { propName: "description", value: description },
        ],
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
      });
  };

  const createService = () => {
    api
      .post(
        `/services`,
        {
          title: title,
          description: description,
          serviceImg: imageFile,
          category: category,
          provider: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
      });
  };
  const fetchData = () => {
    api.get(`/services/${id}`).then((res) => {
      setServiceDetails(res.data.service);
      setTitle(res.data.service.service.title);
      setDescription(res.data.service.service.description);
      setImage(res.data.service.service.serviceImg);
    });
  };
  const onChange = (image, addUpdateIndex) => {
    setImage(image);
  };
  return (
    <div className="EditService">
      <div className="es-wrap">
        <div className="option-path">
          {props.type == "new" ? "Service > New" : "Service > Edit"}
        </div>
        <div className="edit-service-container">
          <form>
            <label htmlFor="">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <label htmlFor="">Description</label>
            <textarea
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
            <label htmlFor="">Category</label>
            <select
              className="category-select"
              name="category"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            >
              <option value="Full Time">Full Time</option>
              <option value="Part Time">Part Time</option>
            </select>
            <label htmlFor="">Service image</label>

            <div className="service-img">
              {image != "" && <img src={image} />}

              <label class="upload-np-btn">
                <i class="fa-solid fa-cloud-arrow-up"></i>
                Upload New Photo
                <input
                  type="file"
                  id="myFile"
                  name="filename"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    setImage(URL.createObjectURL(e.target.files[0]));
                    setImageFile(e.target.files[0]);
                  }}
                />
              </label>
              {/* <ImageUploading
                value={image}
                onChange={onChange}
                maxNumber={1}
                dataURLKey="data_url"
              >
                {({
                  imageList,
                  onImageUpload,
                  onImageRemoveAll,
                  onImageUpdate,
                  onImageRemove,
                  isDragging,
                  dragProps,
                }) => (
                  <>
                    {" "}
                    <i class="fa-solid fa-cloud-arrow-up"></i>
                    <img
                      src={
                        imageList.length != 0
                          ? imageList[0]["data_url"]
                          : serviceDetails.service?.serviceImg
                      }
                      width="150px"
                      alt=""
                    />
                    <p
                      onClick={() => {
                        onImageUpdate();
                      }}
                    >
                      Upload a Image
                      <span>Drag and drop or onClick to upload</span>
                    </p>
                  </>
                )}
              </ImageUploading> */}
            </div>

            <div className="buttons">
              <div
                className="update-service button"
                onClick={props.type == "new" ? createService : updateService}
              >
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
