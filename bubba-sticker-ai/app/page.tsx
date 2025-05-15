import PromptBuilder from '@/components/PromptBuilder/PromptBuilder';
import ImagePreview from '@/components/ImagePreview/ImagePreview';
import PricingTable from '@/components/PricingTable';
import SampleGallery from '@/components/SampleGallery';
import '@/styles/globals.css';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <section className="mb-16 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          BubbaSticker.AI
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-foreground/80">
          Create custom AI-generated stickers for your marketing and creative projects in seconds
        </p>
        <div className="max-w-xs mx-auto">
          <a href="#generator" className="btn-primary block w-full text-center">
            Start Creating
          </a>
        </div>
      </section>

      <section id="generator" className="mb-16">
        <div className="glass-panel p-6 md:p-10 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Design Your Perfect Sticker
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Customize Your Prompt</h3>
              <PromptBuilder />
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Preview</h3>
              <ImagePreview />
            </div>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Recent Creations
        </h2>
        <SampleGallery />
      </section>

      <section id="pricing" className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Choose Your Plan
        </h2>
        <PricingTable />
      </section>

      <section className="mb-16">
        <div className="glass-panel p-6 md:p-10 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Create Amazing Stickers?</h2>
          <p className="text-lg mb-6">
            Join thousands of creators and marketers making custom stickers with AI
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="#generator" className="btn-primary">
              Start Creating Now
            </a>
            <a href="/learn/getting-started" className="btn-secondary">
              Learn More
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}