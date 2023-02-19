import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_IP_2, UserContext } from "../../../helper/Context";
import ImageUploading from "react-images-uploading";
import "./editService.scss";
import { useCookies } from "react-cookie";
import Ripples from "react-ripples";

const api = axios.create({
  baseURL: `http://${API_IP_2}/api/`,
});

function EditService(props) {
  const [serviceDetails, setServiceDetails] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState([]);
  const [imageFile, setImageFile] = useState({});
  const [categoryList, setCategoryList] = useState([]);
  const [category, setCategory] = useState("Other");
  const [ROP, setROP] = useState("Negotiable");
  const [price, setPrice] = useState();
  const [cookies, setCookie] = useCookies();

  const { user, setUser } = useContext(UserContext);

  var { id } = useParams();

  useEffect(() => {
    if (props.type != "new") {
      fetchData();
    }
    api.get(`/categories`).then((res) => {
      setCategoryList(res.data.categories);
    });
  }, [id]);

  const updateService = () => {
    const serviceObject = {
      title: title,
      serviceImg: imageFile,
      category: category,
      description: description,
      rop: ROP,
      price: price,
    };
    api
      .patch(`/services/${id}`, serviceObject, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {});
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
          rop: ROP,
          price: price,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {});
  };
  const fetchData = () => {
    api.get(`/services/${id}`).then((res) => {
      setServiceDetails(res.data.service);
      setTitle(res.data.service.service.title);
      setDescription(res.data.service.service.description);
      setImage(res.data.service.service.serviceImg);
      console.log(res.data);
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
            <label htmlFor="">Category</label>
            <select
              className="category-select"
              name="category"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            >
              {categoryList?.map((item, index) => (
                <option value={item._id}>{item.name}</option>
              ))}
            </select>
            <div className="row">
              <div className="column">
                <label htmlFor="">Rate of Payment</label>
                <select
                  className="category-select price-type"
                  name="price-type"
                  value={ROP}
                  onChange={(e) => {
                    setROP(e.target.value);
                  }}
                >
                  <option>Hourly</option>
                  <option>Daily</option>
                  <option>Monthly</option>
                  <option>Negotiable</option>
                </select>
              </div>
              <div className="column">
                <label htmlFor="">Price</label>
                <input
                  type="text"
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                />
              </div>
            </div>
            <label htmlFor="">Description</label>
            <textarea
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
            <label htmlFor="">Service image</label>

            <div className="service-img">
              {image != "" && <img src={`http://${API_IP_2}/${image}`} />}

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
              <Ripples
                className="riple-btn"
                color="rgba(255,255,255, 0.5)"
                during={1200}
              >
                <button
                  className="update-service button"
                  onClick={props.type == "new" ? createService : updateService}
                >
                  {props.type == "new" ? "Save" : "Update"}
                </button>
              </Ripples>
            </div>
            {props.type != "new" ? (
              <div className="delete-service-dev">
                <p>
                  Caution: Deleting this service is permanent and cannot be
                  recovered.
                </p>
                <Ripples
                  className="riple-btn"
                  color="rgba(255,255,255, 0.5)"
                  during={1200}
                >
                  <button
                    className="delete-service button"
                    // onClick={() => {
                    //   api.delete(`services/${id}`).then((res) => {});
                    // }}
                  >
                    <i className="fa-solid fa-trash-can"></i>Delete
                  </button>
                </Ripples>
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
