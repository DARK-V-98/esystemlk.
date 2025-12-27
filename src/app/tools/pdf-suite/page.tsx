
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Loader2, FileImage, Image as ImageIcon, Book, Download, Merge, Split, Shrink } from 'lucide-react';
import Link from 'next/link';
import jsPDF from 'jspdf';
import { PDFDocument } from 'pdf-lib';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function PdfSuitePage() {
  const [mode, setMode] = useState<'img-to-pdf' | 'merge' | 'split' | 'compress'>('img-to-pdf');
  const [files, setFiles] = useState<FileList | null>(null);
  const [splitRange, setSplitRange] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
    setError(null);
  };

  const convertImagesToPdf = async () => {
    if (!files || files.length === 0) {
      setError('Please select one or more image files.');
      return;
    }
    setIsProcessing(true);
    setError(null);

    const doc = new jsPDF();
    let isFirstPage = true;

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!file.type.startsWith('image/')) continue;
        
        const img = new Image();
        img.src = URL.createObjectURL(file);
        await new Promise(resolve => { img.onload = resolve; });

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
        
        if (isFirstPage) {
            isFirstPage = false;
        } else {
            doc.addPage();
        }
        doc.addImage(img, file.type.split('/')[1].toUpperCase(), x, y, imgWidth, imgHeight);
    }
    
    doc.save('converted.pdf');
    setIsProcessing(false);
  };

  const mergePdfs = async () => {
    if (!files || files.length < 2) {
      setError('Please select at least two PDF files to merge.');
      return;
    }
    setIsProcessing(true);
    setError(null);
    try {
      const mergedPdf = await PDFDocument.create();
      for (let i = 0; i < files.length; i++) {
        const pdfBytes = await files[i].arrayBuffer();
        const pdfDoc = await PDFDocument.load(pdfBytes);
        const copiedPages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
        copiedPages.forEach(page => mergedPdf.addPage(page));
      }
      const mergedPdfBytes = await mergedPdf.save();
      const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'merged.pdf';
      a.click();
      URL.revokeObjectURL(url);
    } catch(e) {
      setError("Failed to merge PDFs. Please ensure all files are valid PDFs.");
    }
    setIsProcessing(false);
  }

  const splitPdf = async () => {
    if (!files || files.length !== 1) {
      setError('Please select exactly one PDF file to split.');
      return;
    }
    if (!splitRange.trim()) {
      setError('Please enter a page range to split (e.g., "1-3, 5").');
      return;
    }
    setIsProcessing(true);
    setError(null);

    try {
      const pdfBytes = await files[0].arrayBuffer();
      const pdfDoc = await PDFDocument.load(pdfBytes);
      const newPdf = await PDFDocument.create();
      
      const pageIndicesToCopy: number[] = [];
      const ranges = splitRange.split(',');
      ranges.forEach(range => {
        if (range.includes('-')) {
          const [start, end] = range.split('-').map(num => parseInt(num.trim(), 10) - 1);
          if (!isNaN(start) && !isNaN(end)) {
            for (let i = start; i <= end; i++) {
              if (i >= 0 && i < pdfDoc.getPageCount()) {
                pageIndicesToCopy.push(i);
              }
            }
          }
        } else {
          const pageNum = parseInt(range.trim(), 10) - 1;
          if (!isNaN(pageNum) && pageNum >= 0 && pageNum < pdfDoc.getPageCount()) {
            pageIndicesToCopy.push(pageNum);
          }
        }
      });
      
      const uniqueIndices = [...new Set(pageIndicesToCopy)].sort((a,b) => a-b);
      if (uniqueIndices.length === 0) throw new Error("Invalid page range specified.");
      
      const copiedPages = await newPdf.copyPages(pdfDoc, uniqueIndices);
      copiedPages.forEach(page => newPdf.addPage(page));

      const newPdfBytes = await newPdf.save();
      const blob = new Blob([newPdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'split.pdf';
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to split PDF. Please check the file and page range.');
    }
    setIsProcessing(false);
  };
  
  const compressPdf = async () => {
     setError('PDF compression is a complex feature under development and will be available soon!');
  }


  const handleProcess = () => {
    switch (mode) {
      case 'img-to-pdf':
        convertImagesToPdf();
        break;
      case 'merge':
        mergePdfs();
        break;
      case 'split':
        splitPdf();
        break;
      case 'compress':
        compressPdf();
        break;
    }
  };

  const getAcceptType = () => {
    switch(mode) {
        case 'img-to-pdf': return 'image/*';
        case 'merge':
        case 'split':
        case 'compress':
            return '.pdf';
        default: return '*/*';
    }
  }

  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <div className="bg-black/30 backdrop-blur-lg border border-white/10 shadow-2xl rounded-3xl py-8 text-center mb-10">
        <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">PDF Suite</h1>
        <p className="text-white/80 md:text-xl mt-4 max-w-3xl mx-auto">
          Merge, split, compress, and convert PDFs, all within your browser.
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
          <Tabs value={mode} onValueChange={(v) => setMode(v as any)} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="img-to-pdf"><ImageIcon className="mr-2 h-4 w-4" /> Images to PDF</TabsTrigger>
                <TabsTrigger value="merge"><Merge className="mr-2 h-4 w-4" /> Merge</TabsTrigger>
                <TabsTrigger value="split"><Split className="mr-2 h-4 w-4" /> Split</TabsTrigger>
                <TabsTrigger value="compress"><Shrink className="mr-2 h-4 w-4" /> Compress</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="space-y-2">
                <label htmlFor="file-upload" className="text-sm font-medium">
                  {mode === 'img-to-pdf' ? 'Select Image(s)' : 'Select PDF(s)'}
                </label>
                <Input 
                  id="file-upload" 
                  type="file" 
                  onChange={handleFileChange} 
                  multiple={mode === 'img-to-pdf' || mode === 'merge'}
                  accept={getAcceptType()}
                />
            </div>
            
            {files && (
              <div className="text-sm text-muted-foreground p-2 bg-black/20 rounded-md">
                {files.length} file(s) selected.
              </div>
            )}
            
            {mode === 'split' && (
                <div className="space-y-2">
                    <label htmlFor="split-range" className="text-sm font-medium">Pages to Extract</label>
                    <Input id="split-range" value={splitRange} onChange={e => setSplitRange(e.target.value)} placeholder="e.g., 1-3, 5, 8-10"/>
                </div>
            )}

            <Button onClick={handleProcess} disabled={isProcessing || !files} className="w-full">
                {isProcessing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
                {isProcessing ? 'Processing...' : 'Process & Download'}
            </Button>

            {error && <p className="text-sm text-destructive text-center">{error}</p>}
        </CardContent>
      </Card>
    </div>
  );
}
