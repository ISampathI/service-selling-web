import React, { useContext, useEffect, useRef, useState } from "react";
import CategoryCard from "../../../components/CategoryCard";
import ServiceCard from "../../../components/serviceCard/ServiceCard";
import "./land.scss";
import heroimg from "../../../assets/img/workers/hero.png";
import icon1 from "../../../assets/img/icons/icon1.png";
// import herosvg from "../../../assets/svg/hero.svg";
import dec1 from "../../../assets/img/dec1.png";
import dec2 from "../../../assets/img/dec2.png";
import playstoreimg from "../../../assets/img/buttons/playstore.png";
import appstoreimg from "../../../assets/img/buttons/appstore.png";
import axios from "axios";
import {
  API_IP,
  API_IP_2,
  ChangeHeaderNavColor,
  ChangeHeaderNavColorContext,
} from "../../../helper/Context";
import Footer from "../../../layouts/Footer";

const api = axios.create({
  baseURL: `http://${API_IP_2}/`,
});
export default function Home(props) {
  const [loginStatus, setloginStatus] = useState(false);
  const scrollElement = useRef(null);

  const [CategoryList, setCategoryList] = useState([]);
  const [suggestedServicesList, setSuggestedServicesList] = useState([]);
  const [populerServicesList, setPopulerServices] = useState([]);
  const [platformStatus, setPlatformStatus] = useState([]);

  const { changeHeaderNavColor, setChangeHeaderNavColor } = useContext(
    ChangeHeaderNavColorContext
  );

  useEffect(() => {
    fetchData();
  }, []);
  var handleScroll = (event) => {
    const scrollTop = event.target.scrollTop;
    if (scrollTop > 0) {
      setChangeHeaderNavColor(true);
    } else if (scrollTop == 0) {
      setChangeHeaderNavColor(false);
    }
  };

  const fetchData = () => {
    api.get("/api/categories").then((res) => {
      setCategoryList(res.data.categories);
    });
    api.get("/api/services/suggested").then((res) => {
      setSuggestedServicesList(res.data.services);
      console.log(res.data.services)
    });
    api.get("/api/services/popular").then((res) => {
      setPopulerServices(res.data.services);
    });
    api.get("/api/users/platform-status").then((res) => {
      setPlatformStatus(res.data.status);
    });
  };

  return (
    <div className="Home" onScroll={handleScroll}>
      <div className="hero-section">
        <div className="dec1">
          <img src={dec1} alt="" />
        </div>
        <div className="hero-left">
          <div className="main-title">
            <span>Find</span> Any Service You Need!
          </div>
          <div className="para">
            Our platform makes it easy to find and hire talented professionals
            for all your needs.{" "}
          </div>
          <button className="get-start-btn">
            <p>Get Started</p>
            <i class="fa-solid fa-circle-chevron-right"></i>
          </button>
          <div className="platform-status">
            <div className="platform-status-wrapper">
              <div className="p-status">
                <div className="status-num">
                  {platformStatus.sellers ? platformStatus.sellers : "0"}+
                </div>
                <div className="status-name">Total Sellers</div>
              </div>
              <div className="p-status">
                <div className="status-num">
                  {platformStatus.services ? platformStatus.services : "0"}+
                </div>
                <div className="status-name">Total Services</div>
              </div>
              <div className="p-status">
                <div className="status-num">
                  {platformStatus.users ? platformStatus.users : "0"}+
                </div>
                <div className="status-name">Total users</div>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-right">
          <div className="hero-img">
            <img className="heroimg" src={heroimg} alt="" />
          </div>
        </div>
      </div>
      <div className="category-section">
        <div className="categories">
          <div className="title">
            You'll find many available <span>categories</span>
            <br /> on <span>Hire</span> Now!
          </div>
          <div className="ul-cat-wrap">
            <div
              className="slid-btn slid-btn-l"
              onClick={() => {
                scrollElement.current.scrollLeft -= 50;
              }}
            >
              <i class="fa-solid fa-angle-left"></i>
            </div>
            <div
              className="slid-btn slid-btn-r"
              onClick={() => {
                scrollElement.current.scrollLeft += 50;
              }}
            >
              <i class="fa-solid fa-angle-right"></i>
            </div>
            <ul ref={scrollElement}>
              {CategoryList.map((item, index) => (
                <CategoryCard
                  name={item.name}
                  category_img={`http://${API_IP_2}/${item.categoryImg}`}
                  id={item._id}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="why-hire-now-section">
        <div className="title">
          Why choose <span>Hire</span> Now for your <span>needs</span>?
        </div>
        <div className="why-hire-list">
          <div className="why-hire">
            <img src={icon1} alt="" />
            <p>
              <span>High Quality Services</span>
              <div className="why-details">
                High-quality services available at every price point
              </div>
            </p>
          </div>
          <div className="why-hire">
            <img src={icon1} alt="" />
            <p>
              <span>High Quality Services</span>
              <div className="why-details">
                High-quality services available at every price point
              </div>
            </p>
          </div>
          <div className="why-hire">
            <img src={icon1} alt="" />
            <p>
              <span>High Quality Services</span>
              <div className="why-details">
                High-quality services available at every price point
              </div>
            </p>
          </div>
          <div className="why-hire">
            <img src={icon1} alt="" />
            <p>
              <span>High Quality Services</span>
              <div className="why-details">
                High-quality services available at every price point
              </div>
            </p>
          </div>
        </div>
      </div>
      <div className="services">
        <div className="titile">
          Suggested Services <span>for you</span>
        </div>
        <div className="services-list">
          {suggestedServicesList.map((item, index) => (
            index < 6 &&
            <ServiceCard
              name={item.name}
              profile_img={item.proPic}
              service_img={`http://${API_IP_2}/${item.serviceImg}`}
              title={item.title}
              id={item._id}
              location = {item.location}
              type="0"
            />
          ))}
        </div>
        <div className="services-list">
          {suggestedServicesList.map((item, index) => (
            index >= 6 &&
            <ServiceCard
              name={item.name}
              profile_img={item.proPic}
              service_img={`http://${API_IP_2}/${item.serviceImg}`}
              title={item.title}
              id={item._id}
              location = {item.location}
              type="0"
            />
          ))}
        </div>
      </div>
      <div className="services">
        <div className="titile">
          <span>Populer</span> Services
        </div>
        <div className="services-list">
          {populerServicesList.map((item, index) => (
            <ServiceCard
              name={item.name}
              profile_img={item.proPic}
              service_img={`http://${API_IP_2}/${item.serviceImg}`}
              title={item.title}
              id={item._id}
              location = {item.location}
              type="0"
            />
          ))}
        </div>
        <div className="services-list">
          {populerServicesList.map((item, index) => (
            <ServiceCard
              name={item.name}
              profile_img={item.proPic}
              service_img={`http://${API_IP_2}/${item.serviceImg}`}
              title={item.title}
              id={item._id}
              location = {item.location}
              type="0"
            />
          ))}
        </div>
      </div>
      {/* <div className="what-p-saying">
        <div className="title">
          What Are People Saying <span>About Us</span>{" "}
        </div>
        <div className="sub-text">
          We're thrilled to hear that you're satisfied with our service and
          products! Feel free to read genuine reviews who have purchased our
          products.
        </div>
        <div className="comment-card-list">
          <div className="CommentCard">
            <img className="pro-pic" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsynwv-5qtogtOwJbIjaPFJUmHpzhxgqIAug&usqp=CAU" alt="" srcset="" />
            <div className="name">Sampath Guruge</div>
            <p>
              The salad is fresh!!! Don't ask about the sauce again, it's really
              delicious, it's going to be routine. I recommend this salad to all
              of you guys!
            </p>
          </div>
          <div className="CommentCard">
            <img className="pro-pic" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsynwv-5qtogtOwJbIjaPFJUmHpzhxgqIAug&usqp=CAU" alt="" srcset="" />
            <div className="name">Sampath Guruge</div>
            <p>
              The salad is fresh!!! Don't ask about the sauce again, it's really
              delicious, it's going to be routine. I recommend this salad to all
              of you guys!
            </p>
          </div>
          <div className="CommentCard">
            <img className="pro-pic" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsynwv-5qtogtOwJbIjaPFJUmHpzhxgqIAug&usqp=CAU" alt="" srcset="" />
            <div className="name">Sampath Guruge</div>
            <p>
              The salad is fresh!!! Don't ask about the sauce again, it's really
              delicious, it's going to be routine. I recommend this salad to all
              of you guys!
            </p>
          </div>
          <div className="CommentCard">
            <img className="pro-pic" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsynwv-5qtogtOwJbIjaPFJUmHpzhxgqIAug&usqp=CAU" alt="" srcset="" />
            <div className="name">Sampath Guruge</div>
            <p>
              The salad is fresh!!! Don't ask about the sauce again, it's really
              delicious, it's going to be routine. I recommend this salad to all
              of you guys!
            </p>
          </div>
          <div className="CommentCard">
            <img className="pro-pic" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsynwv-5qtogtOwJbIjaPFJUmHpzhxgqIAug&usqp=CAU" alt="" srcset="" />
            <div className="name">Sampath Guruge</div>
            <p>
              The salad is fresh!!! Don't ask about the sauce again, it's really
              delicious, it's going to be routine. I recommend this salad to all
              of you guys!
            </p>
          </div>
        </div>
      </div> */}
      {/* <div className="about-section">
        <div className="about-left">
          <span>ABOUT US</span>
          <h1>Lorem ipsum dolor sit amet.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, nulla
            magni numquam voluptatibus, similique accusantium fugiat aperiam
            exercitationem molestias placeat dolor quas expedita quos est
            dolorem harum totam incidunt aliquid.
          </p>
          <button>More Details</button>
        </div>
        <div className="about-right"></div>
      </div> */}
      <div
        className="app-promotion"
        style={{ backgroundImage: `url(${dec2})` }}
      >
        <div className="left">
          <div className="title">
            <div className="sub-text">Our Mobile App</div>
            Try our <span>Hire</span> Now Mobile App Today!
          </div>
          <p>
            The app is designed to be simple and easy-to-use, so you can focus
            on what you do best - providing services. You can create a
            professional profile, add your services, set your prices, and start
            accepting payments through the app.
          </p>
          <div className="buttons">
            <div className="playstore">Android App</div>
            <div className="appstore">IOS App</div>
          </div>
        </div>
        <div className="right"></div>
      </div>
      <Footer />
    </div>
  );
}
