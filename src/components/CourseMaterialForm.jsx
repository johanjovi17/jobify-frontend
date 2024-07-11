import React, { useState } from "react";
const CourseMaterialForm = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description, url });
    setTitle("");
    setDescription("");
    setUrl("");
  };

  return (
    <form onSubmit={handleSubmit} className="course-material-form">
      <div className="form-group mb-4">
        <label className="block font-bold text-indigo-800 mb-2 course-material-form-title">
          Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="form-group mb-4">
        <label className="block font-bold text-indigo-800 mb-2 course-material-form-title">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        ></textarea>
      </div>
      <div className="form-group mb-4">
        <label className="block font-bold text-indigo-800 mb-2 course-material-form-title">
          Video URL
        </label>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded"
      >
        Add Material
      </button>
    </form>
  );
};

export default CourseMaterialForm;
