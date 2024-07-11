import React, { useState, useEffect } from "react";
import { UserData } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Spinner from "../components/Spinner";
import { FiEdit, FiLogOut } from "react-icons/fi";
import {
  FiMail,
  FiBriefcase,
  FiCalendar,
  FiMapPin,
  FiInfo,
} from "react-icons/fi";
import { IoLogoFacebook, IoLogoTwitter, IoLogoInstagram } from "react-icons/io";

const Profile = ({ user }) => {
  const { setIsAuth, setUser } = UserData();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, []);

  const logoutHandler = () => {
    localStorage.clear();
    setUser([]);
    setIsAuth(false);
    toast.success("Logged Out Successfully!");
    navigate("/login");
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="container mx-auto mt-10 backdrop-blur-lg backdrop-filter bg-opacity-40">
      <div className="bg-white rounded-lg overflow-hidden shadow-md ">
        <div className="relative">
          <img
            className="w-full h-48 object-cover"
            src="https://images.unsplash.com/photo-1542744095-291d1f67b221?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80" // Cover photo placeholder
            alt="Cover"
          />
          <div className="absolute top-20 left-6 flex items-center space-x-4">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white">
              <img
                className="w-full h-full object-cover"
                src={
                  user.role === "employer"
                    ? "https://img.icons8.com/color/96/000000/businessman.png"
                    : "https://img.icons8.com/color/96/000000/user.png"
                } // Profile picture placeholder
                alt="Profile"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-indigo-600">
                {user.username}
              </h1>
              <p className="text-indigo-600">{user.role}</p>
            </div>
          </div>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                <FiMail className="inline-block mr-2 text-indigo-600" />
                Email
              </label>
              <p className="p-2 bg-gray-100 rounded">{user.email}</p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                <FiBriefcase className="inline-block mr-2 text-indigo-600" />
                Experience
              </label>
              <p className="p-2 bg-gray-100 rounded">
                {user.experience ? user.experience : "-"}
              </p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                <FiCalendar className="inline-block mr-2 text-indigo-600" />
                Age
              </label>
              <p className="p-2 bg-gray-100 rounded">
                {user.age ? user.age : "-"}
              </p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                <FiMapPin className="inline-block mr-2 text-indigo-600" />
                Location
              </label>
              <p className="p-2 bg-gray-100 rounded">
                {user.location ? user.location : "-"}
              </p>
            </div>
            <div className="mb-4 md:col-span-2">
              <label className="block text-gray-700 font-bold mb-2">
                <FiInfo className="inline-block mr-2 text-indigo-600" />
                Bio
              </label>
              <p className="p-2 bg-gray-100 rounded">
                {user.bio ? user.bio : "-"}
              </p>
            </div>
          </div>
          <div className="flex justify-between mt-6">
            <div className="flex space-x-2">
              <a
                href="https://facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-700 transition duration-300"
              >
                <IoLogoFacebook className="text-3xl" />
              </a>
              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-700 transition duration-300"
              >
                <IoLogoTwitter className="text-3xl" />
              </a>
              <a
                href="https://instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-700 transition duration-300"
              >
                <IoLogoInstagram className="text-3xl" />
              </a>
            </div>
            <div className="flex flex-col md:flex-row">
              <button
                onClick={() => navigate(`/edit-profile/${user.id}`)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 mx-2 rounded-full focus:outline-none focus:shadow-outline mt-2 md:mt-0"
              >
                <FiEdit className="inline-block mr-2" />
                Edit Profile
              </button>
              <button
                onClick={logoutHandler}
                className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline mt-2 md:mt-0"
              >
                <FiLogOut className="inline-block mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
