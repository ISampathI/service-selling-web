// import { Axios } from "axios";
// import { useCookies } from "react-cookie";
// import { API_IP_2 } from "./Context";
// import React, { Component, useState, useEffect, useContext } from "react";

// const api = Axios.create({
//   baseURL: `http://${API_IP_2}/api/`,
// });

// const checkLoggedUserUtil=()=> {
//   const [cookies, setCookie] = useCookies(["token"]);

//   api
//     .post("/users/chekToken", {
//       headers: { Authorization: `Bearer ${cookies.token}` },
//     })
//     .then((res) => {
//       if (res.data) {
//         console.log(res.data);
//         //   setCookie("token", res.data.token, { path: "/" });
//         //   setUser(res.data.user);
//         //   setLoggedIn(true);
//         //   navigate("/");
//       }
//     });
// }

// export default checkLoggedUserUtil;
