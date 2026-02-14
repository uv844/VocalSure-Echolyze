import Link from 'next/link';
import { Shield, ArrowRight, Zap, Globe, Lock, ShieldCheck } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-50" />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-xs font-bold text-primary uppercase tracking-widest mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
            <Zap className="h-4 w-4 fill-primary" />
            V3.0 Detection Engine Live
          </div>
          
          <h1 className="text-6xl md:text-8xl font-headline font-bold leading-none mb-6 tracking-tighter">
            Verify Every <span className="text-primary">Voice.</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Forensic-grade audio analysis powered by Gemini 2.5. Instantly distinguish between authentic human speech and high-fidelity AI clones.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/api-tester" 
              className="bg-primary text-primary-foreground px-10 py-5 rounded-2xl font-bold text-lg hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all flex items-center gap-2 group"
            >
              Start Detection <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/docs" 
              className="bg-secondary text-foreground border border-border/50 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-secondary/80 transition-all"
            >
              Developer Docs
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<ShieldCheck className="h-8 w-8 text-primary" />}
            title="Authenticity Verification"
            description="Deep scan for neural artifacts and non-human spectral signatures used in deepfake synthesis."
          />
          <FeatureCard 
            icon={<Globe className="h-8 w-8 text-primary" />}
            title="Multilingual Detection"
            description="Linguistic analysis across 40+ languages, preserving accuracy across dialects and accents."
          />
          <FeatureCard 
            icon={<Lock className="h-8 w-8 text-primary" />}
            title="Secure API Integration"
            description="Production-ready REST API with low-latency classification for real-time verification workflows."
          />
        </div>
      </section>

      {/* Code Sample */}
      <section className="bg-secondary/30 border-y py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-headline font-bold">Simple Integration. <br />Powerful Forensics.</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Send base64 encoded audio snippets directly to our endpoint. Receive comprehensive metadata including origin classification, confidence scoring, and acoustic explanation.
              </p>
              <div className="flex gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-2xl font-bold text-primary">0.8s</span>
                  <span className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Avg Latency</span>
                </div>
                <div className="w-px h-10 bg-border mx-4" />
                <div className="flex flex-col gap-1">
                  <span className="text-2xl font-bold text-primary">99.8%</span>
                  <span className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Accuracy</span>
                </div>
              </div>
            </div>
            <div className="bg-[#0b0e14] rounded-2xl p-8 border border-border/50 font-mono text-sm shadow-2xl overflow-x-auto">
              <pre className="text-emerald-400">
                <code>
{`// API Request
POST /api/analyze
{
  "audio": "base64_encoded_mp3...",
  "language": "Tamil"
}

// API Response
{
  "origin": "AI_GENERATED",
  "confidence": 0.98,
  "explanation": "Mechanical phoneme transitions detected."
}`}
                </code>
              </pre>
            </div>
          </div>
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