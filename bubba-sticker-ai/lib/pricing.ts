// lib/pricing.ts

/**
 * Pricing and quota information for BubbaSticker.AI plans
 */

// Plans configuration
export interface Plan {
  id: string;
  name: string;
  description: string;
  price: {
    monthly: number;
    annual: number;
  };
  features: string[];
  quota: {
    amount: number;
    period: 'day' | 'month';
    quality: 'Low' | 'Medium' | 'High';
  };
  maxResolution: string;
  popularPlan?: boolean;
}

// Pricing plans
export const plans: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    description: 'Get started with basic sticker creation',
    price: {
      monthly: 0,
      annual: 0,
    },
    features: [
      '3 low-quality images per day',
      'Basic prompt options',
      'Standard resolution (512x512)',
      'Community support'
    ],
    quota: {
      amount: 3,
      period: 'day',
      quality: 'Low'
    },
    maxResolution: '512x512'
  },
  {
    id: 'plus',
    name: 'Plus',
    description: 'Perfect for occasional creators',
    price: {
      monthly: 7,
      annual: 70, // Save ~$14 with annual billing
    },
    features: [
      '30 medium-quality images per month',
      'All prompt options',
      'Higher resolutions (up to 1024x1024)',
      'Save sticker history',
      'Priority support'
    ],
    quota: {
      amount: 30,
      period: 'month',
      quality: 'Medium'
    },
    maxResolution: '1024x1024',
    popularPlan: true
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'Ideal for professional creators',
    price: {
      monthly: 20,
      annual: 190, // Save ~$50 with annual billing
    },
    features: [
      '50 high-quality images per month',
      'All prompt options',
      'Max resolution (up to 1536x1024)',
      'Commercial usage rights',
      'Bulk generation',
      'Premium support',
      'API access'
    ],
    quota: {
      amount: 50,
      period: 'month',
      quality: 'High'
    },
    maxResolution: '1536x1024'
  }
];

// Mapping from plan ID to Stripe product IDs
// These would be actual Stripe product IDs in production
export const planToStripeProducts = {
  'plus': {
    monthly: 'price_1NxYzKLkj2M3ZjZ9QwZ5bnXs', // Example Stripe price ID
    annual: 'price_1NxYzKLkj2M3ZjZ9XyZ8mnQp'   // Example Stripe price ID
  },
  'pro': {
    monthly: 'price_1NxYzKLkj2M3ZjZ9AbC7deF3', // Example Stripe price ID
    annual: 'price_1NxYzKLkj2M3ZjZ9GhI5jkL7'   // Example Stripe price ID
  }
};

// Cost per image based on quality and resolution
export const costMatrix = {
  Low: {
    '512x512': 0.005,
    '1024x1024': 0.008,
    '1024x1536': 0.010,
    '1536x1024': 0.010
  },
  Medium: {
    '512x512': 0.018,
    '1024x1024': 0.024,
    '1024x1536': 0.032,
    '1536x1024': 0.032
  },
  High: {
    '512x512': 0.080,
    '1024x1024': 0.120,
    '1024x1536': 0.160,
    '1536x1024': 0.160
  }
};

/**
 * Calculate the cost of generating an image
 */
export const calculateImageCost = (quality: 'Low' | 'Medium' | 'High', resolution: string): number => {
  return costMatrix[quality]?.[resolution] || costMatrix.Medium['1024x1024'];
};

/**
 * Get plan by ID
 */
export const getPlanById = (planId: string): Plan | undefined => {
  return plans.find(plan => plan.id === planId);
};

/**
 * Get allowed resolutions for a given plan
 */
export const getAllowedResolutionsForPlan = (planId: string): string[] => {
  const plan = getPlanById(planId);
  
  if (!plan) {
    return ['512x512']; // Default for unknown plans
  }
  
  switch (plan.quota.quality) {
    case 'Low':
      return ['512x512'];
    case 'Medium':
      return ['512x512', '1024x1024'];
    case 'High':
      return ['512x512', '1024x1024', '1024x1536', '1536x1024'];
    default:
      return ['512x512'];
  }
};

/**
 * Calculate the annual savings amount
 */
export const calculateAnnualSavings = (planId: string): number => {
  const plan = getPlanById(planId);
  
  if (!plan || plan.id === 'free') {
    return 0;
  }
  
  const monthlyCost = plan.price.monthly * 12;
  const annualCost = plan.price.annual;
  
  return monthlyCost - annualCost;
};

/**
 * Format price for display with currency symbol
 */
export const formatPrice = (price: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: price % 1 === 0 ? 0 : 2,
  }).format(price);
};