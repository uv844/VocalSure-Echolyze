import { 
  Lock, 
  FileJson, 
  Info
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function DocsPage() {
  const docsImage = PlaceHolderImages.find(img => img.id === 'api-docs');

  return (
    <div className="container mx-auto px-4 pt-32 pb-12 max-w-4xl">
      <div className="space-y-16">
        <section id="introduction" className="text-center">
          <h1 className="text-5xl font-headline font-bold text-primary mb-6">Echolyze API</h1>
          <p className="text-xl text-muted-foreground leading-relaxed mb-8 mx-auto max-w-2xl">
            Integrate world-class voice forensic analysis into your application. Our Echolyze API provides real-time classification for audio authenticity, distinguishing between human speech and synthetic AI clones.
          </p>
          {docsImage && (
            <div className="relative aspect-video rounded-2xl overflow-hidden border shadow-sm mb-8 max-w-3xl mx-auto">
              <Image 
                src={docsImage.imageUrl} 
                alt={docsImage.description} 
                fill 
                className="object-cover"
                data-ai-hint={docsImage.imageHint}
              />
            </div>
          )}
        </section>

        <section id="authentication" className="space-y-6 max-w-2xl mx-auto">
          <div className="flex items-center gap-3 justify-center">
            <Lock className="h-8 w-8 text-accent" />
            <h2 className="text-3xl font-headline font-bold text-primary">Authentication</h2>
          </div>
          <Card className="bg-primary text-primary-foreground border-none">
            <CardContent className="p-6">
              <p className="mb-4 text-center opacity-90 text-sm">All API requests must include the <code className="bg-white/10 px-2 py-1 rounded">x-api-key</code> header for validation.</p>
              <div className="flex items-center justify-center bg-black/20 p-4 rounded-lg font-code text-accent-foreground select-all text-sm">
                <span>x-api-key: echolyze_hackathon_2026</span>
              </div>
            </CardContent>
          </Card>
        </section>

        <section id="schemas" className="space-y-6 max-w-2xl mx-auto">
          <div className="flex items-center gap-3 justify-center">
            <FileJson className="h-8 w-8 text-accent" />
            <h2 className="text-3xl font-headline font-bold text-primary">Response Schema</h2>
          </div>
          <div className="bg-black/90 rounded-xl p-8 font-code text-xs text-green-300 overflow-x-auto shadow-2xl">
            <pre>
{`{
  "origin": "AI_GENERATED",         // [AI_GENERATED | HUMAN]
  "confidence": 0.995,              // Float 0 to 1
  "explanation": "...",             // Classification reasoning
  "detectedLanguage": "English",    // Primary detected language
  "timestamp": "2026-05-15T..."     // ISO String
}`}
            </pre>
          </div>
        </section>

        <section id="errors" className="space-y-6 max-w-2xl mx-auto pb-20">
          <div className="flex items-center gap-3 justify-center">
            <Info className="h-8 w-8 text-accent" />
            <h2 className="text-3xl font-headline font-bold text-primary">Status Codes</h2>
          </div>
          <div className="grid gap-4">
            <div className="flex items-center justify-between p-4 bg-secondary/20 rounded-xl border border-border/50">
              <span className="font-bold text-primary">200 OK</span>
              <span className="text-sm text-muted-foreground">Analysis successfully completed</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-secondary/20 rounded-xl border border-border/50">
              <span className="font-bold text-destructive">401 Unauthorized</span>
              <span className="text-sm text-muted-foreground">Invalid API Key</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
