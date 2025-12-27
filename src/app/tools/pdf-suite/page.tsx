
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Loader2, FileImage, Image as ImageIcon, Book, Download } from 'lucide-react';
import Link from 'next/link';
import jsPDF from 'jspdf';

export default function PdfSuitePage() {
  const [mode, setMode] = useState<'img-to-pdf' | 'pdf-to-img'>('img-to-pdf');
  const [files, setFiles] = useState<FileList | null>(null);
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
  
  const convertPdfToImages = async () => {
    setError('PDF to Image conversion is not yet implemented.');
  }

  const handleProcess = () => {
    if (mode === 'img-to-pdf') {
      convertImagesToPdf();
    } else {
      convertPdfToImages();
    }
  };

  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <div className="bg-black/30 backdrop-blur-lg border border-white/10 shadow-2xl rounded-3xl py-8 text-center mb-10">
        <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">PDF Suite</h1>
        <p className="text-white/80 md:text-xl mt-4 max-w-3xl mx-auto">
          Convert images to PDF and vice-versa, all within your browser.
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
          <CardTitle>PDF Conversion</CardTitle>
          <CardDescription>Your files are processed locally and never uploaded.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-2 bg-black/20 p-1 rounded-full">
                <Button onClick={() => setMode('img-to-pdf')} variant={mode === 'img-to-pdf' ? 'hero' : 'ghost'} className="rounded-full">
                    <ImageIcon className="mr-2 h-4 w-4" /> Images to PDF
                </Button>
                <Button onClick={() => setMode('pdf-to-img')} variant={mode === 'pdf-to-img' ? 'hero' : 'ghost'} className="rounded-full">
                    <FileImage className="mr-2 h-4 w-4" /> PDF to Images
                </Button>
            </div>

            <div className="space-y-2">
                <label htmlFor="file-upload" className="text-sm font-medium">
                  {mode === 'img-to-pdf' ? 'Select Image(s)' : 'Select PDF File'}
                </label>
                <Input 
                  id="file-upload" 
                  type="file" 
                  onChange={handleFileChange} 
                  multiple={mode === 'img-to-pdf'}
                  accept={mode === 'img-to-pdf' ? 'image/*' : '.pdf'}
                />
            </div>
            
            {files && (
              <div className="text-sm text-muted-foreground p-2 bg-black/20 rounded-md">
                {files.length} file(s) selected.
              </div>
            )}

            <Button onClick={handleProcess} disabled={isProcessing || !files} className="w-full">
                {isProcessing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
                {isProcessing ? 'Processing...' : 'Convert & Download'}
            </Button>

            {error && <p className="text-sm text-destructive text-center">{error}</p>}
        </CardContent>
      </Card>
    </div>
  );
}
