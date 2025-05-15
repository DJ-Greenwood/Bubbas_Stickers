'use client';

interface ImageControlsProps {
  imageUrl: string;
  isSaved: boolean;
  onSave: () => void;
}

export default function ImageControls({
  imageUrl,
  isSaved,
  onSave
}: ImageControlsProps) {
  
  const handleDownload = () => {
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `bubbasticker-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My BubbaSticker',
          text: 'Check out this sticker I created with BubbaSticker.AI!',
          url: imageUrl,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(imageUrl);
      alert('Image URL copied to clipboard!');
    }
  };
  
  return (
    <div className="flex space-x-2">
      <button
        onClick={handleDownload}
        className="flex-1 btn-primary py-2 flex items-center justify-center"
      >
        <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        Download
      </button>
      
      <button
        onClick={onSave}
        className={`flex-1 ${isSaved ? 'btn-accent' : 'btn-secondary'} py-2 flex items-center justify-center`}
      >
        <svg 
          className="w-5 h-5 mr-2" 
          xmlns="http://www.w3.org/2000/svg" 
          fill={isSaved ? "currentColor" : "none"} 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
        {isSaved ? 'Saved' : 'Save'}
      </button>
      
      <button
        onClick={handleShare}
        className="flex-1 btn-secondary py-2 flex items-center justify-center"
      >
        <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
        Share
      </button>
    </div>
  );
}