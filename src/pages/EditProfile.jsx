import React, { useState, useEffect } from "react";
import axiosInstance from "../services/authInstance";
import { useNavigate } from "react-router-dom";
import { UserData } from "../context/UserContext";
import { toast } from "react-hot-toast";
import Spinner from "../components/Spinner";

const EditProfile = ({ user }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [age, setAge] = useState(user.age);
  const [experience, setExperience] = useState(user.experience);
  const [location, setLocation] = useState(user.location);
  const [bio, setBio] = useState(user.bio);
  const { setUser } = UserData();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedUser = {
      username,
      email,
      experience,
      age,
      location,
      bio,
    };

    try {
      const res = await axiosInstance.post("api/users/profile", updatedUser, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setUser(res.data);
      console.log(res.data);
      toast.success("User updated successfully");
      setLoading(false);
      navigate("/profile");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };
  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Experience
            </label>
            <input
              type="text"
              name="experience"
              value={experience}
              onChange={(e) => {
                setExperience(e.target.value);
              }}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Age</label>
            <input
              type="number"
              name="age"
              value={age}
              onChange={(e) => {
                setAge(e.target.value);
              }}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
              }}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Bio</label>
            <input
              type="text"
              name="bio"
              value={bio}
              onChange={(e) => {
                setBio(e.target.value);
              }}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Save Changes
            </button>
            <button
              onClick={() => navigate("/profile")}
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
