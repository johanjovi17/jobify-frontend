import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserData } from "../context/UserContext";
import { BsEye, BsEyeSlash } from "react-icons/bs";

const Register = () => {
  const navigate = useNavigate();
  const { registerUser } = UserData();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await registerUser(username, email, password, role, navigate);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg backdrop-blur-lg backdrop-filter bg-opacity-40">
        <h2 className="text-3xl font-bold text-indigo-600 text-center mb-6">
          Register
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-group">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full p-3 mt-1 rounded bg-gray-200 focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
              placeholder="Enter your username"
            />
          </div>
          <div className="form-group">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 mt-1 rounded bg-gray-200 focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group relative">
            <label className="block text-gray-700">Password</label>
            <div className="flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-3 pr-10 mt-1 rounded bg-gray-200 focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="absolute right-0 inset-y-0 flex items-center px-3 text-gray-600 focus:outline-none"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <BsEyeSlash size={20} /> : <BsEye size={20} />}
              </button>
            </div>
          </div>
          <div className="form-group">
            <label className="block text-gray-700">Sign in as</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              className="w-full p-3 mt-1 rounded bg-gray-200 focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
            >
              <option value="user">User</option>
              <option value="employer">Employer</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-3 text-white bg-indigo-600 rounded hover:bg-indigo-700 transition duration-300"
          >
            Register
          </button>
          <div className="text-center text-gray-700">
            <p className="mt-3">Already have an account?</p>
            <Link
              to="/login"
              className="text-indigo-600 hover:text-indigo-700 transition duration-300"
            >
              Login here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
