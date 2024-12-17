import React, { useEffect, useState } from "react";
import { getImages, createAnnotation } from "../api";
import { useParams } from "react-router-dom";
import AnnotationCanvas from "./AnnotationCanvas";

function AnnotationPage() {
  const { projectId } = useParams();
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    getImages(projectId).then(setImages);
  }, [projectId]);

  const handleSave = (boxes) => {
    if (images.length === 0) return;
    const currentImage = images[currentIndex];
    // annotation_data can be structured as needed
    const annotation_data = { boxes };
    createAnnotation(currentImage.image_id, annotation_data)
      .then(() => {
        setMessage("Annotation saved!");
        // Move to next image
        if (currentIndex < images.length - 1) {
          setCurrentIndex(currentIndex + 1);
        } else {
          setMessage("All images annotated!");
        }
      })
      .catch((err) => {
        console.error(err);
        setMessage("Error saving annotation");
      });
  };

  if (images.length === 0) {
    return (
      <div className="container">
        <h1>Annotate Project {projectId}</h1>
        <p>No images available.</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Annotate Project {projectId}</h1>
      {message && <p>{message}</p>}
      <p>
        Image {currentIndex + 1} of {images.length}
      </p>
      <AnnotationCanvas
        imageUrl={images[currentIndex].image_url}
        onSave={handleSave}
      />
    </div>
  );
}

export default AnnotationPage;
