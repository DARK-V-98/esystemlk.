
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, Download, Upload, Zap, Play, RotateCw } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from "framer-motion";

type TestStatus = 'idle' | 'testing-ping' | 'testing-download' | 'testing-upload' | 'finished';

const SpeedGauge = ({ speed, status }: { speed: number; status: TestStatus }) => {
    const getRotation = (s: number) => {
        // Map speed (0-100+) to rotation (-90 to 90 degrees)
        const logSpeed = Math.log10(s + 1); // Use log scale for better visualization
        const maxLogSpeed = Math.log10(201); // 200 Mbps
        const rotation = (logSpeed / maxLogSpeed) * 180 - 90;
        return Math.min(Math.max(rotation, -90), 90);
    };

    const speedRotation = getRotation(speed);

    return (
        <div className="relative w-64 h-32 mx-auto mb-8">
            {/* Gauge background arc */}
            <div
                className="absolute w-full h-full bg-gradient-to-b from-primary/10 to-transparent rounded-t-full"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
            />
             <div className="absolute w-full h-full border-t-2 border-l-2 border-r-2 border-primary/20 rounded-t-full" />
            
            {/* Needle */}
            <motion.div 
                className="absolute bottom-0 left-1/2 w-0.5 h-[110px] bg-primary rounded-full shadow-[0_0_10px] shadow-primary/50 transition-transform duration-300 ease-out origin-bottom"
                style={{
                    transform: `translateX(-50%) rotate(${speedRotation}deg)`
                }}
                initial={{ transform: `translateX(-50%) rotate(-90deg)` }}
                animate={{ transform: `translateX(-50%) rotate(${speedRotation}deg)` }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
            />
            
            {/* Needle base */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-6 bg-background rounded-full border-4 border-primary" />
            
            {/* Speed Text */}
            <div className="absolute bottom-0 w-full text-center">
                 <motion.p 
                    className="text-5xl font-bold text-primary"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={speed.toFixed(2)}
                 >
                    {speed.toFixed(2)}
                </motion.p>
                <p className="text-sm text-muted-foreground uppercase tracking-wider">
                    {status === 'testing-download' && 'Mbps Download'}
                    {status === 'testing-upload' && 'Mbps Upload'}
                    {status === 'testing-ping' && 'Pinging...'}
                    {(status === 'finished' || status === 'idle') && 'Mbps'}
                </p>
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
        setStatus('testing-ping');
        setCurrentSpeed(0);
        setDownloadSpeed(0);
        setUploadSpeed(0);
        setPing(0);
        setError(null);

        try {
            // 1. Test Ping
            const startTime = Date.now();
            await fetch('/favicon.ico', { cache: 'no-store', mode: 'no-cors' }); // Small file, no-cors to avoid some errors
            const endTime = Date.now();
            const currentPing = endTime - startTime;
            setPing(currentPing);

            // 2. Test Download
            setStatus('testing-download');
            let totalSize = 0;
            const testDuration = 8000; // 8 seconds for a more stable reading
            const downloadStartTime = Date.now();
            // Larger image for more accurate high-speed tests
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
                } catch (e) {
                    break;
                }
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
            const data = new Blob([new Uint8Array(1024 * 1024)], { type: 'application/octet-stream' }); // 1MB chunk

            while (Date.now() - uploadStartTime < testDuration) {
                try {
                     await fetch('/api/uptime-check', { method: 'POST', body: data }); // Re-using an existing API route
                    totalSize += data.size;
                    const duration = (Date.now() - uploadStartTime) / 1000;
                     if(duration > 0) {
                        const speedBps = (totalSize * 8) / duration;
                        const speedMbps = speedBps / 1_000_000;
                        setCurrentSpeed(speedMbps);
                    }
                } catch(e) {
                    // This might fail if the server doesn't accept the POST, but we can still estimate based on attempts
                    break;
                }
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
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Your Connection Speed</CardTitle>
                    <CardDescription>Click "GO" to start the analysis.</CardDescription>
                </CardHeader>
                <CardContent className="text-center space-y-8 py-10">
                    <SpeedGauge speed={currentSpeed} status={status} />

                    <AnimatePresence mode="wait">
                    {status === 'idle' || status === 'finished' ? (
                         <motion.div
                            key="start"
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.5, opacity: 0 }}
                          >
                            <Button 
                                onClick={status === 'idle' ? startTest : resetTest} 
                                className="w-40 h-40 rounded-full text-2xl font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow duration-300"
                            >
                                {status === 'idle' ? 'GO' : <RotateCw className="w-10 h-10" />}
                            </Button>
                        </motion.div>
                    ) : (
                         <motion.div
                            key="testing"
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.5, opacity: 0 }}
                         >
                            <Button 
                                disabled 
                                className="w-40 h-40 rounded-full text-2xl font-bold opacity-70"
                            >
                                <div className="w-10 h-10 border-4 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"/>
                            </Button>
                        </motion.div>
                    )}
                    </AnimatePresence>

                    {error && (
                         <p className="text-destructive text-center p-4 bg-destructive/10 rounded-md">{error}</p>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8">
                        <Card className="bg-black/20 p-4">
                            <CardHeader className="p-2 flex-row items-center gap-2">
                                <Zap className="w-5 h-5 text-primary" />
                                <CardTitle className="text-lg">Ping</CardTitle>
                            </CardHeader>
                            <CardContent className="p-2">
                                <p className="text-3xl font-bold">{ping.toFixed(0)} <span className="text-lg font-normal text-muted-foreground">ms</span></p>
                            </CardContent>
                        </Card>
                        <Card className="bg-black/20 p-4">
                             <CardHeader className="p-2 flex-row items-center gap-2">
                                <Download className="w-5 h-5 text-primary" />
                                <CardTitle className="text-lg">Download</CardTitle>
                            </CardHeader>
                            <CardContent className="p-2">
                                <p className="text-3xl font-bold">{downloadSpeed.toFixed(2)} <span className="text-lg font-normal text-muted-foreground">Mbps</span></p>
                            </CardContent>
                        </Card>
                         <Card className="bg-black/20 p-4">
                             <CardHeader className="p-2 flex-row items-center gap-2">
                                <Upload className="w-5 h-5 text-primary" />
                                <CardTitle className="text-lg">Upload</CardTitle>
                            </CardHeader>
                            <CardContent className="p-2">
                                <p className="text-3xl font-bold">{uploadSpeed.toFixed(2)} <span className="text-lg font-normal text-muted-foreground">Mbps</span></p>
                            </CardContent>
                        </Card>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

    