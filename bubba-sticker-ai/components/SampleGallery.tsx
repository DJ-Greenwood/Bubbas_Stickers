'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Sample sticker data
const sampleStickers = [
  {
    id: 'cyberpunk-dog',
    imageUrl: '/sample-images/cyberpunk-dog.png',
    title: 'Cyberpunk Dog',
    prompt: 'A cute dog in cyberpunk genre, digital painting medium, wearing sunglasses. Resolution: 1024x1024, Quality: High.',
  },
  {
    id: 'watercolor-cat',
    imageUrl: '/sample-images/watercolor-cat.png',
    title: 'Watercolor Cat',
    prompt: 'A cute cat in slice-of-life genre, watercolor medium, standing in the rain. Add text: "Purr-fect Day". Resolution: 1024x1024, Quality: High.',
  },
  {
    id: 'fantasy-robot',
    imageUrl: '/sample-images/fantasy-robot.png',
    title: 'Fantasy Robot',
    prompt: 'A minimalist robot in fantasy genre, pencil sketch medium, surrounded by stars. Resolution: 1024x1024, Quality: Medium.',
  },
  {
    id: 'scifi-landscape',
    imageUrl: '/sample-images/scifi-landscape.png',
    title: 'Sci-Fi Landscape',
    prompt: 'A hyper-realistic scene in sci-fi genre, digital painting medium, with a rainbow background. Resolution: 1536x1024, Quality: High.',
  },
  {
    id: 'cute-food',
    imageUrl: '/sample-images/cute-food.png',
    title: 'Cute Food',
    prompt: 'A cute food in cartoon style, digital painting medium, with sparkles. Add text: "Yum!". Resolution: 1024x1024, Quality: Medium.',
  },
  {
    id: 'retro-vehicle',
    imageUrl: '/sample-images/retro-vehicle.png',
    title: 'Retro Vehicle',
    prompt: 'A retro vehicle in vaporwave style, 3D render medium, on a beach. Resolution: 1024x1024, Quality: High.',
  },
];

export default function SampleGallery() {
  const [activeSticker, setActiveSticker] = useState<string | null>(null);
  
  const handleStickerClick = (id: string) => {
    setActiveSticker(id === activeSticker ? null : id);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {sampleStickers.map((sticker) => (
          <div 
            key={sticker.id}
            className="card p-4 transition-all duration-200 hover:shadow-lg cursor-pointer"
            onClick={() => handleStickerClick(sticker.id)}
          >
            <div className="aspect-square relative mb-3 rounded-lg overflow-hidden bg-background-light">
              <div className="absolute inset-0 flex items-center justify-center">
                {/* This would be a real image in production */}
                <div className="w-3/4 h-3/4 rounded-full bg-gradient-to-br from-primary/20 to-accent/30 flex items-center justify-center text-4xl font-bold text-primary/40">
                  {sticker.title.substring(0, 1)}
                </div>
              </div>
            </div>
            
            <h3 className="font-medium text-lg truncate">{sticker.title}</h3>
            
            {activeSticker === sticker.id && (
              <div className="mt-3 text-sm text-foreground/70">
                <p className="mb-2">{sticker.prompt}</p>
                <Link
                  href={`/gallery/${sticker.id}`}
                  className="text-primary font-medium hover:underline"
                >
                  View details
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <Link href="/gallery" className="btn-secondary">
          View All Stickers
        </Link>
      </div>
    </div>
  );
}