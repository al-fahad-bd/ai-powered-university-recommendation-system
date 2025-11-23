
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
      
      **Academic Background:**
      - Target Degree: ${profile.level}
      - Subject of Interest: ${profile.subject}
      - Current GPA: ${profile.gpa}
      - IELTS Score: ${profile.ielts}
      - Graduation Year: ${profile.gradYear || "Not specified"}

      **Professional & Research Background:**
      - Research/Projects: ${profile.researchExp || "None"}
      - Work Experience: ${profile.workExp || "None"}

      **Preferences:**
      - Target Country: ${profile.country}
      - Annual Budget: ${profile.budget}

      Please search the web for the LATEST available data (2024-2025) and recommend 4 universities that are a realistic match for this profile.
      
      **Formatting Instructions (CRITICAL):**
      - Do NOT wrap the response in a code block.
      - Start immediately with the first university.
      - Separate each university using a horizontal rule exactly like this: "---"
      - After the last university, add "---" and then provide a "### Summary" section.
      
      **For each university, strictly follow this format:**
      ### [University Name]
      **Location:** [City, Country]
      **Tuition:** [Approximate fees per year]
      **Acceptance Rate:** [Approximate rate]
      **Website:** [Official website URL]
      
      **Why it's a match:**
      [A concise paragraph explaining why this university fits the student's profile, specifically referencing their GPA, work experience, or research.]

      **Example:**
      ### University of Tech
      **Location:** City, Country
      **Tuition:** $20,000/year
      **Acceptance Rate:** 15%
      **Website:** https://www.uni.edu
      
      **Why it's a match:**
      ...
      ---
      ### Next University...
    `;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }], // Enable Search Grounding
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
