import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SEO } from '@/components/SEO';

// This would normally come from your CMS or database
const articles = {
  'getting-started': {
    title: 'Getting Started with BubbaSticker.AI',
    description: 'Learn how to create your first AI-generated sticker in minutes.',
    image: '/blog/getting-started.jpg',
    publishedAt: '2023-08-10',
    readTime: 4,
    category: 'Beginner Guide',
    content: `
      <h2>Welcome to BubbaSticker.AI!</h2>
      <p>Creating custom stickers with AI has never been easier. In this guide, we'll walk you through the basics of using BubbaSticker.AI to create your first AI-generated sticker.</p>

      <h3>1. Choose Your Sticker Type</h3>
      <p>Start by selecting what kind of sticker you want to create. You can choose from characters, animals, objects, scenes, and more. This forms the base of your sticker.</p>

      <h3>2. Select a Style</h3>
      <p>Next, pick a visual style for your sticker. Options range from cute and minimalist to grunge and hyper-realistic. The style dramatically changes how your sticker will look.</p>

      <h3>3. Pick a Genre (Optional)</h3>
      <p>Choose a genre to give your sticker a specific thematic feel. Fantasy, sci-fi, slice-of-life, and cyberpunk are just a few of the options available.</p>

      <h3>4. Select Medium</h3>
      <p>The medium determines the artistic technique used to create your sticker. Options include watercolor, digital painting, pencil sketch, and 3D render.</p>

      <h3>5. Add Context</h3>
      <p>Further customize your sticker by selecting a context or situation. This could be "wearing sunglasses," "standing in the rain," or "surrounded by stars."</p>

      <h3>6. Choose Resolution and Quality</h3>
      <p>Select your desired resolution and quality. Higher quality images use more credits but produce more detailed results.</p>

      <h3>7. Add Optional Text</h3>
      <p>If you want text on your sticker, enter it in the optional text field. This is great for creating message stickers or branded content.</p>

      <h3>8. Generate Your Sticker</h3>
      <p>Click the "Generate Sticker" button and watch as AI creates your custom sticker based on your selections.</p>

      <h3>9. Download or Save</h3>
      <p>Once generated, you can download your sticker or save it to your account for later use.</p>

      <h2>Tips for Better Results</h2>
      <ul>
        <li>Be specific with your selections</li>
        <li>Experiment with different combinations</li>
        <li>Higher quality settings work best for detailed stickers</li>
        <li>Try different styles to see what works best for your concept</li>
      </ul>

      <h2>Ready to Create?</h2>
      <p>Now that you understand the basics, it's time to create your first sticker! Head to the generator and start experimenting.</p>
    `,
    relatedArticles: ['prompt-engineering', 'style-guide', 'faq']
  },
  'prompt-engineering': {
    title: 'Prompt Engineering for Sticker Art',
    description: 'Learn the art of crafting effective prompts to get the best results from AI image generation.',
    image: '/blog/prompt-engineering.jpg',
    publishedAt: '2023-08-12',
    readTime: 6,
    category: 'Advanced Techniques',
    content: `
      <h2>The Art of Prompt Engineering</h2>
      <p>Prompt engineering is the process of crafting text inputs that guide AI to generate the exact image you want. While BubbaSticker.AI simplifies this with our dropdown interface, understanding the principles can help you get better results.</p>

      <h3>Why Prompts Matter</h3>
      <p>The AI model interprets your prompt to create an image. The more clear and specific your prompt, the more likely you'll get the result you're looking for. Vague prompts lead to unpredictable results.</p>

      <h3>Building Effective Prompts</h3>
      <p>A good sticker prompt typically includes:</p>
      <ul>
        <li><strong>Subject:</strong> What the main focus of the sticker is</li>
        <li><strong>Style:</strong> The visual aesthetic (cute, realistic, etc.)</li>
        <li><strong>Medium:</strong> The artistic technique (watercolor, digital art, etc.)</li>
        <li><strong>Context:</strong> The situation or environment</li>
        <li><strong>Details:</strong> Specific features or elements to include</li>
      </ul>

      <h3>The Order Matters</h3>
      <p>The AI model reads prompts sequentially, so put the most important elements first. Start with the subject and style, then add details and context.</p>

      <h3>Advanced Techniques</h3>
      <h4>Using Keywords Effectively</h4>
      <p>Certain keywords have a strong influence on the output. Words like "cute," "detailed," "professional," and "high-quality" can significantly impact the result.</p>

      <h4>Balancing Specificity and Freedom</h4>
      <p>Be specific about what you want, but avoid over-constraining the AI. Leave room for creative interpretation where appropriate.</p>

      <h4>Iterative Refinement</h4>
      <p>If your first result isn't perfect, analyze what's missing or incorrect, then adjust your prompt accordingly.</p>

      <h3>Example Prompt Analysis</h3>
      <p>Let's break down an effective prompt:</p>
      <p>"A cute dog in cyberpunk genre, digital painting medium, wearing sunglasses. Add text: 'Stay Pawsitive'."</p>
      <ul>
        <li>Subject: "dog" (clear main subject)</li>
        <li>Style: "cute" (aesthetic direction)</li>
        <li>Genre: "cyberpunk" (thematic element)</li>
        <li>Medium: "digital painting" (artistic technique)</li>
        <li>Context/Detail: "wearing sunglasses" (specific feature)</li>
        <li>Text: "Stay Pawsitive" (overlay text)</li>
      </ul>

      <h3>Experiment and Learn</h3>
      <p>The best way to improve your prompt engineering skills is to experiment. Try different combinations and learn from the results. Over time, you'll develop an intuition for what works best.</p>
    `,
    relatedArticles: ['getting-started', 'style-guide', 'sticker-marketing']
  },
  // Add more articles as needed
};

// Generate metadata for the page
export async function generateMetadata({ params }) {
  const { slug } = params;
  const article = articles[slug];
  
  if (!article) {
    return {
      title: 'Article Not Found - BubbaSticker.AI',
      description: 'The requested article could not be found.',
    };
  }
  
  return {
    title: `${article.title} - BubbaSticker.AI Learn`,
    description: article.description,
    openGraph: {
      images: [article.image],
    },
  };
}

export default function ArticlePage({ params }) {
  const { slug } = params;
  const article = articles[slug];
  
  if (!article) {
    notFound();
  }
  
  // Schema data for this specific article
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': article.title,
    'description': article.description,
    'image': `https://bubbasticker.ai${article.image}`,
    'datePublished': article.publishedAt,
    'author': {
      '@type': 'Organization',
      'name': 'BubbaSticker.AI Team'
    }
  };
  
  return (
    <>
      <SEO 
        title={`${article.title} - BubbaSticker.AI Learn`}
        description={article.description}
        ogImage={`https://bubbasticker.ai${article.image}`}
        ogType="article"
        schemaData={schemaData}
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <nav className="flex mb-6 text-sm text-foreground/70">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/learn" className="hover:text-primary">Learn</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground/90">{article.title}</span>
          </nav>
          
          <div className="mb-8">
            <span className="inline-block bg-primary/10 text-primary rounded-full px-3 py-1 text-sm font-medium mb-4">
              {article.category}
            </span>
            <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
            <p className="text-xl text-foreground/70 mb-6">
              {article.description}
            </p>
            <div className="flex items-center text-sm text-foreground/60 mb-8">
              <span>{article.publishedAt}</span>
              <span className="mx-2">•</span>
              <span>{article.readTime} min read</span>
            </div>
            
            <div className="aspect-video bg-background-light rounded-xl mb-8 flex items-center justify-center">
              <div className="text-4xl font-bold text-primary/20">
                {article.category}
              </div>
            </div>
          </div>
          
          <div className="prose prose-lg max-w-none mb-12" dangerouslySetInnerHTML={{ __html: article.content }} />
          
          {/* CTA */}
          <div className="glass-panel p-6 text-center mb-12">
            <h2 className="text-2xl font-bold mb-4">Ready to Create Your Own Stickers?</h2>
            <Link href="/#generator" className="btn-primary">
              Try the Generator
            </Link>
          </div>
          
          {/* Related Articles */}
          {article.relatedArticles && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {article.relatedArticles.map(relatedSlug => {
                  const relatedArticle = articles[relatedSlug];
                  if (!relatedArticle) return null;
                  
                  return (
                    <Link 
                      key={relatedSlug} 
                      href={`/learn/${relatedSlug}`}
                      className="card hover:shadow-md transition-shadow"
                    >
                      <div className="aspect-video bg-background-light rounded-lg flex items-center justify-center mb-4">
                        <div className="text-xl font-bold text-primary/20">
                          {relatedArticle.category}
                        </div>
                      </div>
                      <h3 className="text-lg font-bold mb-2">{relatedArticle.title}</h3>
                      <p className="text-foreground/70 text-sm mb-2 line-clamp-2">
                        {relatedArticle.description}
                      </p>
                      <div className="text-xs text-foreground/60">
                        {relatedArticle.readTime} min read
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}