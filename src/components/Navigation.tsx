
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Mic, Terminal, History, BookOpen, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Navigation() {
  const pathname = usePathname();

  const links = [
    { href: '/api-tester', label: 'API Tester', icon: Terminal },
    { href: '/history', label: 'History', icon: History },
    { href: '/docs', label: 'Documentation', icon: BookOpen },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/80 backdrop-blur-md">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary p-2 rounded-lg group-hover:bg-accent transition-colors">
            <Mic className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-headline text-xl font-bold tracking-tight text-primary">
            EchoLyze<span className="text-accent">Pro</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-accent",
                  pathname === link.href ? "text-accent" : "text-muted-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-secondary rounded-full text-[10px] font-bold text-secondary-foreground">
            <ShieldCheck className="h-3 w-3" />
            SECURED API
          </div>
          <Link 
            href="/api-tester" 
            className="bg-accent text-accent-foreground px-4 py-2 rounded-md text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Start Analyzing
          </Link>
        </div>
      </div>
    </header>
  );
}
