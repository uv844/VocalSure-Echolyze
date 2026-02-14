import Link from 'next/link';
import { ArrowRight, Zap, Globe, Lock, ShieldCheck, Activity, Cpu } from 'lucide-react';
import AudioVisualizer from '@/components/AudioVisualizer';
import { Badge } from '@/components/ui/badge';

const SUPPORTED_LANGUAGES = [
  { name: 'English', native: 'English', flag: '🌐' },
  { name: 'Hindi', native: 'हिन्दी', flag: '🇮🇳' },
  { name: 'Tamil', native: 'தமிழ்', flag: '🇮🇳' },
  { name: 'Telugu', native: 'తెలుగు', flag: '🇮🇳' },
  { name: 'Malayalam', native: 'മലയാളം', flag: '🇮🇳' },
];

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-10 animate-in fade-in slide-in-from-top-4 duration-1000">
            <Cpu className="h-3.5 w-3.5" />
            Neural Analysis Engine V3.0
          </div>
          
          <h1 className="text-7xl md:text-9xl font-headline font-bold leading-[0.9] mb-4 tracking-tighter animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-150">
            AI Voice <span className="text-primary italic">Detector</span>
          </h1>

          <h2 className="text-3xl md:text-5xl font-headline font-bold text-muted-foreground/80 mb-8 tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-250">
            Verify Authenticity.
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
            Forensic-grade audio classification. Distinguish between human speech and synthetic deepfakes with the precision of Echolyze AI.
          </p>

          {/* Floating Language Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-16 max-w-3xl mx-auto animate-in fade-in duration-1000 delay-500">
            {SUPPORTED_LANGUAGES.map((lang, i) => (
              <div 
                key={lang.name} 
                className="group relative"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative flex items-center gap-3 px-6 py-3 bg-secondary/40 backdrop-blur-xl border border-white/5 rounded-full shadow-2xl transition-all group-hover:border-primary/50 group-hover:translate-y-[-2px]">
                  <span className="text-lg">{lang.flag}</span>
                  <div className="flex flex-col items-start">
                    <span className="font-headline font-bold text-[12px] uppercase tracking-wider text-foreground">
                      {lang.native}
                    </span>
                    <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest group-hover:text-primary transition-colors">
                      {lang.name}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Decorative Sound Wave */}
          <div className="max-w-2xl mx-auto mb-16 p-8 glass rounded-[2rem] shadow-2xl border-white/5">
            <div className="flex items-center gap-3 justify-center mb-4 text-[11px] font-bold tracking-[0.4em] text-primary/80 uppercase">
              <Activity className="h-4 w-4" />
              Continuous Spectral Audit
            </div>
            <AudioVisualizer />
          </div>
          
          <div className="flex flex-wrap justify-center gap-5 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-700">
            <Link 
              href="/api-tester" 
              className="bg-primary text-primary-foreground px-12 py-6 rounded-2xl font-bold text-lg glow-primary transition-all flex items-center gap-3 group"
            >
              Start Detection <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/docs" 
              className="glass px-12 py-6 rounded-2xl font-bold text-lg hover:bg-white/5 transition-all border-white/5"
            >
              Echolyze API Docs
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-32">
        <div className="grid md:grid-cols-3 gap-10">
          <FeatureCard 
            icon={<ShieldCheck className="h-7 w-7 text-primary" />}
            title="Biometric Analysis"
            description="Deep spectral inspection identifying mechanical artifacts unique to synthetic voice models."
          />
          <FeatureCard 
            icon={<Globe className="h-7 w-7 text-primary" />}
            title="Polyglot Forensics"
            description="Specialized linguistic classifiers for English, Hindi, Tamil, Telugu, and Malayalam audio sources."
          />
          <FeatureCard 
            icon={<Lock className="h-7 w-7 text-primary" />}
            title="Enterprise Grade"
            description="Secure API integration for large-scale authentication systems and voice-based identity verification."
          />
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-12 rounded-[2.5rem] glass border-white/5 hover:border-primary/20 transition-all group">
      <div className="mb-8 p-5 bg-primary/10 w-fit rounded-2xl group-hover:scale-110 group-hover:bg-primary/20 transition-all">
        {icon}
      </div>
      <h3 className="text-2xl font-headline font-bold mb-4 tracking-tight">{title}</h3>
      <p className="text-muted-foreground leading-relaxed text-lg">{description}</p>
    </div>
  );
}
