'use client';

import React from 'react';
import Link from 'next/link';
import { HeartHandshake, MessageCircle, Users, Camera, Mail } from 'lucide-react';
import { CurrentYear } from './CurrentYear';

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <HeartHandshake className="h-6 w-6 text-emerald-600" />
              <span className="font-bold text-lg text-slate-900">
                Hope<span className="text-emerald-600">Foundation</span>
              </span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed">
              Empowering communities and changing lives through sustainable programs and immediate relief efforts worldwide.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/programs" className="text-slate-500 hover:text-emerald-600 text-sm transition-colors">Our Programs</Link></li>
              <li><Link href="/impact" className="text-slate-500 hover:text-emerald-600 text-sm transition-colors">Our Impact</Link></li>
              <li><Link href="/donate" className="text-slate-500 hover:text-emerald-600 text-sm transition-colors">Donate Now</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-slate-500">
              <li>123 Hope Street</li>
              <li>Global City, GC 10001</li>
              <li>contact@hopefoundation.org</li>
              <li>+1 (555) 123-4567</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-emerald-600 transition-colors">
                <MessageCircle className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-emerald-600 transition-colors">
                <Users className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-emerald-600 transition-colors">
                <Camera className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-emerald-600 transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm">
            &copy; <CurrentYear /> Hope Foundation. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-slate-400 hover:text-slate-600 text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-slate-400 hover:text-slate-600 text-sm transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
