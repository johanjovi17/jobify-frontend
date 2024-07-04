import React from "react";
import MainLayout from "./layouts/MainLayout";
import JobsPage from "./pages/JobsPage";
import JobPage, { jobLoader } from "./pages/JobPage";
import HomePage from "./pages/HomePage";
import AddJobPage from "./pages/AddJobPage";
import NotFoundPage from "./pages/NotFoundPage";
import EditJobPage from "./pages/EditJobPage";
import Login from "./pages/Login";
import axiosInstance from "./services/authInstance";
//clerk imports
import { SignedIn, RedirectToSignIn, SignedOut } from "@clerk/clerk-react";

//react router components
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

const App = () => {
  //add job
  const addJob = async (newJob) => {
    try {
      const res = await axiosInstance.post("/jobs", newJob, {
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
      const res = await axiosInstance.delete(`/jobs/${id}`);
      return res.data;
    } catch (error) {
      console.error("Error deleting job:", error);
      throw error;
    }
  };
  // update job
  const updateJob = async (job) => {
    try {
      const res = await axiosInstance.put(`/jobs/${job.id}`, job, {
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
          <Route index element={<Login />} />

          <Route path="/home" element={<HomePage />} />
          <Route path="jobs" element={<JobsPage />} />
          <Route
            path="add-job"
            element={
              <>
                <SignedIn>
                  <AddJobPage addJobSubmit={addJob} />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            }
          />
          <Route
            path="jobs/:id"
            element={
              <>
                <SignedIn>
                  <JobPage deleteJob={deleteJob} />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            }
            loader={jobLoader}
          />
          <Route
            path="edit-job/:id"
            element={
              <>
                <SignedIn>
                  <EditJobPage updateJobSubmit={updateJob} />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            }
            loader={jobLoader}
          />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
