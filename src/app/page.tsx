import Link from 'next/link';
import { Shield, ArrowRight, Zap, Globe, Lock, ShieldCheck } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-50" />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-xs font-bold text-primary uppercase tracking-widest mb-8">
            <Zap className="h-4 w-4 fill-primary" />
            Next-Gen Voice Classification
          </div>
          
          <h1 className="text-6xl md:text-8xl font-headline font-bold leading-none mb-6 tracking-tighter">
            Identify AI <span className="text-primary">Clones.</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            State-of-the-art audio forensics. Instantly detect synthetic voices, deepfakes, and automated speech with unprecedented accuracy.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/api-tester" 
              className="bg-primary text-primary-foreground px-10 py-5 rounded-2xl font-bold text-lg hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all flex items-center gap-2 group"
            >
              Analyze Audio <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/docs" 
              className="bg-secondary text-foreground border border-border/50 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-secondary/80 transition-all"
            >
              Developer Documentation
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<ShieldCheck className="h-8 w-8 text-primary" />}
            title="Synthetic Artifact Detection"
            description="Our neural scanners detect the minute spectral signatures left by even the most advanced voice models."
          />
          <FeatureCard 
            icon={<Globe className="h-8 w-8 text-primary" />}
            title="Global Language Support"
            description="Deep analysis across 40+ major languages and dialects, ensuring forensic precision worldwide."
          />
          <FeatureCard 
            icon={<Lock className="h-8 w-8 text-primary" />}
            title="Production-Ready API"
            description="Easily integrate classification into your security workflow with our robust RESTful endpoints."
          />
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-10 rounded-3xl bg-secondary/10 border border-border/50 hover:border-primary/50 transition-all group">
      <div className="mb-6 p-4 bg-primary/10 w-fit rounded-2xl group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-headline font-bold mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}
