import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { SEO } from '@/components/SEO';

// This would normally come from your database
const stickers = {
  'cyberpunk-dog': {
    title: 'Cyberpunk Dog',
    prompt: 'A cute dog in cyberpunk genre, digital painting medium, wearing sunglasses. Resolution: 1024x1024, Quality: High.',
    imageUrl: '/sample-images/cyberpunk-dog.png',
    creator: 'BubbaSticker Team',
    createdAt: '2023-08-15',
    tags: ['dog', 'cyberpunk', 'digital painting', 'cute']
  },
  'watercolor-cat': {
    title: 'Watercolor Cat',
    prompt: 'A cute cat in slice-of-life genre, watercolor medium, standing in the rain. Add text: "Purr-fect Day". Resolution: 1024x1024, Quality: High.',
    imageUrl: '/sample-images/watercolor-cat.png',
    creator: 'BubbaSticker Team',
    createdAt: '2023-08-14',
    tags: ['cat', 'watercolor', 'slice-of-life', 'rain']
  },
  // Add more as needed
};

// Generate metadata for the page
export async function generateMetadata({ params }) {
  const { id } = params;
  const sticker = stickers[id];
  
  if (!sticker) {
    return {
      title: 'Sticker Not Found - BubbaSticker.AI',
      description: 'The requested sticker could not be found.',
    };
  }
  
  return {
    title: `${sticker.title} - BubbaSticker.AI Gallery`,
    description: sticker.prompt,
    openGraph: {
      images: [sticker.imageUrl],
    },
  };
}

export default function StickerPage({ params }) {
  const { id } = params;
  const sticker = stickers[id];
  
  if (!sticker) {
    notFound();
  }
  
  // Schema data for this specific sticker
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    'name': sticker.title,
    'description': sticker.prompt,
    'contentUrl': `https://bubbasticker.ai${sticker.imageUrl}`,
    'dateCreated': sticker.createdAt,
    'creator': {
      '@type': 'Organization',
      'name': sticker.creator
    },
    'keywords': sticker.tags.join(', ')
  };
  
  return (
    <>
      <SEO 
        title={`${sticker.title} - BubbaSticker.AI Gallery`}
        description={sticker.prompt}
        ogImage={`https://bubbasticker.ai${sticker.imageUrl}`}
        ogType="article"
        schemaData={schemaData}
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <nav className="flex mb-6 text-sm text-foreground/70">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/gallery" className="hover:text-primary">Gallery</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground/90">{sticker.title}</span>
          </nav>
          
          <div className="glass-panel p-6 md:p-8">
            <h1 className="text-3xl font-bold mb-2">{sticker.title}</h1>
            <div className="flex items-center text-sm text-foreground/70 mb-6">
              <span>Created by {sticker.creator}</span>
              <span className="mx-2">•</span>
              <span>{sticker.createdAt}</span>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="image-preview-container aspect-square bg-background-light rounded-xl flex items-center justify-center">
                <div className="relative w-full h-full">
                  {/* This would be a real image in production */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-3/4 h-3/4 rounded-full bg-gradient-to-br from-primary/20 to-accent/30"></div>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-2">Prompt</h2>
                  <div className="p-4 bg-background-light rounded-lg text-foreground/80">
                    {sticker.prompt}
                  </div>
                </div>
                
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-2">Tags</h2>
                  <div className="flex flex-wrap gap-2">
                    {sticker.tags.map(tag => (
                      <span 
                        key={tag} 
                        className="px-3 py-1 bg-background-light rounded-full text-sm text-foreground/80"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/#generator" className="btn-primary flex-1 text-center">
                    Create Similar Sticker
                  </Link>
                  <button className="btn-secondary flex-1">
                    Download Image
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(stickers)
                .filter(([key]) => key !== id)
                .slice(0, 4)
                .map(([key, relatedSticker]) => (
                  <Link 
                    key={key} 
                    href={`/gallery/${key}`}
                    className="card p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="aspect-square relative mb-2 rounded-lg overflow-hidden bg-background-light">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-2/3 h-2/3 rounded-full bg-gradient-to-br from-primary/10 to-accent/20"></div>
                      </div>
                    </div>
                    <h3 className="font-medium truncate">{relatedSticker.title}</h3>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}