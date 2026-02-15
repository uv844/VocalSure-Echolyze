"use client";

import { useState } from 'react';
import { 
  Lock, 
  Send,
  Code,
  AlertCircle,
  FileX,
  ShieldAlert,
  Globe,
  Terminal,
  Copy,
  Check
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export default function DocsPage() {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const fullEndpoint = "https://studio--studio-7772900131-b7e6c.us-central1.hosted.app/api/analyze";

  const handleCopy = () => {
    navigator.clipboard.writeText(fullEndpoint);
    setCopied(true);
    toast({
      title: "Link Copied",
      description: "Production API endpoint has been copied to your clipboard.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container mx-auto px-4 pt-32 pb-12 max-w-4xl">
      <div className="space-y-16">
        {/* Introduction */}
        <section id="introduction" className="text-center">
          <div className="flex justify-center mb-8">
            <div className="bg-primary/10 p-4 rounded-3xl border border-primary/20">
              <Code className="h-10 w-10 text-primary" />
            </div>
          </div>
          <h1 className="text-5xl font-headline font-bold text-primary mb-6 uppercase">ECHOLYZE API</h1>
          <p className="text-xl text-muted-foreground leading-relaxed mb-8 mx-auto max-w-2xl">
            Integrate world-class voice forensic analysis into your application. Our API provides real-time classification for audio authenticity.
          </p>
        </section>

        {/* Authentication */}
        <section id="authentication" className="space-y-6 max-w-2xl mx-auto py-10 border-y border-white/5">
          <div className="flex items-center gap-3 justify-center">
            <Lock className="h-6 w-6 text-primary" />
            <h2 className="text-3xl font-headline font-bold">Authentication</h2>
          </div>
          <p className="text-center text-muted-foreground text-sm">
            All requests must include a private authentication header. Use your secret key in the request header below to authorize your analysis requests.
          </p>
          <div className="flex justify-center font-code text-xs">
            <span className="bg-secondary px-6 py-3 rounded-full border border-white/5 text-muted-foreground">
              Header Key: <span className="text-accent font-bold">x-api-key</span>
            </span>
          </div>
        </section>

        {/* Endpoint Details */}
        <section id="endpoint" className="space-y-12">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Terminal className="h-6 w-6 text-primary" />
              <h2 className="text-3xl font-headline font-bold">API Endpoint</h2>
            </div>
            <div className="bg-secondary/20 border border-white/5 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 group">
              <div className="flex items-center gap-4 overflow-hidden w-full">
                <span className="bg-primary text-primary-foreground px-3 py-1 rounded-md text-xs font-bold uppercase shrink-0">POST</span>
                <code className="text-accent font-code font-bold text-sm md:text-lg break-all">
                  {fullEndpoint}
                </code>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleCopy}
                className="shrink-0 bg-background/50 border-white/10 hover:bg-primary hover:text-white transition-all gap-2"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copied" : "Copy Link"}
              </Button>
            </div>
          </div>

          {/* Request Details */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Send className="h-6 w-6 text-primary" />
              <h2 className="text-3xl font-headline font-bold">Request Payload</h2>
            </div>

            <Card className="bg-secondary/20 border-white/5 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="border-white/5 bg-secondary/40">
                    <TableHead className="font-bold text-primary">Field</TableHead>
                    <TableHead className="font-bold">Type</TableHead>
                    <TableHead className="font-bold">Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="border-white/5">
                    <TableCell className="font-code text-accent font-bold">language</TableCell>
                    <TableCell>string</TableCell>
                    <TableCell className="text-muted-foreground">Tamil / English (US) / Hindi / Malayalam / Telugu</TableCell>
                  </TableRow>
                  <TableRow className="border-white/5">
                    <TableCell className="font-code text-accent font-bold">audioFormat</TableCell>
                    <TableCell>string</TableCell>
                    <TableCell className="text-muted-foreground">The format of the payload (Always "mp3")</TableCell>
                  </TableRow>
                  <TableRow className="border-white/5">
                    <TableCell className="font-code text-accent font-bold">audioBase64</TableCell>
                    <TableCell>string</TableCell>
                    <TableCell className="text-muted-foreground">Base64-encoded audio string (MP3)</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Card>

            <div className="bg-black/80 rounded-2xl p-8 font-code text-sm text-blue-300 shadow-2xl border border-white/5 overflow-x-auto">
              <pre>{`{
  "language": "English (US)",
  "audioFormat": "mp3",
  "audioBase64": "SUQZBAAAAAAAI1RTUOUAA/..."
}`}</pre>
            </div>
          </div>

          {/* Response Details */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Globe className="h-6 w-6 text-primary" />
              <h2 className="text-3xl font-headline font-bold">Success Response</h2>
            </div>
            <div className="bg-black/80 rounded-2xl p-8 font-code text-sm text-green-300 shadow-2xl border border-white/5 overflow-x-auto">
              <pre>{`{
  "status": "success",
  "language": "English (US)",
  "classification": "AI_GENERATED",
  "confidenceScore": 0.96,
  "explanation": "Forensic scan detected characteristic phase-alignment artifacts..."
}`}</pre>
            </div>
          </div>

          {/* Error Definitions */}
          <div className="space-y-6 pb-20">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-6 w-6 text-destructive" />
              <h2 className="text-3xl font-headline font-bold">Error Codes</h2>
            </div>
            
            <div className="grid gap-4">
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-secondary/20 border border-white/5">
                <div className="bg-destructive/10 p-2 rounded-lg">
                  <Lock className="h-5 w-5 text-destructive" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">401 Unauthorized</h3>
                  <p className="text-sm text-muted-foreground">Invalid or missing <code className="text-accent">x-api-key</code> header. Access is denied.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 rounded-2xl bg-secondary/20 border border-white/5">
                <div className="bg-amber-500/10 p-2 rounded-lg">
                  <FileX className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">400 Bad Request</h3>
                  <p className="text-sm text-muted-foreground">Required fields are missing or the audio payload is malformed.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 rounded-2xl bg-secondary/20 border border-white/5">
                <div className="bg-muted p-2 rounded-lg">
                  <ShieldAlert className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">500 Internal Error</h3>
                  <p className="text-sm text-muted-foreground">An unexpected error occurred in the forensic analysis engine.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
