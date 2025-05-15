import Link from 'next/link';
import { SEO } from '@/components/SEO';

// This would normally come from your CMS or database
const articles = [
  {
    slug: 'getting-started',
    title: 'Getting Started with BubbaSticker.AI',
    description: 'Learn how to create your first AI-generated sticker in minutes.',
    image: '/blog/getting-started.jpg',
    publishedAt: '2023-08-10',
    readTime: 4,
    category: 'Beginner Guide'
  },
  {
    slug: 'prompt-engineering',
    title: 'Prompt Engineering for Sticker Art',
    description: 'Learn the art of crafting effective prompts to get the best results from AI image generation.',
    image: '/blog/prompt-engineering.jpg',
    publishedAt: '2023-08-12',
    readTime: 6,
    category: 'Advanced Techniques'
  },
  {
    slug: 'sticker-marketing',
    title: 'Using AI Stickers in Your Marketing Strategy',
    description: 'Discover how custom stickers can boost engagement and brand recognition.',
    image: '/blog/sticker-marketing.jpg',
    publishedAt: '2023-08-15',
    readTime: 5,
    category: 'Marketing'
  },
  {
    slug: 'style-guide',
    title: 'Style Guide: Creating Consistent Sticker Sets',
    description: 'Tips and tricks for creating cohesive sticker collections with AI.',
    image: '/blog/style-guide.jpg',
    publishedAt: '2023-08-18',
    readTime: 7,
    category: 'Design'
  },
  {
    slug: 'api-docs',
    title: 'API Documentation for Pro Users',
    description: 'Complete reference for the BubbaSticker.AI API with code examples.',
    image: '/blog/api-docs.jpg',
    publishedAt: '2023-08-20',
    readTime: 10,
    category: 'Developer'
  },
  {
    slug: 'faq',
    title: 'Frequently Asked Questions',
    description: 'Answers to common questions about using BubbaSticker.AI.',
    image: '/blog/faq.jpg',
    publishedAt: '2023-08-22',
    readTime: 3,
    category: 'Support'
  },
];

export const metadata = {
  title: 'Learn - BubbaSticker.AI',
  description: 'Articles, guides, and tutorials to help you create amazing AI stickers.',
};

export default function LearnPage() {
  // Group articles by category
  const categories = articles.reduce<Record<string, typeof articles>>( (acc, article) => {
    if (!acc[article.category]) {
      acc[article.category] = [];
    }
    acc[article.category].push(article);
    return acc;
  }, {});
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-2 text-center">Learn</h1>
      <p className="text-xl text-foreground/70 text-center mb-12 max-w-2xl mx-auto">
        Discover articles, guides, and tutorials to help you create amazing stickers with AI
      </p>
      
      {/* Featured Article */}
      <div className="glass-panel p-6 md:p-8 mb-12">
        <div className="grid md:grid-cols-5 gap-8">
          <div className="md:col-span-3">
            <div className="text-sm font-medium text-primary mb-2">Featured Article</div>
            <h2 className="text-3xl font-bold mb-4">{articles[1].title}</h2>
            <p className="text-foreground/70 mb-6 text-lg">
              {articles[1].description}
            </p>
            <div className="flex items-center text-sm text-foreground/60 mb-6">
              <span>{articles[1].publishedAt}</span>
              <span className="mx-2">•</span>
              <span>{articles[1].readTime} min read</span>
            </div>
            <Link href={`/learn/${articles[1].slug}`} className="btn-primary inline-block">
              Read Article
            </Link>
          </div>
          <div className="md:col-span-2">
            <div className="aspect-video bg-background-light rounded-xl flex items-center justify-center">
              <div className="text-4xl font-bold text-primary/30">
                Featured
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Articles by Category */}
      {Object.entries(categories).map(([category, categoryArticles]) => (
        <div key={category} className="mb-12">
          <h2 className="text-2xl font-bold mb-6">{category}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {categoryArticles.map(article => (
              <Link 
                key={article.slug} 
                href={`/learn/${article.slug}`}
                className="card hover:shadow-md transition-shadow"
              >
                <div className="aspect-video bg-background-light rounded-xl flex items-center justify-center mb-4">
                  <div className="text-2xl font-bold text-primary/20">
                    {article.category}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">{article.title}</h3>
                <p className="text-foreground/70 mb-4 line-clamp-2">
                  {article.description}
                </p>
                <div className="flex items-center text-sm text-foreground/60">
                  <span>{article.publishedAt}</span>
                  <span className="mx-2">•</span>
                  <span>{article.readTime} min read</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
      
      {/* Newsletter Signup */}
      <div className="card p-8 text-center mb-12">
        <h2 className="text-2xl font-bold mb-2">Stay Updated</h2>
        <p className="text-foreground/70 mb-6 max-w-2xl mx-auto">
          Subscribe to our newsletter to get the latest updates, tips, and tutorials for creating amazing AI stickers.
        </p>
        <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
          <input 
            type="email" 
            placeholder="Your email address" 
            className="input-field flex-grow"
          />
          <button className="btn-primary whitespace-nowrap">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
}