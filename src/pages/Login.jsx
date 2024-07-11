import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserData } from "../context/UserContext";
import { BsEye, BsEyeSlash } from "react-icons/bs";

const Login = () => {
  const navigate = useNavigate();
  const { loginUser } = UserData();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await loginUser(email, password, navigate);
  };
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg backdrop-blur-lg backdrop-filter bg-opacity-40">
        <h2 className="text-3xl font-bold text-indigo-600 text-center mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
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
                className="absolute y-0 right-0 flex items-center px-3 text-gray-600 focus:outline-none"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <BsEyeSlash size={20} /> : <BsEye size={20} />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-3 text-white bg-indigo-600 rounded hover:bg-indigo-700 transition duration-300"
          >
            Login
          </button>
          <div className="text-center text-gray-700">
            <p className="mt-3">Don't have an account?</p>
            <Link
              to="/register"
              className="text-indigo-600 hover:text-indigo-700 transition duration-300"
            >
              Register here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
