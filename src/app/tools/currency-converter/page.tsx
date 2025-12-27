
"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Repeat, Loader2 } from 'lucide-react';
import Link from 'next/link';

const currencies = [
  { code: 'USD', name: 'US Dollar' },
  { code: 'EUR', name: 'Euro' },
  { code: 'LKR', name: 'Sri Lankan Rupee' },
  { code: 'INR', name: 'Indian Rupee' },
  { code: 'GBP', name: 'British Pound' },
  { code: 'JPY', name: 'Japanese Yen' },
  { code: 'AUD', name: 'Australian Dollar' },
  { code: 'CAD', name: 'Canadian Dollar' },
];

export default function CurrencyConverterPage() {
  const [amount, setAmount] = useState('1');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('LKR');
  const [convertedAmount, setConvertedAmount] = useState('');
  const [rates, setRates] = useState<Record<string, number> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastChanged, setLastChanged] = useState<'amount' | 'converted'>('amount');

  useEffect(() => {
    async function fetchRates() {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('https://open.er-api.com/v6/latest/USD');
        if (!response.ok) {
          throw new Error('Failed to fetch exchange rates.');
        }
        const data = await response.json();
        if (data.result === 'error') {
            throw new Error(data['error-type']);
        }
        setRates(data.rates);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'An unknown error occurred.');
      } finally {
        setIsLoading(false);
      }
    }
    fetchRates();
  }, []);

  const calculateConversion = () => {
    if (!rates) return;

    if (lastChanged === 'amount') {
        const amountNum = parseFloat(amount);
        if (isNaN(amountNum)) {
            setConvertedAmount('');
            return;
        }
        const rate = rates[toCurrency] / rates[fromCurrency];
        setConvertedAmount((amountNum * rate).toFixed(2));
    } else { // lastChanged === 'converted'
        const convertedNum = parseFloat(convertedAmount);
        if (isNaN(convertedNum)) {
            setAmount('');
            return;
        }
        const rate = rates[fromCurrency] / rates[toCurrency];
        setAmount((convertedNum * rate).toFixed(2));
    }
  };

  useEffect(() => {
    calculateConversion();
  }, [amount, convertedAmount, fromCurrency, toCurrency, rates, lastChanged]);
  
  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <div className="bg-black/30 backdrop-blur-lg border border-white/10 shadow-2xl rounded-3xl py-8 text-center mb-10">
        <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">Currency Converter</h1>
        <p className="text-white/80 md:text-xl mt-4 max-w-3xl mx-auto">
          Convert between major currencies using live exchange rates.
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
          <CardTitle>Convert Currency</CardTitle>
          <CardDescription>Enter an amount and select your currencies.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
           {isLoading ? (
            <div className="flex items-center justify-center h-48">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
           ) : error ? (
             <div className="text-center text-destructive bg-destructive/10 p-4 rounded-md">
                <p>Could not load live rates. Please try again later.</p>
                <p className="text-xs">{error}</p>
             </div>
           ) : (
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="w-full space-y-2">
                  <label className="text-sm font-medium">From</label>
                  <Input type="number" value={amount} onChange={(e) => { setAmount(e.target.value); setLastChanged('amount'); }} className="text-lg h-12" />
                  <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)} className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm">
                      {currencies.map(c => <option key={c.code} value={c.code}>{c.name} ({c.code})</option>)}
                  </select>
              </div>
              <Button variant="ghost" size="icon" onClick={handleSwap} className="shrink-0 mt-8">
                <Repeat className="w-5 h-5 text-primary"/>
              </Button>
              <div className="w-full space-y-2">
                  <label className="text-sm font-medium">To</label>
                  <Input type="number" value={convertedAmount} onChange={(e) => { setConvertedAmount(e.target.value); setLastChanged('converted'); }} className="text-lg h-12" />
                   <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)} className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm">
                      {currencies.map(c => <option key={c.code} value={c.code}>{c.name} ({c.code})</option>)}
                  </select>
              </div>
            </div>
           )}
          <p className="text-xs text-muted-foreground text-center">
            Rates are updated periodically and provided by a third-party service.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
