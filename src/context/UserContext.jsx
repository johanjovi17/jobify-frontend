import { createContext, useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();
const server = "https://jobify-backend-1.onrender.com";
// const navigate = useNavigate();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [isAuth, setIsAuth] = useState(false);

  async function loginUser(email, password, navigate) {
    try {
      const { data } = await axios.post(`${server}/api/users/login`, {
        email,
        password,
      });

      toast.success(`Welcome, ${data.user.username}`);
      localStorage.setItem("token", data.accessToken);
      setUser(data.user);
      setIsAuth(true);
      navigate("/");
    } catch (error) {
      console.log(error);
      setIsAuth(false);
      toast.error(error.response.data);
    }
  }
  async function registerUser(username, email, password, role, navigate) {
    try {
      const { data } = await axios.post(`${server}/api/users/register`, {
        username,
        email,
        password,
        role,
      });

      toast.success(data.message);
      //   localStorage.setItem("token", data.accessToken);
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }
  return (
    <UserContext.Provider
      value={{ user, setUser, setIsAuth, isAuth, loginUser, registerUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserData = () => useContext(UserContext);
