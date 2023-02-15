import React, { useContext, useEffect, useState } from "react";
import CategoryCard from "../../../components/CategoryCard";
import ServiceCard from "../../../components/serviceCard/ServiceCard";
import "./land.scss";
import heroimg from "../../../assets/img/workers/hero.png";
// import herosvg from "../../../assets/svg/hero.svg";
import dec1 from "../../../assets/img/dec1.png";
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

  const [CategoryList, setCategoryList] = useState([]);
  const [suggestedServicesList, setSuggestedServicesList] = useState([]);
  const [populerServicesList, setPopulerServices] = useState([]);

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
    api.get("/api/services/suggested").then((res) => {
      console.log(res.data.services);
      setCategoryList(res.data.services);
    });
    api.get("/api/services/suggested").then((res) => {
      setSuggestedServicesList(res.data.services);
    });
    api.get("/api/services/suggested").then((res) => {
      setPopulerServices(res.data.services);
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
            Get Started<i class="fa-solid fa-circle-chevron-right"></i>
          </button>
          <div className="platform-status">
            <div className="platform-status-wrapper">
              <div className="p-status">
                <div className="status-num">10+</div>
                <div className="status-name">Total Sellers</div>
              </div>
              <div className="p-status">
                <div className="status-num">10+</div>
                <div className="status-name">Total Services</div>
              </div>
              <div className="p-status">
                <div className="status-num">10+</div>
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
          <div className="title">Categories</div>
          <ul>
            <CategoryCard />
            <CategoryCard />
            <CategoryCard />
            <CategoryCard />
            <CategoryCard />
            <CategoryCard />
            <CategoryCard />
            <CategoryCard />
            <CategoryCard />
          </ul>
        </div>
        <div className="app-promotion">
          <div className="left">
            <div className="title">Try our Mobile app today</div>
            <p>
              The app is designed to be simple and easy-to-use, so you can focus
              on what you do best - providing services. You can create a
              professional profile, add your services, set your prices, and
              start accepting payments through the app.
            </p>
            <div className="buttons">
              <div className="playstore">
                <img src={playstoreimg} alt="" />
              </div>
              <div className="appstore">
                <img src={appstoreimg} alt="" srcset="" />
              </div>
            </div>
          </div>
          <div className="right"></div>
        </div>
        <div className="services">
          <div className="titile">Suggested Services for you</div>
          <div className="services-list">
            {suggestedServicesList.map((item, index) => (
              <ServiceCard
                name={item.name}
                profile_img={item.proPic}
                service_img={item.serviceImg}
                title={item.title}
                type="0"
              />
            ))}
          </div>
        </div>
        <div className="services">
          <div className="titile">Populer Services</div>
          <div className="services-list">
            {populerServicesList.map((item, index) => (
              <CategoryCard />
              // <ServiceCard
              //   name={item.name}
              //   profile_img={item.profile_img}
              //   service_img={item.service_img}
              //   title={item.title}
              //   type="0"
              // />
            ))}
          </div>
        </div>
      </div>
      <div className="about-section">
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
      </div>
      <Footer />
    </div>
  );
}
