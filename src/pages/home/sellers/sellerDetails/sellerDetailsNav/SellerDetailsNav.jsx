import React from "react";
import "./sellerDetailsNav.scss";
import ServiceCard from "../../../../../components/serviceCard/ServiceCard";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import NSServices from "./nav-sd-services/NSServices";
import NSGallery from "./nav-sd-gallery/NSGallery";
import { API_IP } from "../../../../../helper/Context";

const api = axios.create({
  baseURL: `http://${API_IP}/api/`,
});

export default function sellerDetailsNav(props) {
  if (props.name == "services") {
    return <NSServices />;
  } else if (props.name == "gallery") {
    return <NSGallery />;
  } 
}
