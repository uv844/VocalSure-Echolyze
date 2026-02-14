"use client";

import { useState, useRef, useEffect } from 'react';
import { 
  Upload, 
  Loader2, 
  ShieldAlert,
  CheckCircle2,
  Lock,
  Globe,
  Mic,
  FileAudio
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const LANGUAGES = [
  { id: 'en', name: 'English', flag: '🇺🇸' },
  { id: 'ta', name: 'Tamil', flag: '🇮🇳' },
  { id: 'es', name: 'Spanish', flag: '🇪🇸' },
  { id: 'fr', name: 'French', flag: '🇫🇷' },
  { id: 'de', name: 'German', flag: '🇩🇪' },
  { id: 'it', name: 'Italian', flag: '🇮🇹' },
  { id: 'pt', name: 'Portuguese', flag: '🇵🇹' },
];

export default function DetectorPage() {
  const [file, setFile] = useState<File | null>(null);
  const [base64Input, setBase64Input] = useState('');
  const [apiKey, setApiKey] = useState('AIzaSyCpY-y1ikZ6nJXYtx0jbDcSZIGKB4rG4Ng');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [selectedLang, setSelectedLang] = useState<string>('Tamil');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (!selectedFile.type.includes('audio') && !selectedFile.name.endsWith('.mp3')) {
        toast({
          title: "Invalid file type",
          description: "Please upload an audio file (MP3/WAV).",
          variant: "destructive"
        });
        return;
      }
      setFile(selectedFile);
      setBase64Input('');
      setResult(null);
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleAnalyze = async () => {
    if (!file && !base64Input) {
      toast({
        title: "Input Required",
        description: "Please upload a file or paste base64 data.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const audioDataUri = file ? await fileToBase64(file) : base64Input;
      
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'echolyze_hackathon_2026' // Internal gateway key
        },
        body: JSON.stringify({
          audioDataUri,
          userSelectedLanguage: selectedLang
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Analysis failed');
      }

      setResult(data);
      
      const history = JSON.parse(localStorage.getItem('echolyze_history') || '[]');
      const newEntry = {
        id: Date.now().toString(),
        fileName: file ? file.name : 'Base64 Input',
        timestamp: new Date().toISOString(),
        ...data
      };
      localStorage.setItem('echolyze_history', JSON.stringify([newEntry, ...history].slice(0, 50)));

    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Column: Analysis Input */}
        <div className="space-y-6">
          <Card className="bg-secondary/20 border-border/50">
            <CardHeader>
              <CardTitle className="text-2xl font-headline font-bold">Analyze Voice</CardTitle>
              <CardDescription>Upload an MP3 or paste base64-encoded audio</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* API Key */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-2">
                  <Lock className="h-3 w-3" /> API Key
                </label>
                <Input 
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Enter your Gemini API key"
                  className="bg-background/50 border-border/50 h-11"
                />
              </div>

              {/* Language */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-2">
                  <Globe className="h-3 w-3" /> Language
                </label>
                <Select value={selectedLang} onValueChange={setSelectedLang}>
                  <SelectTrigger className="bg-background/50 border-border/50 h-11">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    {LANGUAGES.map((lang) => (
                      <SelectItem key={lang.id} value={lang.name}>
                        <span className="flex items-center gap-2">
                          <span className="text-xs">{lang.flag}</span>
                          <span>{lang.name}</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* File Upload */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-2">
                  <FileAudio className="h-3 w-3" /> Upload MP3
                </label>
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className={cn(
                    "border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center cursor-pointer transition-all hover:border-primary/50 hover:bg-primary/5",
                    file ? "border-primary bg-primary/5" : "border-border/50"
                  )}
                >
                  <Upload className={cn("h-10 w-10 mb-4", file ? "text-primary" : "text-muted-foreground")} />
                  {file ? (
                    <div className="text-center">
                      <p className="font-bold text-foreground">{file.name}</p>
                      <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground font-medium">Click to upload MP3 file</p>
                  )}
                  <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="audio/*" className="hidden" />
                </div>
              </div>

              {/* Base64 Input */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase">Or paste Base64</label>
                <Textarea 
                  value={base64Input}
                  onChange={(e) => {
                    setBase64Input(e.target.value);
                    if (e.target.value) setFile(null);
                  }}
                  placeholder="Paste audio base64 data here..."
                  className="bg-background/50 border-border/50 font-mono text-xs h-24"
                />
              </div>

              <Button 
                onClick={handleAnalyze}
                disabled={loading || (!file && !base64Input)}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold h-12 rounded-xl transition-all shadow-lg shadow-emerald-500/20"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Detecting Voice...
                  </>
                ) : (
                  <><Mic className="mr-2 h-5 w-5" /> Detect Voice</>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Results */}
        <div className="space-y-6">
          <Card className="bg-secondary/10 border-border/50 h-full flex flex-col">
            <CardHeader>
              <CardTitle className="text-2xl font-headline font-bold">Detection Result</CardTitle>
              <CardDescription>Analysis output will appear here</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 space-y-8 flex flex-col justify-center py-12">
              {!result && !loading ? (
                <div className="text-center py-20 opacity-30">
                  <ShieldAlert className="h-16 w-16 mx-auto mb-4" />
                  <p className="font-medium">Waiting for input analysis...</p>
                </div>
              ) : loading ? (
                <div className="text-center space-y-6">
                  <div className="relative w-24 h-24 mx-auto">
                    <div className="absolute inset-0 border-4 border-primary/20 rounded-full" />
                    <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">Scanning Spectral Patterns</h3>
                    <p className="text-sm text-muted-foreground">Isolating synthetic artifacts and neural frequencies...</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex flex-col items-center gap-6">
                    <div className={cn(
                      "flex items-center gap-3 px-8 py-4 rounded-xl border-2 font-bold text-lg",
                      result.origin === 'AI_GENERATED' 
                        ? "border-destructive/30 bg-destructive/10 text-destructive" 
                        : "border-emerald-500/30 bg-emerald-500/10 text-emerald-500"
                    )}>
                      {result.origin === 'AI_GENERATED' ? (
                        <><ShieldAlert className="h-6 w-6" /> AI Generated</>
                      ) : (
                        <><CheckCircle2 className="h-6 w-6" /> Human Voice</>
                      )}
                    </div>

                    <div className="w-full space-y-2">
                      <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        <span>Confidence</span>
                        <span>{(result.confidence * 100).toFixed(0)}%</span>
                      </div>
                      <Progress value={result.confidence * 100} className="h-3 bg-secondary" />
                    </div>
                  </div>

                  <div className="grid gap-4">
                    <div className="flex items-center justify-between border-b border-border/50 pb-2">
                      <span className="text-sm font-medium text-muted-foreground">Language</span>
                      <span className="text-sm font-bold uppercase">{result.detectedLanguage || selectedLang}</span>
                    </div>

                    <div className="space-y-2">
                      <span className="text-sm font-medium text-muted-foreground">Explanation</span>
                      <p className="text-sm leading-relaxed text-foreground/80 bg-secondary/30 p-4 rounded-lg border border-border/50">
                        {result.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}