"use client";

import { useEffect, useState } from 'react';
import { 
  History as HistoryIcon, 
  Trash2, 
  Download, 
  Mic, 
  CheckCircle2, 
  ShieldAlert,
  Search,
  ExternalLink
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from 'next/link';

export default function HistoryPage() {
  const [history, setHistory] = useState<any[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    // Read from sessionStorage for session-based history
    const savedHistory = JSON.parse(sessionStorage.getItem('echolyze_history') || '[]');
    setHistory(savedHistory);
  }, []);

  const clearHistory = () => {
    if (confirm('Are you sure you want to clear this session\'s history?')) {
      sessionStorage.removeItem('echolyze_history');
      setHistory([]);
    }
  };

  const filteredHistory = history.filter(item => 
    item.fileName.toLowerCase().includes(search.toLowerCase()) ||
    item.origin.toLowerCase().includes(search.toLowerCase()) ||
    item.detectedLanguage.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 pt-32 pb-12 max-w-6xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="space-y-2">
          <h1 className="text-4xl font-headline font-bold text-primary flex items-center gap-3">
            <HistoryIcon className="h-10 w-10 text-accent" />
            Session History
          </h1>
          <p className="text-muted-foreground text-lg">Review forensic checks from your current session.</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={clearHistory} className="text-destructive hover:text-destructive">
            <Trash2 className="mr-2 h-4 w-4" /> Clear Session
          </Button>
          <Link href="/api-tester">
            <Button className="bg-primary hover:bg-primary/90">New Analysis</Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-8">
        <Card>
          <CardHeader className="pb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search by file name, origin, or language..." 
                className="pl-10 h-12 bg-secondary/30"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent>
            {filteredHistory.length === 0 ? (
              <div className="py-20 text-center text-muted-foreground">
                <Mic className="h-12 w-12 mx-auto mb-4 opacity-20" />
                <p className="text-lg">No session history found. History is cleared when you close the tab.</p>
              </div>
            ) : (
              <div className="border rounded-xl overflow-hidden">
                <Table>
                  <TableHeader className="bg-secondary/50">
                    <TableRow>
                      <TableHead>File Name</TableHead>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>Classification</TableHead>
                      <TableHead>Confidence</TableHead>
                      <TableHead>Language</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredHistory.map((item) => (
                      <TableRow key={item.id} className="hover:bg-primary/5 transition-colors">
                        <TableCell className="font-bold">
                          <div className="flex items-center gap-2">
                            <Mic className="h-4 w-4 text-primary" />
                            {item.fileName}
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground text-xs">
                          {new Date(item.timestamp).toLocaleString()}
                        </TableCell>
                        <TableCell>
                          {item.origin === 'HUMAN' ? (
                            <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200">
                              <CheckCircle2 className="h-3 w-3 mr-1" /> Human
                            </Badge>
                          ) : (
                            <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-red-200">
                              <ShieldAlert className="h-3 w-3 mr-1" /> AI Generated
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="font-mono text-sm">
                          {(item.confidence * 100).toFixed(1)}%
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{item.detectedLanguage}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" title="View Details">
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" title="Download JSON">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
