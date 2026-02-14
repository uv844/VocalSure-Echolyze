import { 
  Terminal, 
  Lock, 
  Webhook, 
  FileJson, 
  ShieldCheck, 
  Info
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function DocsPage() {
  const docsImage = PlaceHolderImages.find(img => img.id === 'api-docs');

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="grid lg:grid-cols-4 gap-12">
        {/* Sidebar Nav (Desktop) */}
        <aside className="hidden lg:block space-y-8">
          <div className="space-y-4 sticky top-24">
            <h3 className="font-bold text-sm uppercase tracking-widest text-muted-foreground">API Reference</h3>
            <nav className="flex flex-col gap-2">
              <a href="#introduction" className="text-sm font-medium hover:text-accent transition-colors py-1">Introduction</a>
              <a href="#authentication" className="text-sm font-medium hover:text-accent transition-colors py-1">Authentication</a>
              <a href="#endpoints" className="text-sm font-medium hover:text-accent transition-colors py-1">Endpoints</a>
              <a href="#schemas" className="text-sm font-medium hover:text-accent transition-colors py-1">Response Schemas</a>
              <a href="#errors" className="text-sm font-medium hover:text-accent transition-colors py-1">Error Codes</a>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-16">
          <section id="introduction">
            <h1 className="text-5xl font-headline font-bold text-primary mb-6">Echolyze API</h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Integrate world-class voice forensic analysis into your application. Our Echolyze API provides real-time classification for audio authenticity.
            </p>
            {docsImage && (
              <div className="relative aspect-video rounded-2xl overflow-hidden border shadow-sm mb-8">
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

          <section id="authentication" className="space-y-6">
            <div className="flex items-center gap-3">
              <Lock className="h-8 w-8 text-accent" />
              <h2 className="text-3xl font-headline font-bold text-primary">Authentication</h2>
            </div>
            <Card className="bg-primary text-primary-foreground border-none">
              <CardContent className="p-6">
                <p className="mb-4">All API requests must include the <code className="bg-white/10 px-2 py-1 rounded">x-api-key</code> header for validation.</p>
                <div className="flex items-center justify-between bg-black/20 p-4 rounded-lg font-code text-accent-foreground select-all">
                  <span>x-api-key: echolyze_hackathon_2026</span>
                </div>
              </CardContent>
            </Card>
            <div className="bg-secondary/30 p-4 rounded-xl border flex gap-4">
              <ShieldCheck className="h-6 w-6 text-primary flex-shrink-0" />
              <p className="text-sm">Use the provided API key for verification. Secure your integrations by never exposing this key in client-side code.</p>
            </div>
          </section>

          <section id="endpoints" className="space-y-6">
            <div className="flex items-center gap-3">
              <Webhook className="h-8 w-8 text-accent" />
              <h2 className="text-3xl font-headline font-bold text-primary">Endpoints</h2>
            </div>
            
            <div className="space-y-8">
              <div className="border rounded-2xl overflow-hidden">
                <div className="bg-secondary/50 px-6 py-4 flex items-center justify-between border-b">
                  <div className="flex items-center gap-3">
                    <span className="bg-primary text-primary-foreground px-3 py-1 rounded-md text-xs font-bold uppercase">POST</span>
                    <code className="font-bold text-primary">/api/analyze</code>
                  </div>
                  <span className="text-xs text-muted-foreground">Voice Analysis & Language Detect</span>
                </div>
                <div className="p-6 bg-card space-y-6">
                  <h4 className="font-bold text-sm uppercase">Request Body</h4>
                  <div className="bg-black/90 rounded-xl p-6 font-code text-sm text-green-400 overflow-x-auto">
                    <pre>
{`{
  "audioDataUri": "data:audio/mp3;base64,...", // Required
  "userSelectedLanguage": "English"            // Optional
}`}
                    </pre>
                  </div>

                  <Tabs defaultValue="curl" className="w-full">
                    <TabsList>
                      <TabsTrigger value="curl">cURL</TabsTrigger>
                      <TabsTrigger value="node">Node.js</TabsTrigger>
                      <TabsTrigger value="python">Python</TabsTrigger>
                    </TabsList>
                    <TabsContent value="curl" className="mt-4">
                      <div className="bg-black/90 rounded-xl p-6 font-code text-sm text-blue-300 overflow-x-auto">
                        <pre>
{`curl -X POST https://YOUR_DOMAIN/api/analyze \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: echolyze_hackathon_2026" \\
  -d '{
    "audioDataUri": "data:audio/mp3;base64,TU9ZT..."
  }'`}
                        </pre>
                      </div>
                    </TabsContent>
                    <TabsContent value="node" className="mt-4">
                      <div className="bg-black/90 rounded-xl p-6 font-code text-sm text-blue-300 overflow-x-auto">
                        <pre>
{`const response = await fetch('https://YOUR_DOMAIN/api/analyze', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': 'echolyze_hackathon_2026'
  },
  body: JSON.stringify({
    audioDataUri: 'data:audio/mp3;base64,...'
  })
});
const data = await response.json();`}
                        </pre>
                      </div>
                    </TabsContent>
                    <TabsContent value="python" className="mt-4">
                      <div className="bg-black/90 rounded-xl p-6 font-code text-sm text-blue-300 overflow-x-auto">
                        <pre>
{`import requests

url = "https://YOUR_DOMAIN/api/analyze"
headers = {
    "x-api-key": "echolyze_hackathon_2026",
    "Content-Type": "application/json"
}
payload = {
    "audioDataUri": "data:audio/mp3;base64,..."
}

response = requests.post(url, json=payload, headers=headers)
print(response.json())`}
                        </pre>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </section>

          <section id="schemas" className="space-y-6">
            <div className="flex items-center gap-3">
              <FileJson className="h-8 w-8 text-accent" />
              <h2 className="text-3xl font-headline font-bold text-primary">Response Schema</h2>
            </div>
            <p className="text-muted-foreground">Successful responses return a HTTP 200 with the following JSON structure:</p>
            <div className="bg-black/90 rounded-xl p-8 font-code text-sm text-green-300 overflow-x-auto">
              <pre>
{`{
  "origin": "AI_GENERATED",         // [AI_GENERATED | HUMAN]
  "confidence": 0.995,              // Float 0 to 1
  "explanation": "...",             // Classification reasoning
  "detectedLanguage": "Spanish",    // Primary detected language
  "languageConfidence": 0.88,       // Language detection confidence
  "languageMatchVerdict": "...",    // Result of comparison if provided
  "analysisGuidance": "...",        // Tech insights
  "timestamp": "2026-05-15T..."     // ISO String
}`}
              </pre>
            </div>
          </section>

          <section id="errors" className="space-y-6">
            <div className="flex items-center gap-3">
              <Info className="h-8 w-8 text-accent" />
              <h2 className="text-3xl font-headline font-bold text-primary">Error Codes</h2>
            </div>
            <div className="border rounded-2xl overflow-hidden">
              <Table>
                <TableHeader className="bg-secondary/50">
                  <TableRow>
                    <TableHead>Code</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-bold">401 Unauthorized</TableCell>
                    <TableCell>Missing or invalid x-api-key header.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold">400 Bad Request</TableCell>
                    <TableCell>Invalid payload or missing audioDataUri.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold">500 Server Error</TableCell>
                    <TableCell>Internal processing error or flow timeout.</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
