import { GoogleGenAI } from "@google/genai";
import { CRM_PROMPT } from "../prompts/crm.prompt";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is missing in .env");
}

const ai = new GoogleGenAI({
  apiKey,
});

export async function processWithAI(rows: any[]) {
  try {
    const prompt = `
${CRM_PROMPT}

Records:
${JSON.stringify(rows, null, 2)}

IMPORTANT:
Return ONLY valid JSON.
Do not return markdown.
Do not use \`\`\`json.
`;

    console.log("Sending request to Gemini...");

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const text = (response.text ?? "")
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    console.log("Gemini Response:");
    console.log(text);

    const parsed = JSON.parse(text);

    return parsed;
  } catch (err) {
    console.error("Gemini Processing Error:");
    console.error(err);

    throw err;
  }
}