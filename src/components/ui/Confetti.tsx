'use client';

import React, { useState } from 'react';

type Particle = {
  id: number;
  left: string;
  animationDuration: string;
  animationDelay: string;
  color: string;
  type: 'circle' | 'rect';
};

function createParticles(): Particle[] {
  const colors = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

  return Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    animationDuration: `${Math.random() * 2 + 1}s`,
    animationDelay: `${Math.random() * 0.5}s`,
    color: colors[Math.floor(Math.random() * colors.length)],
    type: Math.random() > 0.5 ? 'circle' : 'rect',
  }));
}

export const Confetti = () => {
  const [particles] = useState(createParticles);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className={`absolute top-0 animate-confetti-fall ${p.type === 'circle' ? 'rounded-full' : 'rounded-sm'}`}
          style={{
            left: p.left,
            width: '10px',
            height: p.type === 'circle' ? '10px' : '15px',
            backgroundColor: p.color,
            animationDuration: p.animationDuration,
            animationDelay: p.animationDelay,
            opacity: 0,
          }}
        />
      ))}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes confetti-fall {
          0% { transform: translateY(-100px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        .animate-confetti-fall {
          animation-name: confetti-fall;
          animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
          animation-fill-mode: forwards;
        }
      `}} />
    </div>
  );
};
