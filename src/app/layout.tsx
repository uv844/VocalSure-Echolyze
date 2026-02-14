import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import Navigation from '@/components/Navigation';

export const metadata: Metadata = {
  title: 'EchoLyze | AI Voice Analysis Gateway',
  description: 'Forensic-grade audio analysis to distinguish between authentic human speech and AI-generated clones.',
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
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex items-center gap-2">
                <span className="font-headline font-bold text-lg">EchoLyze</span>
              </div>
              <div className="text-sm text-muted-foreground">
                &copy; 2026 EchoLyze Forensics. Secure Verification System.
              </div>
              <div className="flex gap-6 text-sm font-medium text-muted-foreground">
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
