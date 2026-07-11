const API_URL = "http://localhost:5000/api";

export async function uploadCSV(file: File) {
  const formData = new FormData();

  formData.append("file", file);

  const response = await fetch(`${API_URL}/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Upload failed");
  }

  return response.json();
}

export async function processCSV(rows: any[]) {
  const response = await fetch(`${API_URL}/process`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ rows }),
  });

  if (!response.ok) {
    throw new Error("Processing failed");
  }

  return response.json();
}