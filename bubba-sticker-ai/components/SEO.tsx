'use client';

import Head from 'next/head';
import Script from 'next/script';

interface SEOProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
  schemaData?: Record<string, any>;
}

export function SEO({
  title = 'BubbaSticker.AI - AI-Powered Custom Sticker Generator',
  description = 'Create beautiful AI-generated stickers for your marketing and creative projects in seconds.',
  canonicalUrl = 'https://bubbasticker.ai',
  ogImage = 'https://bubbasticker.ai/og-image.jpg',
  ogType = 'website',
  schemaData,
}: SEOProps) {
  // Default schema data for the software application
  const defaultSchemaData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    'name': 'BubbaSticker.AI',
    'description': 'Create custom AI-generated stickers for marketing and creative purposes.',
    'applicationCategory': 'CreativeApplication',
    'operatingSystem': 'Web',
    'offers': {
      '@type': 'Offer',
      'price': '0.00',
      'priceCurrency': 'USD'
    },
    'screenshot': 'https://bubbasticker.ai/app-screenshot.jpg',
  };

  // Merge default with custom schema if provided
  const finalSchemaData = schemaData || defaultSchemaData;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Canonical Link */}
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content={ogType} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={canonicalUrl} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content={ogImage} />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      {/* JSON-LD Schema */}
      <Script
        id="schema-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(finalSchemaData) }}
      />
    </>
  );
}