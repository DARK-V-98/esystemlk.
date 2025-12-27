
"use client";

import { useState, useRef, useEffect } from 'react';
import jsQR from 'jsqr';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Upload, Video, X, Copy, Check } from 'lucide-react';
import Link from 'next/link';

export default function QrCodeScannerPage() {
    const [scanResult, setScanResult] = useState<string | null>(null);
    const [isScanning, setIsScanning] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const startScan = async () => {
        setScanResult(null);
        setError(null);
        setIsScanning(true);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.setAttribute("playsinline", "true"); // required to tell iOS safari we don't want fullscreen
                videoRef.current.play();
                requestAnimationFrame(tick);
            }
        } catch (err) {
            setError("Could not access camera. Please grant permission and try again.");
            setIsScanning(false);
        }
    };

    const stopScan = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
        }
        setIsScanning(false);
    };

    const tick = () => {
        if (videoRef.current && videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            
            canvas.height = video.videoHeight;
            canvas.width = video.videoWidth;
            
            if (ctx) {
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const code = jsQR(imageData.data, imageData.width, imageData.height, {
                    inversionAttempts: "dontInvert",
                });
                
                if (code) {
                    setScanResult(code.data);
                    stopScan();
                } else {
                    if (isScanning) {
                       requestAnimationFrame(tick);
                    }
                }
            }
        } else if (isScanning) {
            requestAnimationFrame(tick);
        }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    if(canvasRef.current){
                        const canvas = canvasRef.current;
                        const ctx = canvas.getContext('2d');
                        canvas.width = img.width;
                        canvas.height = img.height;
                        ctx?.drawImage(img, 0, 0, img.width, img.height);
                        const imageData = ctx?.getImageData(0, 0, img.width, img.height);
                        if(imageData) {
                            const code = jsQR(imageData.data, imageData.width, imageData.height);
                            if (code) {
                                setScanResult(code.data);
                            } else {
                                setError("No QR code found in the image.");
                            }
                        }
                    }
                };
                img.src = event.target?.result as string;
            };
            reader.readAsDataURL(file);
        }
    };
    
    const handleCopy = () => {
        if (scanResult) {
          navigator.clipboard.writeText(scanResult);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }
    };

    useEffect(() => {
        return () => {
            // Cleanup: stop camera when component unmounts
            if (videoRef.current && videoRef.current.srcObject) {
                const stream = videoRef.current.srcObject as MediaStream;
                stream.getTracks().forEach(track => track.stop());
            }
        }
    }, []);

    return (
        <div className="container mx-auto py-10 px-4 md:px-6">
            <canvas ref={canvasRef} style={{ display: 'none' }} />
            <div className="bg-black/30 backdrop-blur-lg border border-white/10 shadow-2xl rounded-3xl py-8 text-center mb-10">
                <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">QR Code Scanner</h1>
                <p className="text-white/80 md:text-xl mt-4 max-w-3xl mx-auto">
                    Scan QR codes using your camera or by uploading an image.
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
                    <CardTitle>Scan QR Code</CardTitle>
                    <CardDescription>Use your camera or upload an image file.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="bg-black/20 rounded-lg overflow-hidden relative aspect-video flex items-center justify-center">
                        {isScanning ? (
                            <video ref={videoRef} className="w-full h-full object-cover" />
                        ) : (
                             <p className="text-muted-foreground">Camera is off</p>
                        )}
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {!isScanning ? (
                            <Button onClick={startScan} className="w-full">
                                <Video className="mr-2 h-4 w-4" /> Start Camera
                            </Button>
                        ) : (
                            <Button onClick={stopScan} variant="destructive" className="w-full">
                                <X className="mr-2 h-4 w-4" /> Stop Camera
                            </Button>
                        )}
                         <Button asChild variant="secondary" className="w-full">
                            <label htmlFor="qr-upload" className="cursor-pointer">
                                <Upload className="mr-2 h-4 w-4" /> Upload Image
                                <Input id="qr-upload" type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                            </label>
                        </Button>
                    </div>

                    {error && <p className="text-sm text-destructive text-center">{error}</p>}

                    {scanResult && (
                         <Card className="bg-black/40">
                             <CardHeader>
                                <div className="flex justify-between items-center">
                                    <CardTitle>Scan Result</CardTitle>
                                     <Button variant="ghost" size="icon" onClick={handleCopy}>
                                        {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 w-4" />}
                                    </Button>
                                </div>
                             </CardHeader>
                            <CardContent>
                                <p className="font-mono bg-background p-4 rounded-md break-all">{scanResult}</p>
                                 <Button asChild variant="link" className="mt-2 px-0">
                                    <a href={scanResult} target="_blank" rel="noopener noreferrer">
                                        Open Link
                                    </a>
                                </Button>
                            </CardContent>
                         </Card>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

