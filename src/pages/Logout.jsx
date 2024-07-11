import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/authService";
import { toast } from "react-hot-toast";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      try {
        await logout();
        toast.success("Logged out successfully");
        navigate("/login");
      } catch (error) {
        toast.error("Error logging out");
      }
    };

    performLogout();
  }, [navigate]);

  return null;
};

export default Logout;
