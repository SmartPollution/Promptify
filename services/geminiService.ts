import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you might show a UI element asking the user to configure their key.
  // For this context, we assume it's set in the environment.
  console.warn("API_KEY environment variable not set. Using a placeholder which will fail.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY || 'MISSING_API_KEY' });

export const generateImage = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: prompt,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/png',
          aspectRatio: '1:1',
        },
    });

    if (response.generatedImages && response.generatedImages.length > 0 && response.generatedImages[0].image.imageBytes) {
      const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
      return `data:image/png;base64,${base64ImageBytes}`;
    } else {
      throw new Error("The API did not return an image. The prompt may have been blocked.");
    }
  } catch (error) {
    console.error("Error generating image:", error);
    if (error instanceof Error) {
        throw new Error(error.message);
    }
    throw new Error("An unknown error occurred while generating the image.");
  }
};

export const enhancePrompt = async (prompt: string): Promise<string> => {
  if (!prompt.trim()) {
    return prompt;
  }
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `User prompt: "${prompt}"`,
      config: {
        systemInstruction: "You are a creative assistant who enhances user prompts for an AI image generator. Rewrite the user's prompt to be more vivid, detailed, and imaginative. Add details about style, lighting, composition, and mood. Respond with only the enhanced prompt, without any introductory text.",
      }
    });
    
    const enhancedPrompt = response.text.trim();
    // Sometimes the model might wrap the response in quotes, so we remove them.
    return enhancedPrompt.replace(/^"(.*)"$/, '$1');

  } catch (error) {
    console.error("Error enhancing prompt:", error);
    if (error instanceof Error) {
        throw new Error(error.message);
    }
    throw new Error("An unknown error occurred while enhancing the prompt.");
  }
};
