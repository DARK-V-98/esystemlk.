
"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Repeat } from 'lucide-react';
import Link from 'next/link';

const currencies = [
  { code: 'USD', name: 'US Dollar' },
  { code: 'EUR', name: 'Euro' },
  { code: 'LKR', name: 'Sri Lankan Rupee' },
  { code: 'INR', name: 'Indian Rupee' },
  { code: 'GBP', name: 'British Pound' },
  { code: 'JPY', name: 'Japanese Yen' },
];

// NOTE: These are placeholder rates. A real application would fetch these from an API.
const placeholderRates: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  LKR: 305.50,
  INR: 83.45,
  GBP: 0.79,
  JPY: 157.25,
};

export default function CurrencyConverterPage() {
  const [amount, setAmount] = useState('1');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('LKR');
  const [convertedAmount, setConvertedAmount] = useState('');
  const [lastChanged, setLastChanged] = useState<'amount' | 'converted'>('amount');

  useEffect(() => {
    if (lastChanged === 'amount') {
        const amountNum = parseFloat(amount);
        if (isNaN(amountNum)) {
            setConvertedAmount('');
            return;
        }
        const rate = placeholderRates[toCurrency] / placeholderRates[fromCurrency];
        setConvertedAmount((amountNum * rate).toFixed(2));
    }
  }, [amount, fromCurrency, toCurrency, lastChanged]);

  useEffect(() => {
    if (lastChanged === 'converted') {
        const convertedNum = parseFloat(convertedAmount);
        if (isNaN(convertedNum)) {
            setAmount('');
            return;
        }
        const rate = placeholderRates[fromCurrency] / placeholderRates[toCurrency];
        setAmount((convertedNum * rate).toFixed(2));
    }
  }, [convertedAmount, fromCurrency, toCurrency, lastChanged]);
  
  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    // Let the useEffect handle the recalculation
  };

  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <div className="bg-black/30 backdrop-blur-lg border border-white/10 shadow-2xl rounded-3xl py-8 text-center mb-10">
        <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">Currency Converter</h1>
        <p className="text-white/80 md:text-xl mt-4 max-w-3xl mx-auto">
          Convert between major currencies. Rates are for demonstration purposes.
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
          <p className="text-xs text-muted-foreground text-center">Note: Exchange rates are for demonstration purposes and are not live.</p>
        </CardContent>
      </Card>
    </div>
  );
}
