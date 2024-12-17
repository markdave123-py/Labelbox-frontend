import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProjectList from "./components/projectList";
import AnnotatedImages from "./components/AnnotatedImages";
import ImageUploader from "./components/imageUploader";
import AnnotationPage from "./components/AnnotationPage";
import "./style.css";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Projects</Link>
      </nav>
      <Routes>
        <Route path="/" element={<ProjectList />} />
        <Route path="/upload/:projectId" element={<ImageUploader />} />
        <Route path="/annotate/:projectId" element={<AnnotationPage />} />
        <Route path="/annotate/:projectId" element={<AnnotatedImages />} />
      </Routes>
    </Router>
  );
}

export default App;
