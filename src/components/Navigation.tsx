"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Shield, History, BookOpen, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Navigation() {
  const pathname = usePathname();

  const links = [
    { href: '/api-tester', label: 'Detector', icon: Shield },
    { href: '/docs', label: 'Docs', icon: BookOpen },
    { href: '/history', label: 'History', icon: History },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="bg-primary/10 p-2 rounded-xl border border-primary/20 transition-colors">
            <Shield className="h-6 w-6 text-primary" />
          </div>
          <div className="flex flex-col">
            <span className="font-headline text-xl font-bold tracking-tight text-foreground">
              AI Voice Detector
            </span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
              Powered by Echolyze
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-2 bg-secondary/50 p-1.5 rounded-xl border">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all",
                  pathname === link.href 
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-[10px] font-bold text-primary">
            <ShieldCheck className="h-3 w-3" />
            V3.0 GATEWAY
          </div>
        </div>
      </div>
    </header>
  );
}