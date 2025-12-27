
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Loader2, Search, Server, Dna } from 'lucide-react';
import Link from 'next/link';

interface DnsRecord {
  A?: string[];
  AAAA?: string[];
  CNAME?: string[];
  MX?: { exchange: string; priority: number }[];
  NS?: string[];
  SOA?: any;
}

export default function DnsLookupPage() {
  const [domain, setDomain] = useState('');
  const [dnsRecords, setDnsRecords] = useState<DnsRecord | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setDnsRecords(null);

    try {
      const response = await fetch(`/api/dns-lookup?domain=${domain}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch DNS records.');
      }
      const data = await response.json();
      setDnsRecords(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderRecord = (key: string, value: any) => {
    if (!value || (Array.isArray(value) && value.length === 0)) {
      return null;
    }
    
    let content;
    if (Array.isArray(value)) {
      content = (
        <ul className="list-disc list-inside">
          {value.map((item, index) => (
            <li key={index} className="font-mono text-sm">
              {typeof item === 'object' ? JSON.stringify(item) : item}
            </li>
          ))}
        </ul>
      );
    } else if (typeof value === 'object') {
       content = <pre className="font-mono text-xs whitespace-pre-wrap">{JSON.stringify(value, null, 2)}</pre>;
    } else {
      content = <p className="font-mono text-sm">{value}</p>;
    }

    return (
        <div key={key} className="p-3 bg-black/20 rounded-md">
            <h4 className="font-semibold text-primary">{key} Records</h4>
            {content}
        </div>
    );
  };


  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <div className="bg-black/30 backdrop-blur-lg border border-white/10 shadow-2xl rounded-3xl py-8 text-center mb-10">
        <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">DNS Lookup Tool</h1>
        <p className="text-white/80 md:text-xl mt-4 max-w-3xl mx-auto">
          Query Domain Name System (DNS) records for a specific domain.
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
          <CardTitle>Lookup DNS Records</CardTitle>
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
            <Button type="submit" disabled={isLoading} className="h-12">
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
              Lookup
            </Button>
          </form>

          {error && <p className="text-destructive text-center p-4 bg-destructive/10 rounded-md">{error}</p>}
          
          {dnsRecords && (
            <div className="space-y-4 animate-fade-in">
                 {Object.entries(dnsRecords).length > 0 ? (
                    Object.entries(dnsRecords).map(([key, value]) => renderRecord(key, value))
                 ) : (
                    <div className="text-center text-muted-foreground py-10">
                        No records found for this domain.
                    </div>
                 )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
