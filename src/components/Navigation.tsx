"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { History, BookOpen, Home, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

const LogoIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 100 100" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
  >
    {/* Shield Outer Outline */}
    <path 
      d="M50 12 L85 22 C85 50 75 78 50 92 C25 78 15 50 15 22 L50 12Z" 
      stroke="currentColor" 
      strokeWidth="5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    {/* Waveform/Pulse line on the left */}
    <path 
      d="M30 52 H40 L44 40 L50 64 L54 52" 
      stroke="currentColor" 
      strokeWidth="5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    {/* Checkmark on the right */}
    <path 
      d="M62 48 L68 56 L80 40" 
      stroke="currentColor" 
      strokeWidth="5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    {/* Microphone at bottom center */}
    <rect x="47" y="68" width="6" height="10" rx="3" fill="currentColor"/>
    <path d="M43 74 C43 78 45 81 50 81 C55 81 57 78 57 74" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="50" y1="81" x2="50" y2="85" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);

export default function Navigation() {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/api-tester', label: 'Detector', icon: Shield },
    { href: '/docs', label: 'Docs', icon: BookOpen },
    { href: '/history', label: 'History', icon: History },
  ];

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/5 bg-background/60 backdrop-blur-xl">
      <div className="container mx-auto px-4 flex h-24 items-center justify-between">
        <Link href="/" className="flex items-center gap-4 group">
          <div className="bg-primary/10 p-2 rounded-2xl border border-primary/20 transition-all group-hover:bg-primary/20 group-hover:scale-105 shadow-[0_0_20px_rgba(var(--primary),0.3)]">
            <LogoIcon className="h-10 w-10 text-primary" />
          </div>
          <div className="flex flex-col">
            <span className="font-headline text-2xl font-bold tracking-tight text-foreground leading-none">
              VocalSure
            </span>
            <span className="text-[10px] text-muted-foreground font-bold mt-1 tracking-widest uppercase">
              Powered by Echolyze
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1 bg-secondary/30 p-1.5 rounded-2xl border border-white/5">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-2.5 px-5 py-2.5 text-sm font-bold rounded-xl transition-all",
                  isActive 
                    ? "bg-primary text-primary-foreground shadow-xl shadow-primary/20 scale-[1.02]" 
                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                )}
              >
                <Icon className={cn("h-4.5 w-4.5", isActive ? "text-white" : "text-primary")} />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4 w-32 md:w-auto" />
      </div>
    </header>
  );
}
