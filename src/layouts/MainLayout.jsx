// import React from "react";
// import { Outlet } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const MainLayout = () => {
//   return (
//     <>
//       <Navbar />
//       <Outlet />
//       <ToastContainer />
//     </>
//   );
// };

// export default MainLayout;

import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MainLayout = () => {
  const location = useLocation();
  const noNavbarPaths = ["/"];
  // !noNavbarPaths.includes(location.pathname) &&
  return (
    <>
      <Navbar />
      <Outlet />
      <ToastContainer />
    </>
  );
};

export default MainLayout;
