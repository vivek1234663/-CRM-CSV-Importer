import { GoogleGenAI } from "@google/genai";
import { CRM_PROMPT } from "../prompts/crm.prompt";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("❌ GEMINI_API_KEY is missing in .env");
}

const ai = new GoogleGenAI({ apiKey });

// Batch size (10 is safe for Gemini)
const BATCH_SIZE = 10;

// Retry failed batch
const MAX_RETRIES = 3;

// Delay helper
function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Extract JSON safely from Gemini response
 */
function extractJSON(text: string) {
  text = text
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  // Direct JSON
  try {
    return JSON.parse(text);
  } catch {}

  // JSON Array
  const arrayMatch = text.match(/\[[\s\S]*\]/);

  if (arrayMatch) {
    return JSON.parse(arrayMatch[0]);
  }

  // JSON Object
  const objectMatch = text.match(/\{[\s\S]*\}/);

  if (objectMatch) {
    const obj = JSON.parse(objectMatch[0]);

    if (obj.records && Array.isArray(obj.records)) {
      return obj.records;
    }

    return [obj];
  }

  throw new Error("No valid JSON found in Gemini response.");
}

/**
 * Create prompt for one batch
 */
function createPrompt(batch: any[]) {
  return `
${CRM_PROMPT}

CSV Records:

${JSON.stringify(batch, null, 2)}

IMPORTANT RULES:

1. Return EXACTLY ${batch.length} JSON objects.

2. Maintain the SAME order as input.

3. Never merge records.

4. Never remove records.

5. Skip ONLY if BOTH email AND mobile number are missing.

6. Return ONLY valid JSON.

7. Do NOT use markdown.

8. Do NOT explain anything.

9. Do NOT wrap JSON inside text.

10. Output MUST be a JSON array only.
`;
}

/**
 * Process one batch using Gemini
 */
async function processBatch(batch: any[], batchNo: number) {
  const prompt = createPrompt(batch);

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      console.log("\n======================================");
      console.log(`🚀 Batch ${batchNo}`);
      console.log(`🔄 Attempt : ${attempt}`);
      console.log(`📥 Input Records : ${batch.length}`);
      console.log("======================================");

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          temperature: 0,
          maxOutputTokens: 8192,
        },
      });

      console.log(
        "Finish Reason:",
        response.candidates?.[0]?.finishReason ?? "Unknown"
      );

      console.log(
        "Usage:",
        JSON.stringify(response.usageMetadata, null, 2)
      );

      let text = response.text ?? "";

if (!text && response.candidates?.length) {
  text =
    response.candidates[0]?.content?.parts
      ?.map((part: any) => part.text ?? "")
      .join("") ?? "";
}

      console.log("\n========== RAW GEMINI RESPONSE ==========");
      console.log(text);
      console.log("=========================================");

      if (!text.trim()) {
        throw new Error("Gemini returned an empty response.");
      }

      let parsed = extractJSON(text);

      if (!Array.isArray(parsed)) {
        parsed = [parsed];
      }

      console.log(`📤 Output Records : ${parsed.length}`);

      // Warn if counts don't match
      if (parsed.length !== batch.length) {
        console.warn(
          `⚠️ Record mismatch! Input=${batch.length}, Output=${parsed.length}`
        );
      }

      // Normalize all records to include the expected fields
      const normalized = parsed.map((row: any) => ({
        created_at: row.created_at ?? "",
        name: row.name ?? "",
        email: row.email ?? "",
        country_code: row.country_code ?? "",
        mobile_without_country_code:
          row.mobile_without_country_code ?? "",
        company: row.company ?? "",
        city: row.city ?? "",
        state: row.state ?? "",
        country: row.country ?? "",
        lead_owner: row.lead_owner ?? "",
        crm_status: row.crm_status ?? "",
        crm_note: row.crm_note ?? "",
        data_source: row.data_source ?? "",
        possession_time: row.possession_time ?? "",
        description: row.description ?? "",
      }));

      console.log(
        `✅ Batch ${batchNo} Success (${normalized.length} records)`
      );

      return normalized;
    } catch (err: any) {
      console.error(
        `❌ Batch ${batchNo} Attempt ${attempt} Failed`
      );
      console.error(err.message);

      if (attempt === MAX_RETRIES) {
        throw err;
      }

      console.log("⏳ Retrying in 2 seconds...");
      await sleep(2000);
    }
  }

  return [];
}
/**
 * Process complete CSV in batches
 */
export async function processWithAI(rows: any[]) {
  console.log("\n========================================");
  console.log("🚀 AI Processing Started");
  console.log("========================================");
  console.log(`📊 Total Input Records : ${rows.length}`);
  console.log(`📦 Batch Size          : ${BATCH_SIZE}`);

  const totalBatches = Math.ceil(rows.length / BATCH_SIZE);

  const finalResult: any[] = [];
  const failedBatches: number[] = [];

  for (let i = 0; i < rows.length; i += BATCH_SIZE) {
    const batchNo = Math.floor(i / BATCH_SIZE) + 1;

    const batch = rows.slice(i, i + BATCH_SIZE);

    console.log(
      `\n============= Processing Batch ${batchNo}/${totalBatches} =============`
    );

    try {
      const result = await processBatch(batch, batchNo);

      finalResult.push(...result);

      console.log(`✅ Batch ${batchNo} Completed`);
      console.log(`📥 Input  : ${batch.length}`);
      console.log(`📤 Output : ${result.length}`);

      if (batch.length !== result.length) {
        console.warn(
          `⚠️ Batch ${batchNo}: Input (${batch.length}) != Output (${result.length})`
        );
      }

      console.log(
        `📈 Overall Progress: ${Math.min(
          i + batch.length,
          rows.length
        )}/${rows.length} records`
      );

      // Small delay to reduce rate-limit risk
      await sleep(500);

    } catch (err: any) {
      console.error(`❌ Batch ${batchNo} Failed`);
      console.error(err.message);

      failedBatches.push(batchNo);

      // Continue with next batch
      continue;
    }
  }

  console.log("\n========================================");
  console.log("🎉 AI Processing Finished");
  console.log("========================================");
  console.log(`📥 Total Input Records : ${rows.length}`);
  console.log(`📤 Total Output Records: ${finalResult.length}`);
  console.log(`❌ Failed Batches      : ${failedBatches.length}`);

  if (failedBatches.length > 0) {
    console.log(
      `Failed Batch Numbers: ${failedBatches.join(", ")}`
    );
  }

  return {
    success: true,
    totalRecords: rows.length,
    imported: finalResult.length,
    skipped: rows.length - finalResult.length,
    failedBatches,
    data: finalResult,
  };
}
