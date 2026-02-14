
import Link from 'next/link';
import Image from 'next/image';
import { Mic, ShieldCheck, Zap, Globe, ArrowRight } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import AudioVisualizer from '@/components/AudioVisualizer';

export default function LandingPage() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-voice');

  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <div className="z-10 flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-wider">
              <Zap className="h-3 w-3 fill-primary" />
              Advanced Voice Forensics
            </div>
            <h1 className="text-5xl md:text-6xl font-headline font-bold leading-tight text-primary">
              Is that Voice <span className="text-accent">Real</span> or <span className="text-accent">Synthetic</span>?
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              EchoLyze Pro uses cutting-edge GenAI analysis to distinguish between authentic human speech and AI-generated voices with precision accuracy.
            </p>
            <div className="flex flex-wrap gap-4 mt-4">
              <Link 
                href="/api-tester" 
                className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-bold text-lg hover:bg-primary/90 transition-all flex items-center gap-2 shadow-lg hover:shadow-primary/20"
              >
                Test Audio Now <ArrowRight className="h-5 w-5" />
              </Link>
              <Link 
                href="/docs" 
                className="bg-card text-card-foreground border-2 border-primary/20 px-8 py-4 rounded-lg font-bold text-lg hover:bg-secondary transition-all"
              >
                API Documentation
              </Link>
            </div>
          </div>
          
          <div className="relative aspect-square lg:aspect-auto h-[500px] w-full bg-secondary rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
            {heroImage && (
              <Image 
                src={heroImage.imageUrl} 
                alt={heroImage.description} 
                fill 
                className="object-cover opacity-90"
                data-ai-hint={heroImage.imageHint}
                priority
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-xl">
              <div className="flex items-center gap-4 mb-2">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-white text-xs font-bold uppercase tracking-widest">Real-time Pulse</span>
              </div>
              <AudioVisualizer />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-headline font-bold text-primary mb-4">Deep Intelligence Features</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our platform provides more than just a simple classification. We analyze acoustic patterns, frequency distributions, and linguistic markers.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<ShieldCheck className="h-8 w-8 text-accent" />}
            title="Authenticity Check"
            description="Deep scan for artifact detection common in LLM and diffusion-based voice synthesis."
          />
          <FeatureCard 
            icon={<Globe className="h-8 w-8 text-accent" />}
            title="Language Aware"
            description="Automatic language detection to contextualize analysis across 40+ global languages."
          />
          <FeatureCard 
            icon={<Zap className="h-8 w-8 text-accent" />}
            title="Rapid API"
            description="Production-ready API with ultra-low latency for seamless integration into your workflows."
          />
        </div>
      </section>

      {/* How it works */}
      <section className="bg-primary py-24 text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-headline font-bold mb-8">Integrated Analysis Pipeline</h2>
              <div className="space-y-8">
                <Step num="01" title="Upload or Send MP3" desc="Provide an audio file via our interface or Base64 encoded payload via API." />
                <Step num="02" title="AI Fingerprinting" desc="Our neural network scans for synthetic markers and anomalous spectral signatures." />
                <Step num="03" title="Contextual Validation" desc="Cross-referencing detected language and acoustic environment for final verdict." />
                <Step num="04" title="Detailed Report" desc="Receive a JSON response with origin classification, confidence score, and forensic explanation." />
              </div>
            </div>
            <div className="bg-white/5 rounded-2xl p-8 border border-white/10 font-code text-sm overflow-hidden">
              <pre className="text-accent-foreground">
                <code className="text-blue-300">
{`POST /api/analyze HTTP/1.1
Host: api.echolyze.pro
x-api-key: echolyze_hackathon_2026

{
  "audioDataUri": "data:audio/mp3;base64,...",
  "userSelectedLanguage": "English"
}`}
                </code>
                <br /><br />
                <code className="text-green-300">
{`HTTP/1.1 200 OK
{
  "origin": "HUMAN",
  "confidence": 0.985,
  "explanation": "Natural prosody and authentic background noise detected.",
  "detectedLanguage": "English",
  "languageMatch": true
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
    <div className="bg-card p-8 rounded-2xl border hover:border-accent transition-all group">
      <div className="mb-6 p-3 bg-secondary w-fit rounded-xl group-hover:bg-accent/10 transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-headline font-bold text-primary mb-3">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

function Step({ num, title, desc }: { num: string, title: string, desc: string }) {
  return (
    <div className="flex gap-6">
      <div className="text-4xl font-headline font-bold text-accent/40">{num}</div>
      <div>
        <h3 className="text-xl font-headline font-bold mb-1">{title}</h3>
        <p className="text-primary-foreground/70">{desc}</p>
      </div>
    </div>
  );
}
