import React from "react";
import "./profileDetailsNav.scss";
import ServiceCard from "../../../../../components/serviceCard/ServiceCard";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import NServices from "./nav-services/NServices";
import NGallery from "./nav-gallery/NGallery";

export default function ProfileDetailsNav(props) {
  if (props.name == "services") {
    return <NServices />;
  } else if (props.name == "gallery") {
    return <NGallery />;
  } else if (props.name == "chat") {
    return <div className="SellerDetailsNav"></div>;
  }
}
