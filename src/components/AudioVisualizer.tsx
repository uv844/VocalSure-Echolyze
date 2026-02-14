
'use client';

import { useState, useEffect } from 'react';

export default function AudioVisualizer() {
  const [heights, setHeights] = useState<number[]>([]);

  useEffect(() => {
    // Generate initial heights on client only
    setHeights(Array.from({ length: 30 }, () => Math.random() * 100));
    
    // Optional: make them pulse slowly
    const interval = setInterval(() => {
      setHeights(Array.from({ length: 30 }, () => Math.random() * 100));
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-12 w-full flex items-end gap-1">
      {heights.length === 0 ? (
        // Placeholder for SSR
        Array.from({ length: 30 }).map((_, i) => (
          <div 
            key={i} 
            className="flex-1 bg-accent/20 rounded-t-sm h-2" 
          />
        ))
      ) : (
        heights.map((height, i) => (
          <div 
            key={i} 
            className="flex-1 bg-accent rounded-t-sm transition-[height] duration-1000 ease-in-out" 
            style={{ height: `${height}%` }} 
          />
        ))
      )}
    </div>
  );
}
