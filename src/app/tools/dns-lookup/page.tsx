
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Loader2, Search } from 'lucide-react';
import Link from 'next/link';

type RecordType = 'A' | 'AAAA' | 'MX' | 'CNAME' | 'NS' | 'TXT';

export default function DnsLookupPage() {
  const [domain, setDomain] = useState('esystemlk.xyz');
  const [recordType, setRecordType] = useState<RecordType>('A');
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setResults([]);

    try {
      const response = await fetch(`/api/dns-lookup?domain=${domain}&type=${recordType}`);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || `An error occurred while fetching DNS records.`);
      }
      setResults(data.records);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const renderRecord = (record: any) => {
    if (typeof record === 'string') {
      return <p>{record}</p>;
    }
    if (record.exchange) { // MX Record
      return <p><strong>Exchange:</strong> {record.exchange} | <strong>Priority:</strong> {record.priority}</p>;
    }
    return <pre className="text-xs">{JSON.stringify(record, null, 2)}</pre>;
  };

  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <div className="bg-black/30 backdrop-blur-lg border border-white/10 shadow-2xl rounded-3xl py-8 text-center mb-10">
        <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">DNS Lookup</h1>
        <p className="text-white/80 md:text-xl mt-4 max-w-3xl mx-auto">
          Query DNS records (A, MX, CNAME, etc.) for any domain.
        </p>
      </div>

      <div className="mb-8">
        <Button asChild variant="outline">
          <Link href="/tools">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Tools
          </Link>
        </Button>
      </div>

      <Card className="max-w-2xl mx-auto bg-black/30 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg">
        <CardHeader>
          <CardTitle>DNS Query</CardTitle>
          <CardDescription>Enter a domain and select a record type to query.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 mb-6">
            <Input
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="example.com"
              className="h-12 text-lg"
              required
            />
            <Select value={recordType} onValueChange={(v) => setRecordType(v as RecordType)}>
                <SelectTrigger className="h-12 w-full sm:w-40">
                    <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="A">A</SelectItem>
                    <SelectItem value="AAAA">AAAA</SelectItem>
                    <SelectItem value="CNAME">CNAME</SelectItem>
                    <SelectItem value="MX">MX</SelectItem>
                    <SelectItem value="NS">NS</SelectItem>
                    <SelectItem value="TXT">TXT</SelectItem>
                </SelectContent>
            </Select>
            <Button type="submit" disabled={isLoading} className="h-12">
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
              Query
            </Button>
          </form>

          {error && <p className="text-destructive text-center p-4 bg-destructive/10 rounded-md">{error}</p>}
          
          {results.length > 0 && (
            <div className="space-y-2 animate-fade-in font-mono">
              {results.map((record, index) => (
                <div key={index} className="p-3 bg-black/20 rounded-md text-sm">
                  {renderRecord(record)}
                </div>
              ))}
            </div>
          )}

           {!isLoading && !error && results.length === 0 && (
              <div className="text-center text-muted-foreground py-10">
                Results will appear here.
              </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
