import { GoogleGenAI, Type, type Schema } from "@google/genai";

const MODEL = "gemini-2.5-flash";

let client: GoogleGenAI | null = null;

function getClient() {
  if (!client) {
    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      throw new Error("GOOGLE_API_KEY is not set. Add it to learning-dashboard/.env.local");
    }
    client = new GoogleGenAI({ apiKey });
  }
  return client;
}

export async function generateStructured<T>(params: {
  systemInstruction: string;
  prompt: string;
  responseSchema: Schema;
}): Promise<T> {
  const response = await getClient().models.generateContent({
    model: MODEL,
    contents: params.prompt,
    config: {
      systemInstruction: params.systemInstruction,
      responseMimeType: "application/json",
      responseSchema: params.responseSchema
    }
  });

  const text = response.text;
  if (!text) {
    throw new Error("Gemini returned an empty response");
  }

  return JSON.parse(text) as T;
}

export { Type };
