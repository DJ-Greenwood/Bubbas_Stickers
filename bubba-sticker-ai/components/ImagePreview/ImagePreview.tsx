'use client';

import { useState } from 'react';
import Image from 'next/image';
import ImageControls from './ImageControls';

interface ImagePreviewProps {
  imageUrl?: string;
  prompt?: string;
  isLoading?: boolean;
}

export default function ImagePreview({ 
  imageUrl = '', 
  prompt = '', 
  isLoading = false 
}: ImagePreviewProps) {
  const [isSaved, setIsSaved] = useState(false);
  
  const handleSave = () => {
    // This would normally save to Firestore
    setIsSaved(!isSaved);
  };

  return (
    <div className="card h-full flex flex-col">
      <div className="image-preview-container flex-grow flex items-center justify-center bg-gradient-to-br from-background-light to-white rounded-lg overflow-hidden">
        {isLoading ? (
          <div className="w-full h-full min-h-[300px] flex items-center justify-center">
            <div className="animate-pulse flex flex-col items-center">
              <svg className="w-16 h-16 text-primary/50" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="mt-4 text-lg text-foreground/80">Generating your sticker...</p>
            </div>
          </div>
        ) : imageUrl ? (
          <div className="relative w-full h-full min-h-[300px]">
            <Image
              src={imageUrl}
              alt="Generated sticker"
              fill
              className="object-contain sticker-shadow"
            />
          </div>
        ) : (
          <div className="w-full h-full min-h-[300px] flex items-center justify-center p-6">
            <div className="text-center">
              <div className="mx-auto w-24 h-24 rounded-full bg-background-light flex items-center justify-center mb-4">
                <svg className="w-12 h-12 text-primary/50" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-foreground">No sticker generated yet</h3>
              <p className="mt-2 text-foreground/70">
                Customize your prompt and click "Generate Sticker" to create a unique sticker.
              </p>
            </div>
          </div>
        )}
      </div>
      
      {imageUrl && (
        <div className="mt-4">
          <ImageControls 
            imageUrl={imageUrl} 
            isSaved={isSaved} 
            onSave={handleSave} 
          />
          
          {prompt && (
            <div className="mt-4 p-3 bg-background-light rounded-lg text-sm text-foreground/70">
              <span className="font-medium">Prompt used:</span> {prompt}
            </div>
          )}
        </div>
      )}
    </div>
  );
}