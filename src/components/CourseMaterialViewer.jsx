import React from "react";
import ReactPlayer from "react-player";

const CourseMaterialViewer = ({ material }) => {
  return (
    <div className="course-material-viewer bg-white p-4 mb-4 rounded shadow-md">
      <h4 className="text-indigo-800 font-bold mb-2">{material.title}</h4>
      <p className="mb-4">{material.description}</p>
      <ReactPlayer url={material.url} controls={true} width="100%" />
    </div>
  );
};

export default CourseMaterialViewer;
