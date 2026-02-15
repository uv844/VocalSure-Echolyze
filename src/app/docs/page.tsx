import { 
  Lock, 
  Send,
  Code,
  AlertCircle,
  FileX,
  ShieldAlert
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

export default function DocsPage() {
  return (
    <div className="container mx-auto px-4 pt-32 pb-12 max-w-4xl">
      <div className="space-y-16">
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

        <section id="endpoint" className="space-y-12">
          {/* Request Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Send className="h-6 w-6 text-primary" />
              <h2 className="text-3xl font-headline font-bold">Request Body</h2>
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
                    <TableCell className="text-muted-foreground">Always "mp3"</TableCell>
                  </TableRow>
                  <TableRow className="border-white/5">
                    <TableCell className="font-code text-accent font-bold">audioBase64</TableCell>
                    <TableCell>string</TableCell>
                    <TableCell className="text-muted-foreground">Base64-encoded audio string (MP3)</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Card>

            <div className="relative group">
              <div className="bg-black/80 rounded-2xl p-8 font-code text-sm text-blue-300 shadow-2xl border border-white/5">
                <pre>{`{
  "language": "English (US)",
  "audioFormat": "mp3",
  "audioBase64": "SUQZBAAAAAAAI1RTUOUAA/..."
}`}</pre>
              </div>
            </div>
          </div>

          {/* Success Response */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <h2 className="text-3xl font-headline font-bold">Success Response</h2>
            </div>
            <div className="relative group">
              <div className="bg-black/80 rounded-2xl p-8 font-code text-sm text-green-300 shadow-2xl border border-white/5">
                <pre>{`{
  "status": "success",
  "language": "English (US)",
  "classification": "AI_GENERATED",
  "confidenceScore": 0.96,
  "explanation": "Forensic scan detected characteristic phase-alignment artifacts...",
  "timestamp": "2026-05-20T14:30:00Z"
}`}</pre>
              </div>
            </div>
          </div>

          {/* Error Definitions */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-6 w-6 text-destructive" />
              <h2 className="text-3xl font-headline font-bold">API Errors</h2>
            </div>
            
            <div className="grid gap-4">
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-secondary/20 border border-white/5">
                <div className="bg-destructive/10 p-2 rounded-lg">
                  <Lock className="h-5 w-5 text-destructive" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">401 Unauthorized</h3>
                  <p className="text-sm text-muted-foreground">Invalid or missing <code className="text-accent">x-api-key</code> header. Ensure you are using the correct secret key.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 rounded-2xl bg-secondary/20 border border-white/5">
                <div className="bg-amber-500/10 p-2 rounded-lg">
                  <FileX className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">400 Bad Request</h3>
                  <p className="text-sm text-muted-foreground">The request is missing the required <code className="text-accent">audioBase64</code> payload or contains malformed data.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 rounded-2xl bg-secondary/20 border border-white/5">
                <div className="bg-muted p-2 rounded-lg">
                  <ShieldAlert className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">500 Internal Server Error</h3>
                  <p className="text-sm text-muted-foreground">An unexpected error occurred on our analysis engine. Please try again later.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="authentication" className="space-y-6 max-w-2xl mx-auto pb-20">
          <div className="flex items-center gap-3 justify-center">
            <Lock className="h-6 w-6 text-primary" />
            <h2 className="text-3xl font-headline font-bold">Authentication</h2>
          </div>
          <p className="text-center text-muted-foreground text-sm">
            All API requests must include your private authentication header. Use the key provided in your dashboard.
          </p>
          <div className="flex justify-center font-code text-xs">
            <span className="bg-secondary px-4 py-2 rounded-full border border-white/5 text-muted-foreground">
              Header: <span className="text-accent">x-api-key</span>
            </span>
          </div>
        </section>
      </div>
    </div>
  );
}
