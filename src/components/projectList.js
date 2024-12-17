// import React, { useEffect, useState } from "react";
// import { getProjects, createProject } from "../api";
// import { Link } from "react-router-dom";

// function ProjectList() {
//   const [projects, setProjects] = useState([]);
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");

//   useEffect(() => {
//     getProjects().then(setProjects);
//   }, []);

//   const handleCreate = async (e) => {
//     e.preventDefault();
//     const newProject = await createProject(name, description);
//     setProjects([...projects, newProject]);
//     setName("");
//     setDescription("");
//   };

//   return (
//     <div className="container">
//       <h1>Projects</h1>
//       <ul>
//         {projects.map((p) => (
//           <li key={p.project_id}>
//             {p.name} - <Link to={`/annotate/${p.project_id}`}>Annotate</Link> |{" "}
//             <Link to={`/upload/${p.project_id}`}>Upload Images</Link>
//           </li>
//         ))}
//       </ul>
//       <h2>Create New Project</h2>
//       <form onSubmit={handleCreate}>
//         <div>
//           <label>Project Name:</label>
//           <input
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Description:</label>
//           <input
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />
//         </div>
//         <button type="submit">Create Project</button>
//       </form>
//     </div>
//   );
// }

// export default ProjectList;
// import React, { useEffect, useState } from "react";
// import { getProjects, createProject } from "../api";
// import { Link } from "react-router-dom";

// function ProjectList() {
//   const [projects, setProjects] = useState([]);
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");

//   useEffect(() => {
//     getProjects().then(setProjects); // Fetch projects and set state
//   }, []);

//   const handleCreate = async (e) => {
//     e.preventDefault();
//     const newProject = await createProject(name, description);
//     setProjects([...projects, newProject]); // Add the new project to the list
//     setName("");
//     setDescription("");
//   };

//   return (
//     <div className="container">
//       <h1>Projects</h1>
//       <ul>
//         {projects.map((p) => (
//           <li key={p.project_id} style={{ marginBottom: "15px" }}>
//             <strong>{p.name}</strong> - {p.description}
//             <div style={{ marginTop: "5px" }}>
//               {/* Upload Images Link */}
//               <Link to={`/upload/${p.project_id}`}>
//                 <button style={buttonStyle}>Upload Images</button>
//               </Link>
//               {/* Annotate Link */}
//               <Link to={`/annotate/${p.project_id}`}>
//                 <button style={buttonStyle}>Annotate</button>
//               </Link>
//               {/* View Annotations Link */}
//               <Link to={`/annotations/${p.project_id}`}>
//                 <button style={buttonStyle}>View Annotations</button>
//               </Link>
//             </div>
//           </li>
//         ))}
//       </ul>

//       {/* Form to Create New Projects */}
//       <h2>Create New Project</h2>
//       <form onSubmit={handleCreate}>
//         <div>
//           <label>Project Name:</label>
//           <input
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Description:</label>
//           <input
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />
//         </div>
//         <button type="submit" style={buttonStyle}>
//           Create Project
//         </button>
//       </form>
//     </div>
//   );
// }

// const buttonStyle = {
//   marginRight: "10px",
//   padding: "8px 12px",
//   backgroundColor: "#007bff",
//   color: "#fff",
//   border: "none",
//   borderRadius: "5px",
//   cursor: "pointer",
// };

// export default ProjectList;
import React, { useEffect, useState } from "react";
import { getProjects, createProject } from "../api";
import { Link } from "react-router-dom";

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [annotations, setAnnotations] = useState({}); // Store annotations per project
  const [loadingProject, setLoadingProject] = useState(null); // Track loading per project

  useEffect(() => {
    getProjects().then(setProjects);
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    const newProject = await createProject(name, description);
    setProjects([...projects, newProject]);
    setName("");
    setDescription("");
  };

  // Fetch annotations for a specific project
  const fetchAnnotations = async (projectId) => {
    setLoadingProject(projectId);
    try {
      const response = await fetch(
        `https://labelbox.onrender.com/annotations?project_id=${projectId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch annotations");
      }
      const data = await response.json();
      setAnnotations((prev) => ({ ...prev, [projectId]: data }));
    } catch (err) {
      console.error(
        `Error fetching annotations for project ${projectId}:`,
        err
      );
    } finally {
      setLoadingProject(null);
    }
  };

  return (
    <div className="container">
      <h1>Projects</h1>
      <ul>
        {projects.map((p) => (
          <li key={p.project_id} style={{ marginBottom: "20px" }}>
            <strong>{p.name}</strong> - {p.description}{" "}
            <div style={{ marginTop: "10px" }}>
              <Link to={`/annotate/${p.project_id}`}>
                <button style={{ marginRight: "10px" }}>Annotate</button>
              </Link>
              <Link to={`/upload/${p.project_id}`}>
                <button style={{ marginRight: "10px" }}>Upload Images</button>
              </Link>
              <button
                onClick={() => fetchAnnotations(p.project_id)}
                style={{
                  marginRight: "10px",
                  backgroundColor: "#28a745",
                  color: "white",
                  border: "none",
                  padding: "5px 10px",
                  cursor: "pointer",
                }}
              >
                {loadingProject === p.project_id
                  ? "Loading..."
                  : "View Annotations"}
              </button>
            </div>
            {/* Display Annotations */}
            {annotations[p.project_id] && (
              <div style={{ marginTop: "15px" }}>
                <h4>Annotations:</h4>
                {annotations[p.project_id].length > 0 ? (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fill, minmax(200px, 1fr))",
                      gap: "10px",
                    }}
                  >
                    {annotations[p.project_id].map((annotation) => (
                      <div
                        key={annotation.annotation_id}
                        style={{ textAlign: "center" }}
                      >
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
                        <p>Annotation ID: {annotation.annotation_id}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No annotations available for this project.</p>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>

      <h2>Create New Project</h2>
      <form onSubmit={handleCreate}>
        <div>
          <label>Project Name:</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit">Create Project</button>
      </form>
    </div>
  );
}

export default ProjectList;
