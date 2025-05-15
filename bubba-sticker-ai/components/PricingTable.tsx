'use client';

import { useState } from 'react';

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  quota: string;
  buttonText: string;
  isPopular?: boolean;
}

export default function PricingTable() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  
  const pricingPlans: PricingPlan[] = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      description: 'Get started with basic sticker creation',
      features: [
        '3 low-quality images per day',
        'Basic prompt options',
        'Standard resolution (512x512)',
        'Community support'
      ],
      quota: '3 low-quality/day',
      buttonText: 'Get Started'
    },
    {
      id: 'plus',
      name: 'Plus',
      price: billingCycle === 'monthly' ? 7 : 70,
      description: 'Perfect for occasional creators',
      features: [
        '30 medium-quality images per month',
        'All prompt options',
        'Higher resolutions (up to 1024x1024)',
        'Save sticker history',
        'Priority support'
      ],
      quota: '30 medium-quality/month',
      buttonText: 'Upgrade to Plus',
      isPopular: true
    },
    {
      id: 'pro',
      name: 'Pro',
      price: billingCycle === 'monthly' ? 20 : 190,
      description: 'Ideal for professional creators',
      features: [
        '50 high-quality images per month',
        'All prompt options',
        'Max resolution (up to 1536x1024)',
        'Commercial usage rights',
        'Bulk generation',
        'Premium support',
        'API access'
      ],
      quota: '50 high-quality/month',
      buttonText: 'Upgrade to Pro'
    }
  ];
  
  return (
    <div className="max-w-6xl mx-auto">
      {/* Billing toggle */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex items-center p-1 bg-background-light rounded-lg">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-4 py-2 rounded-md ${
              billingCycle === 'monthly' 
                ? 'bg-white shadow-sm' 
                : 'text-foreground/70 hover:text-foreground'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('annual')}
            className={`px-4 py-2 rounded-md ${
              billingCycle === 'annual' 
                ? 'bg-white shadow-sm' 
                : 'text-foreground/70 hover:text-foreground'
            }`}
          >
            Annual
            <span className="ml-1 text-xs text-accent font-medium">Save 15%</span>
          </button>
        </div>
      </div>
      
      {/* Pricing cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {pricingPlans.map((plan) => (
          <div 
            key={plan.id}
            className={`card relative ${
              plan.isPopular 
                ? 'ring-2 ring-primary ring-offset-2 shadow-lg' 
                : ''
            }`}
          >
            {plan.isPopular && (
              <div className="absolute top-0 right-0 bg-primary text-white px-3 py-1 text-xs font-medium rounded-bl-lg rounded-tr-xl">
                Most Popular
              </div>
            )}
            
            <h3 className="text-xl font-bold">{plan.name}</h3>
            
            <div className="mt-4 mb-2">
              <span className="text-4xl font-bold">${plan.price}</span>
              {plan.price > 0 && (
                <span className="text-foreground/70 ml-1">
                  /{billingCycle === 'monthly' ? 'mo' : 'yr'}
                </span>
              )}
            </div>
            
            <p className="text-foreground/70 mb-6">
              {plan.description}
            </p>
            
            <div className="bg-background-light px-4 py-2 rounded-lg mb-6">
              <span className="font-medium">Quota:</span> {plan.quota}
            </div>
            
            <ul className="space-y-3 mb-8">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <svg 
                    className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 20 20" 
                    fill="currentColor" 
                    aria-hidden="true"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            
            <button
              className={`w-full py-3 rounded-lg font-medium ${
                plan.id === 'free' 
                  ? 'btn-secondary' 
                  : plan.isPopular 
                    ? 'btn-primary' 
                    : 'btn-accent'
              }`}
            >
              {plan.buttonText}
            </button>
          </div>
        ))}
      </div>
      
      <div className="mt-8 text-center text-foreground/70">
        <p>Need more images? Contact us for custom enterprise plans.</p>
      </div>
    </div>
  );
}