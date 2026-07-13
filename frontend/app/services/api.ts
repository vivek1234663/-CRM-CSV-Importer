const API_URL = "https://crm-csv-importer-ft9h.onrender.com/api";

/**
 * Upload CSV File
 */
export async function uploadCSV(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_URL}/upload`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Upload failed");
  }

  return data;
}

/**
 * Process CSV using AI
 */
export async function processCSV(rows: any[]) {
  const controller = new AbortController();

  const timeout = setTimeout(() => {
    controller.abort();
  }, 120000); // 2 minutes

  try {
    const response = await fetch(`${API_URL}/process`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rows }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Processing failed");
    }

    return data;
  } catch (error: any) {
    clearTimeout(timeout);

    if (error.name === "AbortError") {
      throw new Error("Request timed out. Please try again.");
    }

    throw error;
  }
}