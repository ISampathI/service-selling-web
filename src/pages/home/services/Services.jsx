import { React, setState, useEffect, useState } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import ServiceCard from "../../../components/serviceCard/ServiceCard";
import "./service.scss";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import { API_IP } from "../../../helper/Context";

const api = axios.create({
  baseURL: `http://${API_IP}/api/`,
});
// var state = {
//   serviceList: Array.from({ length: 20 }),
//   hasMore: true,
// };

// const fetchMoreData = (items, setItems) => {
//   console.log("hiiiii", items);
//   //state.serviceList.concat(Array.from({ length: 20 }));
//   setItems(items.concat(Array.from({ length: 3 })));
// };

const refresh = (setItems) => {
  console.log("hello");
};

export default function Services(props) {
  const [servicesList, setServicesList] = useState([]);

  useEffect(() => {
    fetchMoreData();
  }, []);

  const fetchMoreData = () => {
    //state.serviceList.concat(Array.from({ length: 20 }));
    api.get("/services").then((res) => {
      setServicesList(servicesList.concat(res.data));
      console.log("nn", servicesList);
    });
  };

  return (
    <div className="Services">
      <Outlet />
      <div className="services-list" id="services-list-id">
        <InfiniteScroll
          dataLength={servicesList.length}
          next={fetchMoreData}
          hasMore={true}
          loader={
            <div className="loading">
              <div className="loading-circle"></div>
            </div>
          }
          scrollableTarget="services-list-id"
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
          // refreshFunction={refresh}
          // pullDownToRefresh
          // pullDownToRefreshThreshold={3}
          // pullDownToRefreshContent={
          //   <h3 style={{ textAlign: "center" }}>
          //     # 8595; Pull down to refresh
          //   </h3>
          // }
          // releaseToRefreshContent={
          //   <h3 style={{ textAlign: "center" }}># 8593; Release to refresh</h3>
          // }
          className="infinite-scroll"
        >
          {servicesList.map((item, index) => (
            <>
              <ServiceCard
                name={item.name}
                profile_img={item.profile_img}
                service_img={item.service_img}
                title={item.title}
                type="0"
              />
            </>
          ))}
          <div className="correct-margine"></div>
          <div className="correct-margine"></div>
          <div className="correct-margine"></div>
        </InfiniteScroll>
      </div>
    </div>
  );
}
