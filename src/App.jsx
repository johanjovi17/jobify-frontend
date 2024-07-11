import React from "react";
import MainLayout from "./layouts/MainLayout";
import JobsPage from "./pages/JobsPage";
import JobPage, { jobLoader } from "./pages/JobPage";
import HomePage from "./pages/HomePage";
import AddJobPage from "./pages/AddJobPage";
import NotFoundPage from "./pages/NotFoundPage";
import EditJobPage from "./pages/EditJobPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import axiosInstance from "./services/authInstance";
import EditProfile from "./pages/EditProfile";
//new import statements
import { UserData } from "./context/UserContext";

import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

const App = () => {
  const { isAuth, user } = UserData();

  //add job
  const addJob = async (newJob) => {
    try {
      const res = await axiosInstance.post("/api/jobs", newJob, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return res.data;
    } catch (error) {
      console.error("Error adding job:", error);
      throw error;
    }
  };
  // delete job
  const deleteJob = async (id) => {
    try {
      const res = await axiosInstance.delete(`/api/jobs/${id}`);
      return res.data;
    } catch (error) {
      console.error("Error deleting job:", error);
      throw error;
    }
  };
  // update job
  const updateJob = async (job) => {
    try {
      const res = await axiosInstance.put(`/api/jobs/${job.id}`, job, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return res.data;
    } catch (error) {
      console.error("Error updating job:", error);
      throw error;
    }
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<MainLayout />}>
          <Route
            index
            element={isAuth ? <HomePage user={user} /> : <Login />}
          />

          <Route
            path="/profile"
            element={isAuth ? <Profile user={user} /> : <Login />}
          />
          <Route
            path="/login"
            element={isAuth ? <HomePage isAuth={isAuth} /> : <Login />}
          />
          <Route
            path="/register"
            element={isAuth ? <HomePage isAuth={isAuth} /> : <Register />}
          />
          <Route path="jobs" element={isAuth ? <JobsPage /> : <Login />} />
          <Route
            path="add-job"
            element={isAuth ? <AddJobPage addJobSubmit={addJob} /> : <Login />}
          />
          <Route
            path="/edit-profile/:id"
            element={isAuth ? <EditProfile user={user} /> : <Login />}
          />
          <Route
            path="jobs/:id"
            element={
              isAuth ? <JobPage deleteJob={deleteJob} user={user} /> : <Login />
            }
            loader={jobLoader}
          />
          <Route
            path="edit-job/:id"
            element={
              isAuth ? <EditJobPage updateJobSubmit={updateJob} /> : <Login />
            }
            loader={jobLoader}
          />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
