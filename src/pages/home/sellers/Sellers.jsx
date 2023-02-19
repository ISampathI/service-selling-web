import React, { useContext } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import SellerCard from "../../../components/sellerCard/SellerCard";
import "./sellers.scss";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { API_IP, API_IP_2, ProgressBarContext } from "../../../helper/Context";
import Footer from "../../../layouts/Footer";

const api = axios.create({
  baseURL: `http://${API_IP_2}/api/`,
});

function Sellers(props) {
  const [sellersList, setSellersList] = useState([]);
  const { progress, setProgress } = useContext(ProgressBarContext);

  useEffect(() => {
    setProgress(20)
    fetchMoreData();
  }, []);

  const fetchMoreData = async() => {
    await api.get("/users/sellers").then((res) => {
      setSellersList(sellersList.concat(res.data.users));
    });
    setProgress(100)
  };

  return (
    <div className="Sellers">
      <Outlet />
      <div className="sellers-list" id="sellers-list-id">
        <InfiniteScroll
          dataLength={sellersList && sellersList.length}
          next={fetchMoreData}
          hasMore={true}
          loader={
            <div className="loading">
              <div className="loading-circle"></div>
            </div>
          }
          scrollableTarget="sellers-list-id"
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
          className="infinite-scroll"
        >
          {sellersList && sellersList.map((item, index) => (
            <>
              <SellerCard
                username={item.username}
                last_name={""}
                profile_img={item.proPic}
                about={item.about}
                rating={item.rating}
              />
            </>
          ))}
          <div className="correct-margine"></div>
          <div className="correct-margine"></div>
          <div className="correct-margine"></div>
        </InfiniteScroll>
      </div>
      <Footer />
    </div>
  );
}

export default Sellers;
