import React from "react";
import Hero from "../components/Hero";
import HomeCards from "../components/HomeCards";
import JobListings from "../components/JobListings";
import ViewAllJobs from "../components/ViewAllJobs";
import { useUser } from "@clerk/clerk-react";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const HomePage = () => {

  const { user } = useUser();
  const [welcomeShown, setWelcomeShown] = useState(false);
  useEffect(() => {
    if (user && !welcomeShown) {
      const hasShownWelcome = localStorage.getItem("welcomeShown");
      if (!hasShownWelcome) {
        toast.success(`Welcome, ${user.fullName || user.username}!`);
        localStorage.setItem("welcomeShown", "true");
        setWelcomeShown(true);
      }
    }
  }, [user, welcomeShown]);
  return (
    <>
      <Hero />
      <HomeCards />
      <JobListings isHome={true} />
      <ViewAllJobs />
    </>
  );
};

export default HomePage;
