import { useParams, useLoaderData, Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaMapMarker } from "react-icons/fa";
import { toast } from "react-hot-toast";
import axiosInstance from "../services/authInstance";
import CourseMaterialViewer from "../components/CourseMaterialViewer";
import CourseMaterialForm from "../components/CourseMaterialForm";
import { useState, useEffect } from "react";
import "./jobPage.css";

const JobPage = ({ deleteJob, user }) => {
  const { id } = useParams();
  const job = useLoaderData();
  const navigate = useNavigate();

  const [materials, setMaterials] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const res = await axiosInstance.get(`/jobs/${id}/materials`);
        setMaterials(res.data);
      } catch (error) {
        console.log("Error fetching materials:", error);
      }
    };

    fetchMaterials();
    setIsAdmin(user.role === "employer");
  }, [id, user.role]);

  const handleAddMaterial = async (material) => {
    try {
      const res = await axiosInstance.post(`/jobs/${id}/materials`, material);
      setMaterials([...materials, res.data]);
      toast.success("material added successfully");
      navigate("/");
    } catch (error) {
      console.log("Error adding material:", error);
      toast.error("Error adding material");
    }
  };

  const onDeleteClick = (jobId) => {
    const confirm = window.confirm("Are you sure you want to delete?");

    if (!confirm) return;

    deleteJob(jobId);

    toast.success("Job deleted successfully");
    navigate("/jobs");
  };

  return (
    <>
      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            to="/jobs"
            className="text-indigo-500 hover:text-indigo-600 flex items-center"
          >
            <FaArrowLeft className="mr-2" /> Back to Job Listings
          </Link>
        </div>
      </section>

      <section className="bg-indigo-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
            <main>
              <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
                <div className="text-gray-500 mb-4">{job.type}</div>
                <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
                <div className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
                  <FaMapMarker className="text-orange-700 mr-1" />
                  <p className="text-orange-700">{job.location}</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-indigo-800 text-lg font-bold mb-6">
                  Job Description
                </h3>
                <p className="mb-4">{job.description}</p>

                <h3 className="text-indigo-800 text-lg font-bold mb-2">
                  Salary
                </h3>
                <p className="mb-4">{job.salary} / Year</p>
              </div>

              {isAdmin && materials.length === 0 ? (
                <div className="bg-white p-6 rounded-lg shadow-md mt-6 video-container">
                  <h3 className="text-indigo-800 text-lg font-bold mb-6">
                    Job Introduction
                  </h3>
                  <CourseMaterialForm onSubmit={handleAddMaterial} />
                </div>
              ) : (
                materials.length > 0 && (
                  <div className="bg-white p-6 rounded-lg shadow-md mt-6 video-container">
                    <h3 className="text-indigo-800 text-lg font-bold mb-6">
                      Job Course Starter Material
                    </h3>
                    {materials.map((material, index) => (
                      <CourseMaterialViewer key={index} material={material} />
                    ))}
                  </div>
                )
              )}
            </main>

            {/* Sidebar */}
            <aside>
              {/* Company Info */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-6">Company Info</h3>
                <h2 className="text-2xl">{job.company.name}</h2>
                <p className="my-2">{job.company.description}</p>
                <hr className="my-4" />
                <h3 className="text-xl">Contact Email:</h3>
                <p className="my-2 bg-indigo-100 p-2 font-bold">
                  {job.company.contactEmail}
                </p>
                <h3 className="text-xl">Contact Phone:</h3>
                <p className="my-2 bg-indigo-100 p-2 font-bold">
                  {job.company.contactPhone}
                </p>
              </div>

              {/* Manage */}
              {user.role === "employer" ? (
                <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                  <h3 className="text-xl font-bold mb-6">Manage Job</h3>
                  <Link
                    to={`/edit-job/${job._id}`}
                    className="bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                  >
                    Edit Job
                  </Link>
                  <button
                    onClick={() => onDeleteClick(job._id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                  >
                    Delete Job
                  </button>
                </div>
              ) : (
                ""
              )}
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};

const jobLoader = async ({ params }) => {
  try {
    const res = await axiosInstance.get(`/jobs/${params.id}`);
    return res.data;
  } catch (error) {
    console.error("Error loading job:", error);
    throw new Error("There was an error loading the page");
  }
};

export { JobPage as default, jobLoader };
