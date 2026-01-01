
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, Download, Upload, Zap, Play, RotateCw } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from "framer-motion";

type TestStatus = 'idle' | 'testing-ping' | 'testing-download' | 'testing-upload' | 'finished';

const SpeedGauge = ({ speed, status, ping }: { speed: number; status: TestStatus; ping: number }) => {
    const getRotation = (s: number) => {
        const logSpeed = Math.log10(s + 1);
        const maxLogSpeed = Math.log10(201); // Max speed of 200Mbps for scaling
        return Math.min((logSpeed / maxLogSpeed) * 360, 360);
    };

    const speedAngle = getRotation(speed);
    const radius = 85;
    const circumference = 2 * Math.PI * radius;

    const getStatusText = () => {
        switch (status) {
            case 'testing-ping': return 'Pinging...';
            case 'testing-download': return 'Download';
            case 'testing-upload': return 'Upload';
            case 'finished': return 'Finished';
            default: return 'Idle';
        }
    }

    return (
        <div className="relative w-64 h-64 sm:w-80 sm:h-80 mx-auto mb-8">
            <svg viewBox="0 0 200 200" className="w-full h-full transform -rotate-90">
                <defs>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>
                 <circle
                    cx="100"
                    cy="100"
                    r={radius}
                    fill="none"
                    stroke="hsl(var(--primary) / 0.1)"
                    strokeWidth="12"
                />
                <motion.circle
                    cx="100"
                    cy="100"
                    r={radius}
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference - (speedAngle / 360) * circumference}
                    transition={{ type: "spring", stiffness: 50, damping: 20 }}
                    style={{ filter: "url(#glow)" }}
                />
            </svg>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={status}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.3 }}
                        className="text-center"
                    >
                        {status === 'testing-ping' || (status === 'idle' && ping === 0) ? (
                            <p className="text-5xl sm:text-6xl font-bold text-primary">{ping > 0 ? ping : '...'}</p>
                        ) : (
                            <p className="text-5xl sm:text-6xl font-bold text-primary">{speed.toFixed(1)}</p>
                        )}
                        <p className="text-sm text-muted-foreground uppercase tracking-wider mt-1">
                            {status === 'testing-ping' || (status === 'idle' && ping === 0 && status !== 'finished') ? 'ms' : 'Mbps'}
                        </p>
                         <p className="text-md font-semibold text-primary/80 mt-4">{getStatusText()}</p>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};


export default function SpeedTesterPage() {
    const [status, setStatus] = useState<TestStatus>('idle');
    const [downloadSpeed, setDownloadSpeed] = useState(0);
    const [uploadSpeed, setUploadSpeed] = useState(0);
    const [ping, setPing] = useState(0);
    const [currentSpeed, setCurrentSpeed] = useState(0);
    const [error, setError] = useState<string | null>(null);

    const startTest = async () => {
        if (status !== 'idle' && status !== 'finished') return;
        setStatus('testing-ping');
        setCurrentSpeed(0);
        setDownloadSpeed(0);
        setUploadSpeed(0);
        setPing(0);
        setError(null);

        try {
            // 1. Test Ping
            const startTime = Date.now();
            await fetch('/favicon.ico', { cache: 'no-store', mode: 'no-cors' });
            const endTime = Date.now();
            const currentPing = endTime - startTime;
            setPing(currentPing);

            // 2. Test Download
            setStatus('testing-download');
            let totalSize = 0;
            const testDuration = 8000;
            const downloadStartTime = Date.now();
            const imageUrl = 'https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=2100';

            const downloadController = new AbortController();
            const timeoutId = setTimeout(() => downloadController.abort(), testDuration + 1000);

            const response = await fetch(`${imageUrl}&t=${new Date().getTime()}`, {
                cache: 'no-store',
                signal: downloadController.signal,
            });
            const reader = response.body!.getReader();
            
            while (true) {
                try {
                    const { done, value } = await reader.read();
                    if (done || (Date.now() - downloadStartTime > testDuration)) break;
                    totalSize += value.length;
                    const duration = (Date.now() - downloadStartTime) / 1000;
                    if(duration > 0) {
                        const speedBps = (totalSize * 8) / duration;
                        const speedMbps = speedBps / 1_000_000;
                        setCurrentSpeed(speedMbps);
                    }
                } catch (e) { break; }
            }
            clearTimeout(timeoutId);

            const finalDownloadDuration = (Date.now() - downloadStartTime) / 1000;
            const finalDownloadSpeed = finalDownloadDuration > 0 ? ((totalSize * 8) / finalDownloadDuration) / 1_000_000 : 0;
            setDownloadSpeed(finalDownloadSpeed);
            
            // 3. Test Upload
            setStatus('testing-upload');
            setCurrentSpeed(0);
            totalSize = 0;
            const uploadStartTime = Date.now();
            const data = new Blob([new Uint8Array(1024 * 1024)], { type: 'application/octet-stream' });

            while (Date.now() - uploadStartTime < testDuration) {
                try {
                     await fetch('/api/uptime-check', { method: 'POST', body: data });
                    totalSize += data.size;
                    const duration = (Date.now() - uploadStartTime) / 1000;
                     if(duration > 0) {
                        const speedBps = (totalSize * 8) / duration;
                        const speedMbps = speedBps / 1_000_000;
                        setCurrentSpeed(speedMbps);
                    }
                } catch(e) { break; }
            }
            
            const finalUploadDuration = (Date.now() - uploadStartTime) / 1000;
            const finalUploadSpeed = finalUploadDuration > 0 ? ((totalSize * 8) / finalUploadDuration) / 1_000_000 : 0;
            setUploadSpeed(finalUploadSpeed);

            setStatus('finished');
            setCurrentSpeed(0);

        } catch (e) {
            setError(e instanceof Error ? e.message : 'The speed test failed. Your network may be offline.');
            setStatus('idle');
        }
    };

    const resetTest = () => {
        setStatus('idle');
        setCurrentSpeed(0);
        setDownloadSpeed(0);
        setUploadSpeed(0);
        setPing(0);
        setError(null);
    }

    return (
        <div className="container mx-auto py-10 px-4 md:px-6">
            <div className="bg-black/30 backdrop-blur-lg border border-white/10 shadow-2xl rounded-3xl py-8 text-center mb-10">
                <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">Internet Speed Test</h1>
                <p className="text-white/80 md:text-xl mt-4 max-w-3xl mx-auto">
                    Check your download, upload, and latency with a single click.
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

            <Card className="max-w-4xl mx-auto bg-black/30 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg">
                <CardContent className="text-center space-y-8 py-10">
                    <SpeedGauge speed={currentSpeed} status={status} ping={ping} />

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={status === 'idle' || status === 'finished' ? 'start' : 'testing'}
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.5, opacity: 0 }}
                        >
                            <Button 
                                onClick={status === 'idle' ? startTest : (status === 'finished' ? resetTest : undefined)} 
                                className="w-40 h-40 rounded-full text-2xl font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300 disabled:opacity-50"
                                disabled={status !== 'idle' && status !== 'finished'}
                                variant="hero"
                            >
                                {status === 'idle' && <Play className="w-10 h-10" />}
                                {status === 'finished' && <RotateCw className="w-10 h-10" />}
                                {status.startsWith('testing') && <div className="w-10 h-10 border-4 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"/>}
                            </Button>
                        </motion.div>
                    </AnimatePresence>

                    {error && (
                         <p className="text-destructive text-center p-4 bg-destructive/10 rounded-md">{error}</p>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8">
                        <div className="bg-black/20 p-4 rounded-lg flex items-center justify-between transition-all duration-300" style={{boxShadow: status.startsWith('testing') || status === 'finished' ? '0 0 15px hsl(var(--primary)/0.3)' : 'none', border: `1px solid ${status.startsWith('testing') || status === 'finished' ? 'hsl(var(--primary)/0.5)' : 'hsl(var(--border))'}`}}>
                           <div className="flex items-center gap-3">
                             <Zap className={`w-6 h-6 transition-colors duration-300 ${status.startsWith('testing') || status === 'finished' ? 'text-primary' : 'text-muted-foreground'}`} />
                             <span className="font-semibold text-lg">Ping</span>
                           </div>
                           <p className="text-2xl font-bold">{ping.toFixed(0)} <span className="text-base font-normal text-muted-foreground">ms</span></p>
                        </div>
                         <div className="bg-black/20 p-4 rounded-lg flex items-center justify-between transition-all duration-300" style={{boxShadow: status === 'testing-download' || status === 'finished' ? '0 0 15px hsl(var(--primary)/0.3)' : 'none', border: `1px solid ${status === 'testing-download' || status === 'finished' ? 'hsl(var(--primary)/0.5)' : 'hsl(var(--border))'}`}}>
                           <div className="flex items-center gap-3">
                             <Download className={`w-6 h-6 transition-colors duration-300 ${status === 'testing-download' || status === 'finished' ? 'text-primary' : 'text-muted-foreground'}`} />
                             <span className="font-semibold text-lg">Download</span>
                           </div>
                           <p className="text-2xl font-bold">{downloadSpeed.toFixed(2)} <span className="text-base font-normal text-muted-foreground">Mbps</span></p>
                        </div>
                         <div className="bg-black/20 p-4 rounded-lg flex items-center justify-between transition-all duration-300" style={{boxShadow: status === 'testing-upload' || status === 'finished' ? '0 0 15px hsl(var(--primary)/0.3)' : 'none', border: `1px solid ${status === 'testing-upload' || status === 'finished' ? 'hsl(var(--primary)/0.5)' : 'hsl(var(--border))'}`}}>
                           <div className="flex items-center gap-3">
                             <Upload className={`w-6 h-6 transition-colors duration-300 ${status === 'testing-upload' || status === 'finished' ? 'text-primary' : 'text-muted-foreground'}`} />
                             <span className="font-semibold text-lg">Upload</span>
                           </div>
                           <p className="text-2xl font-bold">{uploadSpeed.toFixed(2)} <span className="text-base font-normal text-muted-foreground">Mbps</span></p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

