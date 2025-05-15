// lib/promptTemplate.ts

/**
 * Assembles a full prompt from individual components
 */
export const buildStandardPrompt = ({
  type,
  style,
  genre,
  medium,
  context,
  resolution,
  quality,
  text
}: {
  type: string;
  style?: string;
  genre?: string;
  medium?: string;
  context?: string;
  resolution: string;
  quality: string;
  text?: string;
}): string => {
  // Start with style (if any) and type
  let prompt = `A ${style ? style.toLowerCase() + ' ' : ''}`;
  prompt += `${type.toLowerCase()}`;
  
  // Add genre if provided
  if (genre) {
    prompt += ` in ${genre.toLowerCase()} genre`;
  }
  
  // Add medium if provided
  if (medium) {
    prompt += `, ${medium.toLowerCase()} medium`;
  }
  
  // Add context if provided
  if (context) {
    prompt += `, ${context.toLowerCase()}`;
  }
  
  // Add text if provided
  if (text) {
    prompt += `. Add text: '${text}'`;
  }
  
  // Add technical specifications
  prompt += `. Resolution: ${resolution}, Quality: ${quality}.`;
  
  return prompt;
};

/**
 * Add additional image generation parameters for OpenAI
 */
export const enhancePromptForOpenAI = (
  basePrompt: string,
  quality: string
): string => {
  // Quality-specific enhancements
  let enhancedPrompt = basePrompt;
  
  switch (quality) {
    case 'High':
      enhancedPrompt += ' High detail, professional quality, clean lines, sharp image.';
      break;
    case 'Medium':
      enhancedPrompt += ' Good detail, clear image.';
      break;
    case 'Low':
      // No enhancement needed for low quality
      break;
    default:
      // No enhancement for unknown quality
      break;
  }
  
  // Common enhancements for all stickers
  enhancedPrompt += ' Suitable for use as a sticker, with clean edges. Centered subject.';
  
  return enhancedPrompt;
};

/**
 * Map our quality levels to OpenAI's model parameters
 */
export const qualityToModelParams = (quality: string): { model: string; quality?: string } => {
  switch (quality) {
    case 'High':
      return {
        model: 'gpt-image-1',
        quality: 'hd'
      };
    case 'Medium':
      return {
        model: 'gpt-image-1',
        quality: 'standard'
      };
    case 'Low':
    default:
      return {
        model: 'gpt-image-1-standard',
      };
  }
};