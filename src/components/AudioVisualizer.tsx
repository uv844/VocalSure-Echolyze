'use client';

import { useState, useEffect } from 'react';

export default function AudioVisualizer() {
  const [heights, setHeights] = useState<number[]>([]);

  useEffect(() => {
    // Generate heights only on the client to avoid hydration mismatch
    const generateHeights = () => Array.from({ length: 40 }, () => Math.random() * 100);
    setHeights(generateHeights());
    
    // Slower interval for a more rhythmic, intentional scanning feel
    const interval = setInterval(() => {
      setHeights(generateHeights());
    }, 300); // Increased from 100ms to 300ms
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-24 w-full flex items-center justify-center gap-1.5 px-4">
      {heights.length === 0 ? (
        // Placeholder state for initial render/SSR
        Array.from({ length: 40 }).map((_, i) => (
          <div 
            key={i} 
            className="w-1 bg-primary/20 rounded-full h-2" 
          />
        ))
      ) : (
        heights.map((height, i) => (
          <div 
            key={i} 
            className="w-1 bg-primary rounded-full transition-all duration-300 ease-in-out opacity-80" 
            style={{ 
              height: `${Math.max(10, height)}%`,
              // Add a slight glow effect to the bars
              boxShadow: '0 0 10px rgba(var(--primary), 0.3)'
            }} 
          />
        ))
      )}
    </div>
  );
}
