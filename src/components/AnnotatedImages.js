// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// function AnnotatedImages() {
//   const { projectId } = useParams(); // Extract projectId from URL params
//   const [images, setImages] = useState([]);
//   const [error, setError] = useState("");

//   // Fetch annotated images from the backend
//   useEffect(() => {
//     async function fetchImages() {
//       try {
//         const response = await fetch(
//           `https://labelbox.onrender.com/annotations?project_id=${projectId}`
//         );
//         if (!response.ok) {
//           throw new Error("Failed to fetch annotated images.");
//         }
//         const data = await response.json();
//         // Parse annotation_data into usable JSON
//         const formattedData = data.map((img) => ({
//           ...img,
//           annotation_data: img.annotation_data
//             ? JSON.parse(img.annotation_data)
//             : null,
//         }));
//         setImages(formattedData);
//       } catch (err) {
//         console.error("Error fetching annotated images:", err);
//         setError("Failed to load annotated images. Please try again.");
//       }
//     }
//     fetchImages();
//   }, [projectId]);

//   return (
//     <div className="container">
//       <h1>Annotated Images for Project {projectId}</h1>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       {images.length === 0 ? (
//         <p>No annotated images found.</p>
//       ) : (
//         <div className="image-grid">
//           {images.map((img) => (
//             <div key={img.annotation_id} className="image-card">
//               {/* Display the image */}
//               <img
//                 src={img.image_url}
//                 alt={`Annotation ${img.annotation_id}`}
//                 style={{
//                   width: "100%",
//                   height: "auto",
//                   border: "1px solid #ddd",
//                   borderRadius: "5px",
//                 }}
//               />
//               {/* Display annotation details */}
//               <div>
//                 <h4>Annotation ID: {img.annotation_id}</h4>
//                 <p>
//                   <strong>Image ID:</strong> {img.image_id}
//                 </p>
//                 <p>
//                   <strong>Created At:</strong>{" "}
//                   {new Date(img.created_at).toLocaleString()}
//                 </p>
//                 {img.annotation_data && img.annotation_data.boxes ? (
//                   <div>
//                     <h5>Boxes:</h5>
//                     <ul>
//                       {img.annotation_data.boxes.map((box, index) => (
//                         <li key={index}>
//                           x: {box.x}, y: {box.y}, width: {box.width}, height:{" "}
//                           {box.height}
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 ) : (
//                   <p>No boxes available.</p>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default AnnotatedImages;
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function AnnotatedImages() {
  const { projectId } = useParams(); // Get project ID from URL
  const [annotations, setAnnotations] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch annotations for the given project
  useEffect(() => {
    async function fetchAnnotations() {
      setLoading(true);
      try {
        const response = await fetch(
          `https://labelbox.onrender.com/annotations?project_id=${projectId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch annotations.");
        }
        const data = await response.json();
        setAnnotations(data);
      } catch (err) {
        console.error("Error fetching annotations:", err);
        setError("Failed to load annotations. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    fetchAnnotations();
  }, [projectId]);

  return (
    <div className="container">
      <h1>Annotations for Project {projectId}</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {annotations.length === 0 ? (
        <p>No annotations found.</p>
      ) : (
        <div className="image-grid">
          {annotations.map((annotation) => (
            <div key={annotation.annotation_id} className="image-card">
              <img
                src={annotation.image_url}
                alt={`Annotation ${annotation.annotation_id}`}
                style={{
                  width: "100%",
                  height: "auto",
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                }}
              />
              <div>
                <p>
                  <strong>Annotation ID:</strong> {annotation.annotation_id}
                </p>
                <p>
                  <strong>Created At:</strong>{" "}
                  {new Date(annotation.created_at).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AnnotatedImages;

