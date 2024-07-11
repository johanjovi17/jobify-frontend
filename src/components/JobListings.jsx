import { useState, useEffect } from "react";
import Spinner from "./Spinner";
import JobListing from "./JobListing";
import axiosInstance from "../services/authInstance"; // Use the Axios instance

const JobListings = ({ isHome }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      const apiUrl = isHome ? "api/jobs?_limit=3" : "api/jobs"; // Adjusted to match the baseURL

      try {
        const res = await axiosInstance.get(apiUrl);
        const data = res.data;
        setJobs(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [isHome]); // Added isHome to dependency array to ensure the effect runs when isHome changes

  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          {isHome ? "Recent Jobs" : "Browse Jobs"}
        </h2>

        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <JobListing key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default JobListings;
