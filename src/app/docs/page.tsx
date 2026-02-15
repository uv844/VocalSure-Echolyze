import { 
  Lock, 
  Send,
  Code,
  Copy
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
import { Button } from '@/components/ui/button';

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
                    <TableCell className="text-muted-foreground">Tamil / English / Hindi / Malayalam / Telugu</TableCell>
                  </TableRow>
                  <TableRow className="border-white/5">
                    <TableCell className="font-code text-accent font-bold">audioFormat</TableCell>
                    <TableCell>string</TableCell>
                    <TableCell className="text-muted-foreground">Always "mp3"</TableCell>
                  </TableRow>
                  <TableRow className="border-white/5">
                    <TableCell className="font-code text-accent font-bold">audioBase64</TableCell>
                    <TableCell>string</TableCell>
                    <TableCell className="text-muted-foreground">Base64-encoded MP3 audio</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Card>

            <div className="relative group">
              <div className="bg-black/80 rounded-2xl p-8 font-code text-sm text-blue-300 shadow-2xl border border-white/5">
                <pre>{`{
  "language": "Tamil",
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
  "language": "Tamil",
  "classification": "AI_GENERATED",
  "confidenceScore": 0.91,
  "explanation": "Unnatural pitch consistency detected..."
}`}</pre>
              </div>
            </div>
          </div>

          {/* Error Response */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <h2 className="text-3xl font-headline font-bold">Error Response</h2>
            </div>
            <div className="relative group">
              <div className="bg-black/80 rounded-2xl p-8 font-code text-sm text-red-300 shadow-2xl border border-white/5">
                <pre>{`{
  "status": "error",
  "message": "Invalid API Key"
}`}</pre>
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
            All API requests must include your private <code className="bg-secondary px-2 py-1 rounded">x-api-key</code> header.
          </p>
        </section>
      </div>
    </div>
  );
}
