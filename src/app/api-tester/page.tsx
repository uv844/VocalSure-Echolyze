"use client";

import { useState, useRef } from 'react';
import { 
  Upload, 
  Loader2, 
  Globe,
  Mic,
  FileAudio,
  Activity,
  Bot,
  User,
  Key,
  Eye,
  EyeOff,
  Code
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import AudioVisualizer from '@/components/AudioVisualizer';

const IndiaFlag = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" className="h-4 w-6 rounded-sm shadow-sm flex-shrink-0">
    <rect width="900" height="600" fill="#FF9933"/>
    <rect width="900" height="200" y="200" fill="#fff"/>
    <rect width="900" height="200" y="400" fill="#128807"/>
    <circle cx="450" cy="300" r="40" fill="none" stroke="#000080" strokeWidth="8"/>
    <circle cx="450" cy="300" r="10" fill="#000080"/>
  </svg>
);

const USFlag = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1235 650" className="h-4 w-6 rounded-sm shadow-sm flex-shrink-0">
    <rect width="1235" height="650" fill="#bf0a30"/>
    <path d="M0 50h1235M0 150h1235M0 250h1235M0 350h1235M0 450h1235M0 550h1235" stroke="#fff" strokeWidth="50"/>
    <rect width="494" height="350" fill="#002868"/>
    <g fill="#fff">
      {[...Array(5)].map((_, row) => (
        [...Array(6)].map((_, col) => (
          <circle key={`row1-${row}-${col}`} cx={41 + col * 82} cy={35 + row * 70} r="6" />
        ))
      ))}
      {[...Array(4)].map((_, row) => (
        [...Array(5)].map((_, col) => (
          <circle key={`row2-${row}-${col}`} cx={82 + col * 82} cy={70 + row * 70} r="6" />
        ))
      ))}
    </g>
  </svg>
);

const LANGUAGES = [
  { id: 'en', name: 'English (US)', flag: <USFlag /> },
  { id: 'hi', name: 'हिन्दी (Hindi)', flag: <IndiaFlag /> },
  { id: 'ta', name: 'தமிழ் (Tamil)', flag: <IndiaFlag /> },
  { id: 'te', name: 'తెలుగు (Telugu)', flag: <IndiaFlag /> },
  { id: 'ml', name: 'മലയാളം (Malayalam)', flag: <IndiaFlag /> },
];

export default function DetectorPage() {
  const [file, setFile] = useState<File | null>(null);
  const [base64Input, setBase64Input] = useState<string>('');
  const [userApiKey, setUserApiKey] = useState<string>('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [inputMode, setInputMode] = useState<'upload' | 'base64'>('upload');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [selectedLang, setSelectedLang] = useState<string>('English (US)');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        resolve(result);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setResult(null);
      try {
        const fullDataUri = await fileToBase64(selectedFile);
        const rawBase64 = fullDataUri.split(',')[1] || fullDataUri;
        setBase64Input(rawBase64);
      } catch (err) {
        toast({ title: "Processing Error", description: "Could not convert file.", variant: "destructive" });
      }
    }
  };

  const handleAnalyze = async () => {
    if (!userApiKey) {
      toast({ title: "API Key Required", description: "Please enter your Vocalsure API key", variant: "destructive" });
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-api-key': userApiKey },
        body: JSON.stringify({ 
          language: selectedLang,
          audioFormat: 'mp3',
          audioBase64: base64Input
        })
      });
      const data = await response.json();
      if (data.status === 'error') throw new Error(data.message || data.error);
      
      // Save to history with an internal timestamp for project use
      const currentHistory = JSON.parse(sessionStorage.getItem('echolyze_history') || '[]');
      sessionStorage.setItem('echolyze_history', JSON.stringify([{
        id: Date.now(),
        fileName: file?.name || 'Manual Input',
        timestamp: new Date().toISOString(),
        ...data
      }, ...currentHistory]));

      setResult(data);
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 pt-32 pb-12 max-w-5xl">
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Vocalsure AI Detector</CardTitle>
              <CardDescription>Provide audio for forensic classification</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-2">
                  <Key className="h-3 w-3" /> API Key
                </label>
                <div className="relative">
                  <input 
                    type={showApiKey ? "text" : "password"}
                    placeholder="Enter your API key"
                    value={userApiKey}
                    onChange={(e) => setUserApiKey(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-secondary/20 px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-transparent"
                  >
                    {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-2">
                  <Globe className="h-3 w-3" /> Language
                </label>
                <Select value={selectedLang} onValueChange={setSelectedLang}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    {LANGUAGES.map((lang) => (
                      <SelectItem key={lang.id} value={lang.name}>
                        <div className="flex items-center gap-3">{lang.flag} {lang.name}</div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Tabs value={inputMode} onValueChange={(v: any) => setInputMode(v)}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="upload"><FileAudio className="h-4 w-4 mr-2" /> Upload</TabsTrigger>
                  <TabsTrigger value="base64"><Code className="h-4 w-4 mr-2" /> Base64</TabsTrigger>
                </TabsList>
                <TabsContent value="upload" className="pt-2">
                  <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-secondary/20 transition-all">
                    <Upload className="h-8 w-8 mb-2 text-muted-foreground" />
                    <p className="text-sm font-medium">{file ? file.name : "Click to upload audio"}</p>
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="audio/*" className="hidden" />
                  </div>
                </TabsContent>
                <TabsContent value="base64" className="pt-2">
                  <Textarea placeholder="Paste base64 audio string..." className="min-h-[140px] font-code text-xs bg-secondary/20" value={base64Input} onChange={(e) => setBase64Input(e.target.value)} />
                </TabsContent>
              </Tabs>

              <Button onClick={handleAnalyze} disabled={loading || !base64Input} className="w-full h-12">
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Mic className="mr-2 h-4 w-4" />}
                Run Detection
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="h-full">
            <CardHeader><CardTitle className="flex items-center gap-2"><Activity className="h-5 w-5 text-primary" /> Forensic Analysis</CardTitle></CardHeader>
            <CardContent className="flex items-center justify-center min-h-[400px]">
              {!result && !loading ? (
                <p className="text-muted-foreground">Results will appear here</p>
              ) : loading ? (
                <div className="w-full text-center space-y-8 animate-pulse">
                  <AudioVisualizer />
                  <p className="text-sm font-bold uppercase tracking-widest text-primary">Analyzing Voiceprint...</p>
                </div>
              ) : (
                <div className="w-full space-y-6 animate-in fade-in duration-500">
                  <div className={cn("p-6 rounded-2xl border-2 text-center", result.classification === 'AI_GENERATED' ? "border-destructive/30 text-destructive bg-destructive/5" : "border-primary/30 text-primary bg-primary/5")}>
                    <p className="text-[10px] uppercase font-bold tracking-widest mb-2 opacity-70">Result</p>
                    <div className="flex items-center justify-center gap-3">
                      {result.classification === 'AI_GENERATED' ? <Bot className="h-8 w-8" /> : <User className="h-8 w-8" />}
                      <p className="text-3xl font-bold">{result.classification === 'AI_GENERATED' ? "AI GENERATED" : "HUMAN VOICE"}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      <span>Forensic Confidence</span>
                      <span>{(result.confidenceScore * 100).toFixed(1)}%</span>
                    </div>
                    <Progress value={result.confidenceScore * 100} className="h-2" />
                  </div>
                  <div className="bg-secondary/30 p-4 rounded-xl border border-border/50 text-sm">
                    <span className="font-bold text-foreground mr-2">Explanation:</span>
                    {result.explanation}
                  </div>
                  <div className="bg-secondary/20 p-3 rounded-xl border border-border/50">
                    <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Detected Language</p>
                    <p className="font-semibold text-sm flex items-center gap-2"><Globe className="h-3 w-3 text-primary" />{result.language}</p>
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
