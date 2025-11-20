import { GoogleGenAI } from "@google/genai";
import { StudentProfile, AIRecommendationResult } from '../types';

// Initialize Gemini Client
// NOTE: process.env.API_KEY is injected by the environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getUniversityRecommendations = async (profile: StudentProfile): Promise<AIRecommendationResult> => {
  try {
    const modelId = 'gemini-2.5-flash';
    
    const prompt = `
      Act as an expert university admissions counselor.
      I have a student with the following profile:
      - Target Degree: ${profile.level}
      - Subject of Interest: ${profile.subject}
      - Target Country: ${profile.country}
      - Current GPA: ${profile.gpa}
      - IELTS Score: ${profile.ielts}
      - Annual Budget: ${profile.budget}

      Please search the web for the LATEST available data (2024-2025) and recommend 3-5 universities that are a realistic match for this profile.
      
      For each university, provide:
      1. University Name
      2. Location
      3. Approximate Tuition Fees (for international students)
      4. Acceptance Rate (estimated)
      5. Why it's a good fit for this specific student profile (mention GPA/IELTS requirements if found).

      Format the output cleanly using Markdown. Use bolding for keys (e.g., **Tuition:**).
      Provide a concluding summary advice for the student.
    `;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }], // Enable Search Grounding
        // NOTE: responseMimeType and responseSchema are NOT allowed with googleSearch
      },
    });

    const markdownText = response.text || "No recommendations found. Please try refining your search.";
    
    // Extract grounding chunks for sources
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    
    const sources = groundingChunks
      .filter((chunk: any) => chunk.web?.uri && chunk.web?.title)
      .map((chunk: any) => ({
        title: chunk.web.title,
        uri: chunk.web.uri
      }));

    // Remove duplicates based on URI
    const uniqueSources = sources.filter((source, index, self) =>
      index === self.findIndex((t) => (
        t.uri === source.uri
      ))
    );

    return {
      markdownText,
      sources: uniqueSources
    };

  } catch (error) {
    console.error("Error fetching recommendations:", error);
    throw new Error("Failed to generate recommendations. Please check your API key or internet connection.");
  }
};
