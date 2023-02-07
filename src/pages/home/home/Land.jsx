import React, { useEffect, useState } from "react";
import CategoryCard from "../../../components/CategoryCard";
import ServiceCard from "../../../components/serviceCard/ServiceCard";
import "./land.scss";
import dec1 from "../../../assets/svg/dec1.svg";
import axios from "axios";
import { API_IP } from "../../../helper/Context";

const api = axios.create({
  baseURL: `http://${API_IP}/`,
  withCredentials: true,
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
        <img className="dec1" src={dec1} alt="" />
        <div className="hero-left">
          <div className="main-title">
            Lorem ipsum dolor sit amet consectetur.
          </div>
          <div className="para">
            Welcome to [Platform Name], the easiest and most reliable platform
            for selling all your products online. Our platform provides you with
            the tools and resources you need to create a successful online
            store, whether you're a small business owner or a large corporation.
            With [Platform Name], you'll be able to reach a wider audience,
            increase sales and grow your business.
          </div>
          <button className="get-start-btn">
            Get Started<i class="fa-solid fa-circle-chevron-right"></i>
          </button>
        </div>
        <div className="hero-right"></div>
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
      <footer></footer>
    </div>
  );
}
