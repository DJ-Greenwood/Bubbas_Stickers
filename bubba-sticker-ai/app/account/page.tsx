'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AccountPage() {
  // This would normally come from your Firebase Auth
  const [user, setUser] = useState<any>({
    name: 'Demo User',
    email: 'demo@example.com',
    photoURL: null,
  });
  
  // This would come from your Firestore
  const [subscription, setSubscription] = useState<any>({
    plan: 'Free',
    status: 'active',
    renewalDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    usageThisMonth: 2,
    totalQuota: 3,
  });
  
  // This would come from your Firestore
  const [recentStickers, setRecentStickers] = useState<any[]>([
    {
      id: 'sticker1',
      imageUrl: '/sample-images/cyberpunk-dog.png',
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      prompt: 'A cute dog in cyberpunk genre...',
    },
    {
      id: 'sticker2',
      imageUrl: '/sample-images/watercolor-cat.png',
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      prompt: 'A cute cat in slice-of-life genre...',
    },
  ]);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Account</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar: Profile & Plan */}
        <div className="lg:col-span-1">
          <div className="card mb-6">
            <div className="flex items-center">
              <div className="h-16 w-16 rounded-full bg-primary/20 text-primary flex items-center justify-center text-2xl font-bold">
                {user.name.substring(0, 1)}
              </div>
              <div className="ml-4">
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p className="text-foreground/70">{user.email}</p>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-muted">
              <button className="btn-secondary w-full mb-4">Edit Profile</button>
              <button className="text-foreground/70 w-full hover:text-foreground">Sign Out</button>
            </div>
          </div>
          
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Subscription</h2>
            
            <div className="bg-primary/10 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="font-medium">{subscription.plan} Plan</span>
                <span className="px-2 py-1 bg-primary/20 text-primary text-xs font-medium rounded-full">
                  {subscription.status}
                </span>
              </div>
              
              {subscription.plan !== 'Free' && (
                <p className="text-sm mt-2 text-foreground/70">
                  Renews on {subscription.renewalDate.toLocaleDateString()}
                </p>
              )}
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span>Usage this month</span>
                <span className="font-medium">
                  {subscription.usageThisMonth}/{subscription.totalQuota}
                </span>
              </div>
              <div className="h-2 bg-background-light rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full"
                  style={{ width: `${(subscription.usageThisMonth / subscription.totalQuota) * 100}%` }}
                ></div>
              </div>
            </div>
            
            {subscription.plan === 'Free' ? (
              <Link href="/#pricing" className="btn-primary block text-center w-full">
                Upgrade Plan
              </Link>
            ) : (
              <div className="space-y-4">
                <button className="btn-primary w-full">Manage Subscription</button>
                <button className="btn-secondary w-full">Billing History</button>
              </div>
            )}
          </div>
        </div>
        
        {/* Main Content: Recent Stickers & API */}
        <div className="lg:col-span-2">
          <div className="card mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Recent Stickers</h2>
              <Link href="/gallery" className="text-primary hover:underline font-medium">
                View All
              </Link>
            </div>
            
            {recentStickers.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {recentStickers.map((sticker) => (
                  <div key={sticker.id} className="border border-muted rounded-lg overflow-hidden">
                    <div className="aspect-square relative bg-background-light">
                      <div className="absolute inset-0 flex items-center justify-center">
                        {/* This would be a real image in production */}
                        <div className="w-2/3 h-2/3 rounded-full bg-gradient-to-br from-primary/20 to-accent/30"></div>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium truncate mr-2">Sticker #{sticker.id}</span>
                        <span className="text-xs text-foreground/60">
                          {sticker.createdAt.toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-foreground/70 truncate">{sticker.prompt}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-foreground/70 mb-4">You haven't created any stickers yet.</p>
                <Link href="/#generator" className="btn-primary">
                  Create Your First Sticker
                </Link>
              </div>
            )}
          </div>
          
          {subscription.plan === 'Pro' && (
            <div className="card">
              <h2 className="text-xl font-semibold mb-4">API Access</h2>
              <p className="mb-4 text-foreground/70">
                As a Pro user, you have access to our API for programmatic sticker generation.
              </p>
              
              <div className="bg-background-light rounded-lg p-4 font-mono text-sm mb-6 overflow-x-auto">
                <code>API_KEY: sk_live_bubba_ai_xxxxxxxxxxxxxxxxxxxx</code>
              </div>
              
              <div className="flex space-x-4">
                <button className="btn-secondary flex-1">Copy API Key</button>
                <button className="btn-secondary flex-1">Regenerate Key</button>
                <Link href="/learn/api-docs" className="btn-primary flex-1 text-center">
                  View Docs
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}