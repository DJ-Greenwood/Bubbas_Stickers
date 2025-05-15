'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // This would normally come from your auth system
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo and brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="h-10 w-10 relative mr-2">
                {/* Replace with your actual logo */}
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-accent"></div>
              </div>
              <span className="font-bold text-xl text-foreground">BubbaSticker.AI</span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/#generator" className="text-foreground/80 hover:text-primary transition-colors">
              Create
            </Link>
            <Link href="/gallery" className="text-foreground/80 hover:text-primary transition-colors">
              Gallery
            </Link>
            <Link href="/learn" className="text-foreground/80 hover:text-primary transition-colors">
              Learn
            </Link>
            <Link href="/#pricing" className="text-foreground/80 hover:text-primary transition-colors">
              Pricing
            </Link>
          </div>

          {/* Auth buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <Link href="/account" className="btn-secondary">
                My Account
              </Link>
            ) : (
              <>
                <button className="text-foreground/80 hover:text-primary transition-colors">
                  Sign In
                </button>
                <button className="btn-primary">
                  Try Free
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-foreground focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 bg-white">
            <Link href="/#generator" 
              className="block py-2 text-foreground/80 hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Create
            </Link>
            <Link href="/gallery" 
              className="block py-2 text-foreground/80 hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Gallery
            </Link>
            <Link href="/learn" 
              className="block py-2 text-foreground/80 hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Learn
            </Link>
            <Link href="/#pricing" 
              className="block py-2 text-foreground/80 hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <div className="pt-4 flex flex-col space-y-2">
              {isLoggedIn ? (
                <Link href="/account" 
                  className="btn-secondary text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Account
                </Link>
              ) : (
                <>
                  <button className="py-2 text-foreground/80 hover:text-primary text-left">
                    Sign In
                  </button>
                  <button className="btn-primary text-center">
                    Try Free
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}