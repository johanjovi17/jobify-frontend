// import axios from "axios";

// const API_URL = "/api/users/";

// const register = (username, email, password, role) => {
//   return axios.post(API_URL + "register", { username, email, password, role });
// };

// const login = (email, password) => {
//   return axios.post(API_URL + "login", { email, password });
// };

// export const logout = async () => {
//   //this has to be export only!!
//   try {
//     // Optionally, you can make a request to the backend to invalidate the token
//     await axios.post("/api/users/logout");

//     // Remove the token from local storage
//     localStorage.removeItem("user");

//     // Optionally, remove user information from local storage
//     localStorage.removeItem("userInfo");
//   } catch (error) {
//     console.error("Error logging out:", error);
//     throw error;
//   }
// };

// export default {
//   register,
//   login,
// };

import axiosInstance from "./authInstance";

const API_URL = "/users/";

const register = (username, email, password, role) => {
  return axiosInstance.post(API_URL + "register", {
    username,
    email,
    password,
    role,
  });
};

const login = (email, password) => {
  return axiosInstance.post(API_URL + "login", { email, password });
};

export const logout = async () => {
  try {
    await axiosInstance.post(API_URL + "logout");
    localStorage.removeItem("token");
    // localStorage.removeItem("userInfo");
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
};

const getUser = async (token) => {
  const response = await axiosInstance.get(API_URL + "me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export default {
  register,
  login,
  getUser,
};
