import { NavLink } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { UserButton, SignedIn, SignedOut,useUser } from "@clerk/clerk-react";
import "./navbar.css";
import { useState, useEffect } from "react";

const Navbar = () => {
  const { user } = useUser();
  const [isEmployer, setIsEmployer] = useState(false);
  useEffect(() => {
    if (user && user.username === "employer") {
      setIsEmployer(true);
    }
  }, [user]);
  const linkClass = ({ isActive }) =>
    isActive
      ? "bg-black text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
      : "text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2";

  return (
    <nav className="bg-indigo-700 border-b border-indigo-500 navbar">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start navbar-content">
            {/* <!-- Logo --> */}
            <NavLink className="flex flex-shrink-0 items-center mr-4" to="/home">
              <img className="h-10 w-auto" src={logo} alt="React Jobs" />
              <span className="hidden md:block text-white text-2xl font-bold ml-2">
                Jobify
              </span>
            </NavLink>
            <div className="md:ml-auto">
              <div className="flex space-x-2">
                <NavLink to="/home" className={linkClass}>
                  Home
                </NavLink>
                <SignedIn>
                  <NavLink to="/jobs" className={linkClass}>
                    Jobs
                  </NavLink>
                </SignedIn>
                <SignedIn>
                  {isEmployer && (
                    <NavLink to="/add-job" className={linkClass}>
                      Add Job
                    </NavLink>
                  )}
                </SignedIn>

                <SignedOut>
                  <NavLink to="/" className={linkClass}>
                    Login
                  </NavLink>
                </SignedOut>

                <SignedIn>
                  <NavLink className="user-btn">
                    <UserButton />
                  </NavLink>
                </SignedIn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
