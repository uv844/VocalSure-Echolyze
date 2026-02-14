import Link from 'next/link';
import { ArrowRight, Zap, Globe, Lock, ShieldCheck, Activity, Cpu, Gauge } from 'lucide-react';
import AudioVisualizer from '@/components/AudioVisualizer';

const IndiaFlag = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" className="h-5 w-7 rounded-sm shadow-sm">
    <rect width="900" height="600" fill="#f4c430"/>
    <rect width="900" height="200" y="200" fill="#fff"/>
    <rect width="900" height="200" y="400" fill="#128807"/>
    <circle cx="450" cy="300" r="40" fill="none" stroke="#000080" strokeWidth="8"/>
    <circle cx="450" cy="300" r="10" fill="#000080"/>
  </svg>
);

const GlobeIcon = () => (
  <div className="text-primary">
    <Globe className="h-5 w-5" />
  </div>
);

const SUPPORTED_LANGUAGES = [
  { name: 'English', native: 'English', flag: <GlobeIcon /> },
  { name: 'Hindi', native: 'हिन्दी', flag: <IndiaFlag /> },
  { name: 'Tamil', native: 'தமிழ்', flag: <IndiaFlag /> },
  { name: 'Telugu', native: 'తెలుగు', flag: <IndiaFlag /> },
  { name: 'Malayalam', native: 'മലയാളം', flag: <IndiaFlag /> },
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
                  <div className="flex-shrink-0">{lang.flag}</div>
                  <div className="flex flex-col items-start">
                    <span className="font-headline font-bold text-[12px] uppercase tracking-wider text-foreground leading-none mb-0.5">
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
      <section className="container mx-auto px-4 py-32 border-t border-white/5">
        <div className="text-center mb-16 space-y-4">
           <h2 className="text-4xl font-headline font-bold">Powerful Features</h2>
           <p className="text-muted-foreground text-primary/80 font-medium">
             Built for enterprise-grade accuracy, speed, and mission-critical security.
           </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard 
            icon={<Globe className="h-6 w-6 text-primary" />}
            title="5 Languages"
            description="Tamil, English, Hindi, Malayalam & Telugu detection support"
          />
          <FeatureCard 
            icon={<Activity className="h-6 w-6 text-primary" />}
            title="Real-time Detection"
            description="Instant AI vs Human voice classification with detailed analysis"
          />
          <FeatureCard 
            icon={<Gauge className="h-6 w-6 text-primary" />}
            title="Confidence Scoring"
            description="Precision scoring from 0.0 to 1.0 with explanations"
          />
          <FeatureCard 
            icon={<ShieldCheck className="h-6 w-6 text-primary" />}
            title="Secure API"
            description="API key authentication with server-side validation"
          />
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-8 rounded-2xl glass border-white/5 hover:border-primary/20 transition-all group">
      <div className="mb-6 p-4 bg-primary/10 w-fit rounded-xl group-hover:scale-110 group-hover:bg-primary/20 transition-all">
        {icon}
      </div>
      <h3 className="text-xl font-headline font-bold mb-3 tracking-tight">{title}</h3>
      <p className="text-muted-foreground leading-relaxed text-sm">{description}</p>
    </div>
  );
}
