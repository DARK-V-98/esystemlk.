
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Loader2, FileImage, Image as ImageIcon, Download } from 'lucide-react';
import Link from 'next/link';
import jsPDF from 'jspdf';
import { PDFDocument } from 'pdf-lib';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function PdfSuitePage() {
  const [mode, setMode] = useState<'img-to-pdf' | 'pdf-to-img'>('img-to-pdf');
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
      setError(null);
    }
  };

  const convertImagesToPdf = async () => {
    if (files.length === 0) {
      setError('Please select one or more image files.');
      return;
    }
    setIsProcessing(true);
    setError(null);

    const doc = new jsPDF();
    
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!file.type.startsWith('image/')) continue;
        
        try {
            const img = new Image();
            img.src = URL.createObjectURL(file);
            await new Promise<void>((resolve, reject) => { 
                img.onload = () => resolve();
                img.onerror = reject;
            });

            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();
            const ratio = img.width / img.height;
            let imgWidth = pageWidth - 20;
            let imgHeight = imgWidth / ratio;
            
            if (imgHeight > pageHeight - 20) {
                imgHeight = pageHeight - 20;
                imgWidth = imgHeight * ratio;
            }
            
            const x = (pageWidth - imgWidth) / 2;
            const y = (pageHeight - imgHeight) / 2;
            
            if (i > 0) {
                doc.addPage();
            }
            doc.addImage(img, file.type.split('/')[1].toUpperCase(), x, y, imgWidth, imgHeight);
            URL.revokeObjectURL(img.src);
        } catch (e) {
            setError(`Failed to process image: ${file.name}`);
            setIsProcessing(false);
            return;
        }
    }
    
    doc.save('converted-images.pdf');
    setIsProcessing(false);
  };
  
  const convertPdfToImages = async () => {
     if (files.length !== 1 || !files[0].type.includes('pdf')) {
        setError('Please select a single PDF file.');
        return;
    }
    setIsProcessing(true);
    setError(null);

    try {
      const pdfBytes = await files[0].arrayBuffer();
      const pdfDoc = await PDFDocument.load(pdfBytes);
      const { default: pdfjs } = await import('pdfjs-dist/build/pdf');
      pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

      const pdf = await pdfjs.getDocument({ data: pdfBytes }).promise;

      for (let i = 0; i < pdf.numPages; i++) {
        const page = await pdf.getPage(i + 1);
        const viewport = page.getViewport({ scale: 2 });
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        if (context) {
            await page.render({ canvasContext: context, viewport: viewport }).promise;
            const dataUrl = canvas.toDataURL('image/png');
            const a = document.createElement('a');
            a.href = dataUrl;
            a.download = `page_${i + 1}.png`;
            a.click();
        }
      }
    } catch(e) {
        setError(e instanceof Error ? e.message : 'Failed to convert PDF to images.');
    }

    setIsProcessing(false);
  }


  const handleProcess = () => {
    switch (mode) {
      case 'img-to-pdf':
        convertImagesToPdf();
        break;
      case 'pdf-to-img':
        convertPdfToImages();
        break;
    }
  };

  const getAcceptType = () => {
    switch(mode) {
        case 'img-to-pdf': return 'image/*';
        case 'pdf-to-img':
            return '.pdf';
        default: return '*/*';
    }
  }

  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <div className="bg-black/30 backdrop-blur-lg border border-white/10 shadow-2xl rounded-3xl py-8 text-center mb-10">
        <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">PDF & Image Converter</h1>
        <p className="text-white/80 md:text-xl mt-4 max-w-3xl mx-auto">
          A collection of tools to manage your PDF and Image files, all within your browser.
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
          <Tabs value={mode} onValueChange={(v) => { setMode(v as any); setFiles([]); setError(null); }} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="img-to-pdf"><ImageIcon className="mr-2 h-4 w-4" /> Images to PDF</TabsTrigger>
                <TabsTrigger value="pdf-to-img"><FileImage className="mr-2 h-4 w-4" /> PDF to Images</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="space-y-2">
                <label htmlFor="file-upload" className="text-sm font-medium">
                  {mode === 'img-to-pdf' ? 'Select Image(s)' : 'Select PDF File'}
                </label>
                <Input 
                  id="file-upload" 
                  type="file" 
                  onChange={handleFileChange} 
                  multiple={mode === 'img-to-pdf'}
                  accept={getAcceptType()}
                />
            </div>
            
            {files.length > 0 && (
              <div className="text-sm text-muted-foreground p-2 bg-black/20 rounded-md">
                {files.length} file(s) selected.
              </div>
            )}

            <Button onClick={handleProcess} disabled={isProcessing || files.length === 0} className="w-full">
                {isProcessing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
                {isProcessing ? 'Processing...' : 'Process & Download'}
            </Button>

            {error && <p className="text-sm text-destructive text-center">{error}</p>}
        </CardContent>
      </Card>
    </div>
  );
}
