"use client";

import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import JsBarcode from 'jsbarcode';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Download, Barcode } from 'lucide-react';
import Link from 'next/link';

// A selection of common barcode formats supported by JsBarcode
const barcodeFormats = [
    { value: 'CODE128', label: 'CODE128' },
    { value: 'CODE39', label: 'CODE39' },
    { value: 'EAN13', label: 'EAN-13' },
    { value: 'EAN8', label: 'EAN-8' },
    { value: 'UPC', label: 'UPC' },
    { value: 'ITF14', label: 'ITF-14' },
    { value: 'MSI', label: 'MSI' },
    { value: 'pharmacode', label: 'Pharmacode' },
];

export default function BarcodeGeneratorPage() {
  const [barcodeValue, setBarcodeValue] = useState('Example 1234');
  const [barcodeFormat, setBarcodeFormat] = useState('CODE128');
  const [error, setError] = useState<string | null>(null);
  const barcodeRef = useRef<SVGSVGElement>(null);

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      content: 'Example 1234',
      format: 'CODE128',
    },
  });
  
  useEffect(() => {
    if (barcodeRef.current && barcodeValue) {
      try {
        JsBarcode(barcodeRef.current, barcodeValue, {
          format: barcodeFormat,
          lineColor: '#ffffff',
          background: 'transparent',
          width: 2,
          height: 100,
          displayValue: true,
          fontOptions: "bold",
          font: "monospace",
          fontSize: 18,
          fontColor: '#ffffff',
          textMargin: 5
        });
        setError(null);
      } catch (e) {
        const message = e instanceof Error ? e.message : "Invalid input for this barcode type.";
        setError(message);
        // Clear the SVG content on error
        if (barcodeRef.current) {
            barcodeRef.current.innerHTML = '';
        }
      }
    }
  }, [barcodeValue, barcodeFormat]);

  const onSubmit = (data: { content: string, format: string }) => {
    setBarcodeFormat(data.format);
    setBarcodeValue(data.content);
  };
  
  const handleDownload = () => {
    if (barcodeRef.current) {
      const svgData = new XMLSerializer().serializeToString(barcodeRef.current);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      
      const svgSize = barcodeRef.current.getBoundingClientRect();
      canvas.width = svgSize.width + 20;
      canvas.height = svgSize.height + 20;
      
      if(ctx){
        // Fill background
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        const img = new Image();
        img.onload = () => {
          // Draw image on canvas with padding
          ctx.drawImage(img, 10, 10);
          
          const pngUrl = canvas.toDataURL("image/png");
          const downloadLink = document.createElement("a");
          downloadLink.href = pngUrl;
          downloadLink.download = `${barcodeValue.replace(/ /g, '_')}-${barcodeFormat}.png`;
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
        };
        img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
      }
    }
  };


  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <div className="bg-black/30 backdrop-blur-lg border border-white/10 shadow-2xl rounded-3xl py-8 text-center mb-10">
        <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">Barcode Generator</h1>
        <p className="text-white/80 md:text-xl mt-4 max-w-3xl mx-auto">
          Create standard barcodes for your products or inventory.
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-1 bg-black/30 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg">
          <CardHeader>
            <CardTitle>Configuration</CardTitle>
            <CardDescription>Enter content and select a format.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="content" className="text-sm font-medium">Barcode Content</label>
                <Input {...register('content')} id="content" className="mt-1" />
              </div>
              <div>
                <label htmlFor="format" className="text-sm font-medium">Format</label>
                <Select onValueChange={(value) => setValue('format', value)} defaultValue="CODE128">
                  <SelectTrigger id="format" className="mt-1">
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    {barcodeFormats.map(f => (
                      <SelectItem key={f.value} value={f.value}>{f.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full">
                <Barcode className="mr-2 h-4 w-4" /> Generate Barcode
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <div className="lg:col-span-2">
            <Card className="bg-black/30 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg h-full">
              <CardHeader>
                <CardTitle>Result</CardTitle>
                <CardDescription>Your generated barcode will appear below.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-black/20 p-8 rounded-lg flex flex-col items-center justify-center min-h-[250px]">
                  {error ? (
                     <div className="text-center text-destructive">
                        <p className="font-bold">Error Generating Barcode</p>
                        <p className="text-sm">{error}</p>
                    </div>
                  ) : (
                    <svg ref={barcodeRef}></svg>
                  )}
                </div>
                {!error && (
                    <Button onClick={handleDownload} className="w-full mt-6" variant="hero" disabled={!barcodeValue}>
                        <Download className="mr-2 h-4 w-4" /> Download as PNG
                    </Button>
                )}
              </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
