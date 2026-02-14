"use client";

import { useState, useRef } from 'react';
import { 
  Upload, 
  Loader2, 
  Globe,
  Mic,
  FileAudio,
  Activity
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import AudioVisualizer from '@/components/AudioVisualizer';

const LANGUAGES = [
  { id: 'en', name: 'English (English)', flag: '🌐' },
  { id: 'hi', name: 'हिन्दी (Hindi)', flag: '🇮🇳' },
  { id: 'ta', name: 'தமிழ் (Tamil)', flag: '🇮🇳' },
  { id: 'te', name: 'తెలుగు (Telugu)', flag: '🇮🇳' },
  { id: 'ml', name: 'മലയാളം (Malayalam)', flag: '🇮🇳' },
];

export default function DetectorPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [selectedLang, setSelectedLang] = useState<string>('English (English)');
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
    if (!file) {
      toast({
        title: "File Required",
        description: "Please upload an audio file to analyze.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const audioDataUri = await fileToBase64(file);
      
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'echolyze_hackathon_2026'
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
      
      const history = JSON.parse(sessionStorage.getItem('echolyze_history') || '[]');
      const newEntry = {
        id: Date.now().toString(),
        fileName: file.name,
        timestamp: new Date().toISOString(),
        ...data
      };
      sessionStorage.setItem('echolyze_history', JSON.stringify([newEntry, ...history].slice(0, 50)));

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
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Audio Analysis</CardTitle>
              <CardDescription>Upload audio for forensic classification</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-2">
                  <Globe className="h-3 w-3" /> Spoken Language
                </label>
                <Select value={selectedLang} onValueChange={setSelectedLang}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    {LANGUAGES.map((lang) => (
                      <SelectItem key={lang.id} value={lang.name}>
                        {lang.flag} {lang.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-2">
                  <FileAudio className="h-3 w-3" /> Audio File
                </label>
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className={cn(
                    "border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all hover:bg-secondary/20",
                    file ? "border-primary bg-primary/5" : "border-border"
                  )}
                >
                  <Upload className={cn("h-8 w-8 mb-2", file ? "text-primary" : "text-muted-foreground")} />
                  <p className="text-sm font-medium">{file ? file.name : "Click to upload MP3/WAV"}</p>
                  <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="audio/*" className="hidden" />
                </div>
              </div>

              <Button 
                onClick={handleAnalyze}
                disabled={loading || !file}
                className="w-full h-12"
              >
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Mic className="mr-2 h-4 w-4" />}
                Analyze Voice
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="h-full overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Forensic Console
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center min-h-[400px]">
              {!result && !loading ? (
                <div className="text-center space-y-2">
                  <p className="text-muted-foreground">Results will appear here after scanning</p>
                  <p className="text-[10px] text-muted-foreground/50 uppercase tracking-widest font-bold">Session history enabled</p>
                </div>
              ) : loading ? (
                <div className="w-full text-center space-y-8 animate-in fade-in zoom-in duration-300">
                  <AudioVisualizer />
                  <div className="space-y-3">
                    <Loader2 className="h-6 w-6 animate-spin mx-auto text-primary" />
                    <div className="space-y-1">
                      <p className="text-sm font-bold uppercase tracking-widest text-primary animate-pulse">Analyzing Voiceprint</p>
                      <p className="text-[10px] text-muted-foreground italic">Running neural spectral decomposition...</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-full space-y-6 animate-in fade-in duration-500 slide-in-from-bottom-4">
                  <div className={cn(
                    "p-6 rounded-2xl border-2 text-center shadow-lg transition-all",
                    result.origin === 'AI_GENERATED' 
                      ? "border-destructive/30 text-destructive bg-destructive/5 shadow-destructive/10" 
                      : "border-primary/30 text-primary bg-primary/5 shadow-primary/10"
                  )}>
                    <p className="text-[10px] uppercase font-bold tracking-[0.2em] mb-2 opacity-70">Detection Result</p>
                    <p className="text-3xl font-headline font-bold">
                      {result.origin === 'AI_GENERATED' ? "AI GENERATED" : "HUMAN VOICE"}
                    </p>
                  </div>

                  <div className="space-y-2 px-2">
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      <span>Forensic Confidence</span>
                      <span className="text-primary">{(result.confidence * 100).toFixed(1)}%</span>
                    </div>
                    <Progress value={result.confidence * 100} className="h-2" />
                  </div>

                  <div className="bg-secondary/30 p-4 rounded-xl border border-border/50 text-sm leading-relaxed text-muted-foreground">
                    <span className="font-bold text-foreground mr-2">Analyst Note:</span>
                    {result.explanation}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-secondary/20 p-3 rounded-xl border border-border/50">
                      <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Detected Language</p>
                      <p className="font-semibold text-sm flex items-center gap-2">
                        <Globe className="h-3 w-3 text-primary" />
                        {result.detectedLanguage}
                      </p>
                    </div>
                    <div className="bg-secondary/20 p-3 rounded-xl border border-border/50">
                      <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Language Score</p>
                      <p className="font-semibold text-sm">{(result.languageConfidence * 100).toFixed(0)}%</p>
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
