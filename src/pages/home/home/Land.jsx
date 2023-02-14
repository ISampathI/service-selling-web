import React, { useEffect, useState } from "react";
import CategoryCard from "../../../components/CategoryCard";
import ServiceCard from "../../../components/serviceCard/ServiceCard";
import "./land.scss";
import heroimg from "../../../assets/img/workers/hero.png";
import playstoreimg from "../../../assets/img/buttons/playstore.png";
import appstoreimg from "../../../assets/img/buttons/appstore.png";
import axios from "axios";
import { API_IP } from "../../../helper/Context";
import Footer from "../../../layouts/Footer";

const api = axios.create({
  baseURL: `http://${API_IP}/`,
});
export default function Home(props) {
  const [loginStatus, setloginStatus] = useState(false);

  const [CategoryList, setCategoryList] = useState([]);
  const [suggestedServicesList, setSuggestedServicesList] = useState([]);
  const [populerServicesList, setPopulerServices] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    api.get("/api/suggestedServices").then((res) => {
      setCategoryList(res.data);
    });
    api.get("/api/suggestedServices").then((res) => {
      setSuggestedServicesList(res.data);
    });
    api.get("/api/populerServices").then((res) => {
      setPopulerServices(res.data);
    });
  };

  return (
    <div className="Home">
      <div className="hero-section">
        <div className="hero-left">
          <div className="main-title">
            The Ultimate Platform for Finding Services
          </div>
          <div className="para">
            Are you tired of sifting through countless resumes and dealing with
            unreliable workers? HireNow is here to solve that problem. Our
            platform connects businesses with a large pool of skilled workers,
            making it easy to find the right fit for your job. With easy-to-use
            tools, secure payment options, and a commitment to quality, HireNow
            is the best choice for finding your next worker.
          </div>
          <button className="get-start-btn">
            Get Started<i class="fa-solid fa-circle-chevron-right"></i>
          </button>
        </div>
        <div className="hero-right">
          <div className="hero-img">
            <img className="heroimg" src={heroimg} alt="" />
          </div>
        </div>
      </div>
      <div className="platform-status"></div>
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
                <img
                  src={playstoreimg}
                  alt=""
                />
              </div>
              <div className="appstore">
                <img src={appstoreimg} alt="" srcset="" />
              </div>
            </div>
          </div>
          <div className="right">
          </div>
        </div>
        <div className="services">
          <div className="titile">Suggested Services for you</div>
          <div className="services-list">
            {suggestedServicesList.map((item, index) => (
              <ServiceCard
                name={item.name}
                profile_img={item.profile_img}
                service_img={item.service_img}
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
              <ServiceCard
                name={item.name}
                profile_img={item.profile_img}
                service_img={item.service_img}
                title={item.title}
                type="0"
              />
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
