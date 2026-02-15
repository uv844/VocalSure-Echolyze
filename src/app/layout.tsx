import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import Navigation from '@/components/Navigation';

export const metadata: Metadata = {
  title: 'VocalSure | AI Voice Detector',
  description: 'Forensic-grade audio analysis to distinguish between authentic human speech and AI-generated clones.',
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><path d="M50 10 L85 25 V50 C85 75 50 90 50 90 C50 90 15 75 15 50 V25 L50 10Z" fill="%232E3192" stroke="white" stroke-width="2"/><path d="M35 50 H43 L48 38 L55 62 L59 50" stroke="white" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/><path d="M65 45 L70 55 L80 35" stroke="white" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased min-h-screen flex flex-col bg-background text-foreground" suppressHydrationWarning>
        <Navigation />
        <main className="flex-grow">
          {children}
        </main>
        <footer className="border-t py-12 bg-secondary/20 mt-20">
          <div className="container mx-auto px-4 text-center">
            <div className="flex flex-col items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="font-headline font-bold text-lg">VocalSure</span>
              </div>
              <div className="text-sm text-muted-foreground">
                &copy; 2026 Echolyze
              </div>
              <div className="flex gap-8 text-xs font-bold uppercase tracking-widest text-muted-foreground/50">
                <a href="#" className="hover:text-primary transition-colors">Privacy</a>
                <a href="#" className="hover:text-primary transition-colors">Terms</a>
                <a href="#" className="hover:text-primary transition-colors">Security</a>
              </div>
            </div>
          </div>
        </footer>
        <Toaster />
      </body>
    </html>
  );
}
