"use client";

import { useState, useRef } from 'react';
import { 
  Upload, 
  Loader2, 
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

const LANGUAGES = [
  { id: 'en', name: 'English', flag: '🇺🇸' },
  { id: 'ta', name: 'Tamil', flag: '🇮🇳' },
  { id: 'es', name: 'Spanish', flag: '🇪🇸' },
  { id: 'fr', name: 'French', flag: '🇫🇷' },
  { id: 'de', name: 'German', flag: '🇩🇪' },
];

export default function DetectorPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [selectedLang, setSelectedLang] = useState<string>('English');
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
      
      const history = JSON.parse(localStorage.getItem('echolyze_history') || '[]');
      const newEntry = {
        id: Date.now().toString(),
        fileName: file.name,
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
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Audio Analysis</CardTitle>
              <CardDescription>Upload audio for classification</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
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
                  <p className="text-sm font-medium">{file ? file.name : "Click to upload MP3"}</p>
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
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Results</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center min-h-[300px]">
              {!result && !loading ? (
                <p className="text-muted-foreground">Analysis results will appear here</p>
              ) : loading ? (
                <div className="text-center space-y-4">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
                  <p className="text-sm">Scanning audio patterns...</p>
                </div>
              ) : (
                <div className="w-full space-y-6 animate-in fade-in duration-500">
                  <div className={cn(
                    "p-4 rounded-lg border-2 text-center font-bold text-xl",
                    result.origin === 'AI_GENERATED' ? "border-destructive/50 text-destructive bg-destructive/10" : "border-primary/50 text-primary bg-primary/10"
                  )}>
                    {result.origin === 'AI_GENERATED' ? "AI Generated" : "Authentic Human"}
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold">
                      <span>Confidence</span>
                      <span>{(result.confidence * 100).toFixed(1)}%</span>
                    </div>
                    <Progress value={result.confidence * 100} />
                  </div>
                  <div className="bg-secondary/30 p-4 rounded-lg border text-sm italic">
                    {result.explanation}
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
