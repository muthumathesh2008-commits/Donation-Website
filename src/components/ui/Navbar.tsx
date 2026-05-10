'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, HeartHandshake } from 'lucide-react';
import { Button } from './Button';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Programs', href: '/programs' },
    { name: 'Impact', href: '/impact' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <HeartHandshake className="h-8 w-8 text-emerald-600 transition-transform group-hover:scale-110" />
            <span className="font-bold text-xl tracking-tight text-slate-900">
              Hope<span className="text-emerald-600">Foundation</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <Link href="/donate">
              <Button size="sm">Donate Now</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-slate-600 hover:text-slate-900 focus:outline-none p-2"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 absolute top-full w-full left-0">
          <div className="px-4 pt-2 pb-6 space-y-4 flex flex-col shadow-lg">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block px-3 py-2 rounded-xl text-base font-medium text-slate-700 hover:text-emerald-600 hover:bg-slate-50 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="px-3 pt-2">
              <Link href="/donate" onClick={() => setIsOpen(false)}>
                <Button fullWidth>Donate Now</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
