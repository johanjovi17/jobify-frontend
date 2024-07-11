import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Toaster } from "react-hot-toast";
import { UserData } from "../context/UserContext";

const MainLayout = () => {
  const { isAuth, user } = UserData();
  return (
    <>
      <Navbar isAuth={isAuth} user={user} />
      <Outlet />
      <Toaster />
    </>
  );
};

export default MainLayout;
