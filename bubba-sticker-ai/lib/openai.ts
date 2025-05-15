// lib/openai.ts
import { functions } from './firebase';
import { httpsCallable } from 'firebase/functions';

interface GenerateImageParams {
  prompt: string;
  resolution: string;
  quality: 'Low' | 'Medium' | 'High';
}

interface GenerateImageResult {
  imageUrl: string;
  cost: number;
  prompt: string;
  resolution: string;
  quality: string;
  generatedAt: string;
}

/**
 * Generate an AI sticker image using OpenAI's gpt-image-1 model
 * This is called via a secure Firebase Cloud Function
 */
export const generateStickerImage = async (
  params: GenerateImageParams
): Promise<GenerateImageResult> => {
  try {
    // Call the Firebase function
    const generateImageFunction = httpsCallable<GenerateImageParams, GenerateImageResult>(
      functions, 
      'generateStickerImage'
    );
    
    const result = await generateImageFunction(params);
    
    return result.data;
  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
};

/**
 * Calculate the cost of generating an image based on quality and resolution
 */
export const calculateImageCost = (quality: string, resolution: string): number => {
  const costMatrix = {
    Low: {
      '512x512': 0.005,
      '1024x1024': 0.008,
      '1024x1536': 0.010,
      '1536x1024': 0.010
    },
    Medium: {
      '512x512': 0.018,
      '1024x1024': 0.024,
      '1024x1536': 0.032,
      '1536x1024': 0.032
    },
    High: {
      '512x512': 0.080,
      '1024x1024': 0.120,
      '1024x1536': 0.160,
      '1536x1024': 0.160
    }
  };
  
  return costMatrix[quality]?.[resolution] || costMatrix.Medium['1024x1024'];
};