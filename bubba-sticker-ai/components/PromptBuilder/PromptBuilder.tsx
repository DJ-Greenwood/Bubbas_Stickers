'use client';

import { useState, useEffect } from 'react';
import DropdownField from './DropdownField';
import { promptOptions } from './OptionList';

export default function PromptBuilder() {
  const [selectedOptions, setSelectedOptions] = useState({
    type: '',
    style: '',
    genre: '',
    medium: '',
    context: '',
    resolution: '1024x1024', // Default resolution
    quality: 'Medium', // Default quality
    text: '',
  });

  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [remainingCredits, setRemainingCredits] = useState(3); // Example for free tier
  
  // Update the prompt whenever selections change
  useEffect(() => {
    const buildPrompt = () => {
      if (!selectedOptions.type) return '';
      
      let prompt = `A ${selectedOptions.style ? selectedOptions.style.toLowerCase() + ' ' : ''}`;
      
      // Add the main subject (type)
      prompt += `${selectedOptions.type.toLowerCase()}`;
      
      // Add genre if selected
      if (selectedOptions.genre) {
        prompt += ` in ${selectedOptions.genre.toLowerCase()} genre`;
      }
      
      // Add medium if selected
      if (selectedOptions.medium) {
        prompt += `, ${selectedOptions.medium.toLowerCase()} medium`;
      }
      
      // Add context if selected
      if (selectedOptions.context) {
        prompt += `, ${selectedOptions.context.toLowerCase()}`;
      }
      
      // Add text if provided
      if (selectedOptions.text) {
        prompt += `. Add text: '${selectedOptions.text}'`;
      }
      
      // Add technical specifications
      prompt += `. Resolution: ${selectedOptions.resolution}, Quality: ${selectedOptions.quality}.`;
      
      return prompt;
    };
    
    setGeneratedPrompt(buildPrompt());
  }, [selectedOptions]);
  
  const handleOptionChange = (category, value) => {
    setSelectedOptions(prev => ({
      ...prev,
      [category]: value
    }));
  };
  
  const handleTextChange = (e) => {
    setSelectedOptions(prev => ({
      ...prev,
      text: e.target.value
    }));
  };
  
  const handleGenerate = async () => {
    if (!selectedOptions.type) {
      alert('Please select at least a Type for your sticker');
      return;
    }
    
    if (remainingCredits <= 0) {
      alert('You have no remaining credits. Please upgrade your plan.');
      return;
    }
    
    setIsGenerating(true);
    
    try {
      // This would normally call your Firebase function
      console.log('Generating image with prompt:', generatedPrompt);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update remaining credits
      setRemainingCredits(prev => prev - 1);
      
      // Update the parent component with the new image URL
      // onImageGenerated(imageUrl);
    } catch (error) {
      console.error('Error generating image:', error);
      alert('Error generating your sticker. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };
  
  return (
    <div className="card space-y-4">
      <DropdownField
        label="Type"
        options={promptOptions.type}
        value={selectedOptions.type}
        onChange={(value) => handleOptionChange('type', value)}
        placeholder="Select a type..."
        required
      />
      
      <DropdownField
        label="Style"
        options={promptOptions.style}
        value={selectedOptions.style}
        onChange={(value) => handleOptionChange('style', value)}
        placeholder="Select a style..."
      />
      
      <DropdownField
        label="Genre"
        options={promptOptions.genre}
        value={selectedOptions.genre}
        onChange={(value) => handleOptionChange('genre', value)}
        placeholder="Select a genre..."
      />
      
      <DropdownField
        label="Medium"
        options={promptOptions.medium}
        value={selectedOptions.medium}
        onChange={(value) => handleOptionChange('medium', value)}
        placeholder="Select a medium..."
      />
      
      <DropdownField
        label="Context"
        options={promptOptions.context}
        value={selectedOptions.context}
        onChange={(value) => handleOptionChange('context', value)}
        placeholder="Select a context..."
      />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <DropdownField
          label="Resolution"
          options={promptOptions.resolution}
          value={selectedOptions.resolution}
          onChange={(value) => handleOptionChange('resolution', value)}
        />
        
        <DropdownField
          label="Quality"
          options={promptOptions.quality}
          value={selectedOptions.quality}
          onChange={(value) => handleOptionChange('quality', value)}
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">
          Optional Text
        </label>
        <input
          type="text"
          value={selectedOptions.text}
          onChange={handleTextChange}
          placeholder="Add text to your sticker..."
          className="input-field"
          maxLength={50}
        />
      </div>
      
      <div className="pt-2">
        <label className="block text-sm font-medium text-foreground mb-2">
          Generated Prompt
        </label>
        <div className="p-3 bg-background-light rounded-lg border border-muted text-foreground/80 min-h-[80px]">
          {generatedPrompt || 'Start selecting options to build your prompt...'}
        </div>
      </div>
      
      <div className="pt-4">
        <button
          onClick={handleGenerate}
          disabled={isGenerating || !selectedOptions.type}
          className="btn-primary w-full flex justify-center items-center"
        >
          {isGenerating ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </>
          ) : (
            <>Generate Sticker ({remainingCredits} credits left)</>
          )}
        </button>
      </div>
    </div>
  );
}