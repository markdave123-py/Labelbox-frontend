import React, { useState } from "react";
import { uploadImage } from "../api";
import { useParams } from "react-router-dom";

function ImageUploader() {
  const { projectId } = useParams();
  const [file, setFile] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [error, setError] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    try {
      const img = await uploadImage(projectId, file);
      setUploadedImages([...uploadedImages, img]);
      setFile(null);
      setError("");
    } catch (err) {
      console.error("Upload failed:", err);
      setError("Failed to upload the image. Please try again.");
    }
  };

  return (
    <div className="container">
      <h1>Upload Images for Project {projectId}</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleUpload}>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />
        <button type="submit">Upload</button>
      </form>
      <h2>Uploaded Images</h2>
      <ul>
        {uploadedImages.map((img) => (
          <li key={img.image_id}>
            <img
              src={img.image_url}
              alt="Uploaded"
              style={{ height: "100px" }}
            />{" "}
            {img.image_url}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ImageUploader;
