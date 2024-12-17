export const BACKEND_URL = "https://labelbox.onrender.com"; // Change this to your deployed backend URL

// Projects
export async function getProjects() {
  const res = await fetch(`${BACKEND_URL}/projects`);
  return res.json();
}

export async function createProject(name, description) {
  const res = await fetch(`${BACKEND_URL}/projects`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, description }),
  });
  return res.json();
}

// Images
export async function getImages(projectId) {
  const res = await fetch(`${BACKEND_URL}/images?project_id=${projectId}`);
  return res.json();
}

export async function uploadImage(projectId, file) {
  const formData = new FormData();
  formData.append("project_id", projectId);
  formData.append("file", file);
  const res = await fetch(`${BACKEND_URL}/images/upload`, {
    method: "POST",
    body: formData,
  });
  return res.json();
}

// Annotations
export async function createAnnotation(imageId, annotationData) {
  const res = await fetch(`${BACKEND_URL}/annotations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      image_id: imageId,
      annotation_data: annotationData,
    }),
  });
  return res.json();
}

export async function getAnnotatedImages(projectId) {
  const response = await fetch(
    `${BACKEND_URL}/annotations?project_id=${projectId}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch annotated images");
  }
  return await response.json();
}
