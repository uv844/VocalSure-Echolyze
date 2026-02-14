
"use client";

import { useState, useRef, useEffect } from 'react';
import { 
  Mic, 
  Upload, 
  ChevronDown, 
  Loader2, 
  AlertCircle, 
  CheckCircle2, 
  ShieldAlert,
  Info,
  History as HistoryIcon
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardFooter 
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
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const LANGUAGES = [
  { id: 'en', name: 'English', native: 'English', flag: '🇺🇸' },
  { id: 'es', name: 'Spanish', native: 'Español', flag: '🇪🇸' },
  { id: 'fr', name: 'French', native: 'Français', flag: '🇫🇷' },
  { id: 'de', name: 'German', native: 'Deutsch', flag: '🇩🇪' },
  { id: 'it', name: 'Italian', native: 'Italiano', flag: '🇮🇹' },
  { id: 'pt', name: 'Portuguese', native: 'Português', flag: '🇵🇹' },
  { id: 'ja', name: 'Japanese', native: '日本語', flag: '🇯🇵' },
  { id: 'zh', name: 'Chinese', native: '中文', flag: '🇨🇳' },
];

export default function ApiTester() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [selectedLang, setSelectedLang] = useState<string>('English');
  const [refId, setRefId] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Generate a reference ID only on the client to avoid hydration mismatch
    setRefId(Math.random().toString(36).substring(2, 10).toUpperCase());
  }, [result]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== 'audio/mpeg' && !selectedFile.name.endsWith('.mp3')) {
        toast({
          title: "Invalid file type",
          description: "Please upload an MP3 file.",
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
    if (!file) return;

    setLoading(true);
    setResult(null);

    try {
      const base64 = await fileToBase64(file);
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'echolyze_hackathon_2026'
        },
        body: JSON.stringify({
          audioDataUri: base64,
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
      <div className="flex flex-col gap-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-headline font-bold text-primary">Interactive API Tester</h1>
          <p className="text-muted-foreground text-lg">Test our classification engine with your own audio samples.</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <Card className="border-2 border-dashed border-primary/20 bg-secondary/30">
              <CardContent className="pt-8 flex flex-col items-center text-center">
                <div 
                  className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6 cursor-pointer hover:bg-primary/20 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-10 w-10 text-primary" />
                </div>
                <h3 className="font-headline font-bold text-lg mb-2">Upload Audio Sample</h3>
                <p className="text-sm text-muted-foreground mb-6 px-4">
                  Drop your MP3 file here or click to browse. Max size 5MB.
                </p>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  accept="audio/mpeg" 
                  className="hidden" 
                />
                {file ? (
                  <div className="bg-white border rounded-lg p-3 w-full flex items-center gap-3">
                    <Mic className="h-5 w-5 text-accent" />
                    <div className="flex-1 text-left overflow-hidden">
                      <p className="text-sm font-bold truncate">{file.name}</p>
                      <p className="text-[10px] text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => setFile(null)}>Remove</Button>
                  </div>
                ) : (
                  <Button 
                    variant="outline" 
                    className="w-full border-primary/20"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Select File
                  </Button>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Analysis Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted-foreground uppercase">Expected Language</label>
                  <Select value={selectedLang} onValueChange={setSelectedLang}>
                    <SelectTrigger className="w-full bg-secondary/50">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      {LANGUAGES.map((lang) => (
                        <SelectItem key={lang.id} value={lang.name}>
                          <span className="flex items-center gap-2">
                            <span>{lang.flag}</span>
                            <span>{lang.native}</span>
                            <span className="text-muted-foreground text-xs">({lang.name})</span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  disabled={!file || loading} 
                  className="w-full bg-accent text-accent-foreground font-bold h-12 text-lg hover:shadow-lg hover:shadow-accent/20 transition-all"
                  onClick={handleAnalyze}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>Run Full Analysis</>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="lg:col-span-3">
            {!result && !loading ? (
              <div className="h-full border-2 border-dashed rounded-3xl flex flex-col items-center justify-center p-12 text-center text-muted-foreground bg-white/50">
                <Info className="h-12 w-12 mb-4 opacity-20" />
                <p>Upload an audio file and click Analyze to see the forensic breakdown.</p>
              </div>
            ) : loading ? (
              <div className="h-full bg-card border rounded-3xl p-12 flex flex-col items-center justify-center animate-pulse">
                <div className="w-24 h-24 rounded-full border-4 border-accent border-t-transparent animate-spin mb-8" />
                <h3 className="text-2xl font-headline font-bold text-primary mb-2">Analyzing Voice Origin</h3>
                <p className="text-muted-foreground">Scanning spectral markers and linguistic patterns...</p>
                <div className="w-full max-w-xs mt-8">
                  <Progress value={45} className="h-2" />
                </div>
              </div>
            ) : (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <Card className={cn(
                  "overflow-hidden border-t-4",
                  result.origin === 'HUMAN' ? "border-t-green-500" : "border-t-red-500"
                )}>
                  <CardHeader className="bg-secondary/20 pb-8">
                    <div className="flex items-start justify-between">
                      <div>
                        <Badge variant="outline" className="mb-2 bg-white">{result.origin === 'HUMAN' ? 'Authentic Speech' : 'Synthetic Detection'}</Badge>
                        <CardTitle className="text-4xl font-headline font-bold flex items-center gap-3">
                          {result.origin === 'HUMAN' ? (
                            <><CheckCircle2 className="text-green-500 h-10 w-10" /> Authentic Human</>
                          ) : (
                            <><ShieldAlert className="text-red-500 h-10 w-10" /> AI Generated</>
                          )}
                        </CardTitle>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-bold text-muted-foreground uppercase mb-1">Confidence</div>
                        <div className="text-3xl font-headline font-bold text-primary">{(result.confidence * 100).toFixed(1)}%</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-8 space-y-8">
                    <div className="p-4 bg-primary/5 rounded-xl border border-primary/10">
                      <h4 className="text-sm font-bold text-primary uppercase mb-2">Forensic Explanation</h4>
                      <p className="text-lg leading-relaxed text-muted-foreground">
                        {result.explanation}
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="text-xs font-bold text-muted-foreground uppercase border-b pb-2">Language Context</h4>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Detected Language</span>
                          <Badge variant="secondary" className="px-3 py-1 font-bold">{result.detectedLanguage}</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Language Match</span>
                          {result.languageMatchVerdict?.toLowerCase().includes('matches') ? (
                            <span className="text-green-600 flex items-center gap-1 text-sm font-bold">
                              <CheckCircle2 className="h-4 w-4" /> Match
                            </span>
                          ) : (
                            <span className="text-yellow-600 flex items-center gap-1 text-sm font-bold">
                              <AlertCircle className="h-4 w-4" /> Discrepancy
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-xs font-bold text-muted-foreground uppercase border-b pb-2">Technical Insight</h4>
                        <p className="text-xs italic text-muted-foreground leading-relaxed">
                          {result.analysisGuidance}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-secondary/10 py-4 flex justify-between border-t">
                    <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Reference ID: {refId || 'PENDING'}</span>
                    <button className="text-xs font-bold text-primary hover:text-accent transition-colors flex items-center gap-1">
                      Download Report PDF
                    </button>
                  </CardFooter>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
