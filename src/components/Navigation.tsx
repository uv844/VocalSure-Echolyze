"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Shield, History, BookOpen, ShieldCheck, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

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
          <div className="bg-primary/10 p-2.5 rounded-2xl border border-primary/20 transition-all group-hover:bg-primary/20 group-hover:scale-105">
            <Shield className="h-7 w-7 text-primary" />
          </div>
          <div className="flex flex-col">
            <span className="font-headline text-2xl font-bold tracking-tighter text-foreground leading-none">
              AI Voice Detector
            </span>
            <span className="text-[11px] text-muted-foreground uppercase tracking-[0.3em] font-bold">
              Echolyze API
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

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-[11px] font-bold text-primary tracking-wider uppercase">
            <ShieldCheck className="h-3.5 w-3.5" />
            Verified Gateway
          </div>
        </div>
      </div>
    </header>
  );
}
