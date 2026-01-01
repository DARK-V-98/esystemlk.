"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, Download, Upload, Zap, Gauge, Play } from 'lucide-react';
import Link from 'next/link';

type TestStatus = 'idle' | 'testing-ping' | 'testing-download' | 'testing-upload' | 'finished';

const SpeedGauge = ({ speed, status }: { speed: number; status: TestStatus }) => {
    const getRotation = (s: number) => {
        // Map speed (0-100+) to rotation (-90 to 90 degrees)
        const logSpeed = Math.log10(s + 1); // Use log scale for better visualization
        const maxLogSpeed = Math.log10(101); // 100 Mbps
        const rotation = (logSpeed / maxLogSpeed) * 180 - 90;
        return Math.min(Math.max(rotation, -90), 90);
    };

    return (
        <div className="relative w-64 h-32 mx-auto mb-4">
            <div
                className="absolute w-full h-full bg-gradient-to-b from-primary/20 to-transparent rounded-t-full"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
            />
            <div 
                className="absolute bottom-0 left-1/2 w-4 h-32 bg-primary rounded-full transition-transform duration-300 ease-out origin-bottom"
                style={{ transform: `translateX(-50%) rotate(${getRotation(speed)}deg)` }}
            />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-8 bg-background rounded-full border-4 border-primary" />
            <div className="absolute bottom-0 w-full text-center">
                <p className="text-4xl font-bold text-primary">
                    {speed.toFixed(2)}
                </p>
                <p className="text-sm text-muted-foreground">
                    {status === 'testing-download' && 'Mbps Download'}
                    {status === 'testing-upload' && 'Mbps Upload'}
                    {status === 'testing-ping' && 'Pinging...'}
                    {status === 'finished' && 'Mbps'}
                    {status === 'idle' && 'Speed Test'}
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

    const startTest = async () => {
        setStatus('testing-ping');
        setCurrentSpeed(0);
        setDownloadSpeed(0);
        setUploadSpeed(0);
        setPing(0);

        // 1. Test Ping
        const startTime = Date.now();
        await fetch('/favicon.ico', { cache: 'no-store' }); // Small file request
        const endTime = Date.now();
        const currentPing = endTime - startTime;
        setPing(currentPing);

        // 2. Test Download
        setStatus('testing-download');
        let totalSize = 0;
        const testDuration = 5000; // 5 seconds
        const downloadStartTime = Date.now();
        const imageUrl = 'https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=2100';

        const download = async () => {
            const response = await fetch(`${imageUrl}&t=${new Date().getTime()}`, { cache: 'no-store' });
            const reader = response.body!.getReader();
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                totalSize += value.length;
                const duration = (Date.now() - downloadStartTime) / 1000;
                const speedBps = (totalSize * 8) / duration;
                const speedMbps = speedBps / 1_000_000;
                setCurrentSpeed(speedMbps);
                 if (Date.now() - downloadStartTime > testDuration) break;
            }
        };
        await download();
        const finalDownloadDuration = (Date.now() - downloadStartTime) / 1000;
        const finalDownloadSpeed = ((totalSize * 8) / finalDownloadDuration) / 1_000_000;
        setDownloadSpeed(finalDownloadSpeed);
        
        // 3. Test Upload
        setStatus('testing-upload');
        setCurrentSpeed(0);
        totalSize = 0;
        const uploadStartTime = Date.now();
        const data = new Blob([new Uint8Array(1024 * 1024)], { type: 'application/octet-stream' }); // 1MB chunk

        const upload = async () => {
            while (Date.now() - uploadStartTime < testDuration) {
                await fetch('/api/uptime-check', { method: 'POST', body: data });
                totalSize += data.size;
                const duration = (Date.now() - uploadStartTime) / 1000;
                const speedBps = (totalSize * 8) / duration;
                const speedMbps = speedBps / 1_000_000;
                setCurrentSpeed(speedMbps);
            }
        };
        await upload();
        const finalUploadDuration = (Date.now() - uploadStartTime) / 1000;
        const finalUploadSpeed = ((totalSize * 8) / finalUploadDuration) / 1_000_000;
        setUploadSpeed(finalUploadSpeed);

        setStatus('finished');
        setCurrentSpeed(0);
    };

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
                <CardHeader>
                    <CardTitle>Speed Test</CardTitle>
                    <CardDescription>Click "Start Test" to begin the analysis.</CardDescription>
                </CardHeader>
                <CardContent className="text-center space-y-8">
                    <SpeedGauge speed={currentSpeed} status={status} />

                    <Button onClick={startTest} disabled={status.startsWith('testing')} size="xl">
                        <Play className="mr-2 h-5 w-5" />
                        {status.startsWith('testing') ? 'Testing...' : 'Start Test'}
                    </Button>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8">
                        <Card className="bg-black/20 p-4">
                            <CardHeader className="p-2 flex-row items-center gap-2">
                                <Zap className="w-5 h-5 text-primary" />
                                <CardTitle className="text-lg">Ping</CardTitle>
                            </CardHeader>
                            <CardContent className="p-2">
                                <p className="text-3xl font-bold">{ping.toFixed(0)} <span className="text-lg font-normal">ms</span></p>
                            </CardContent>
                        </Card>
                        <Card className="bg-black/20 p-4">
                             <CardHeader className="p-2 flex-row items-center gap-2">
                                <Download className="w-5 h-5 text-primary" />
                                <CardTitle className="text-lg">Download</CardTitle>
                            </CardHeader>
                            <CardContent className="p-2">
                                <p className="text-3xl font-bold">{downloadSpeed.toFixed(2)} <span className="text-lg font-normal">Mbps</span></p>
                            </CardContent>
                        </Card>
                         <Card className="bg-black/20 p-4">
                             <CardHeader className="p-2 flex-row items-center gap-2">
                                <Upload className="w-5 h-5 text-primary" />
                                <CardTitle className="text-lg">Upload</CardTitle>
                            </CardHeader>
                            <CardContent className="p-2">
                                <p className="text-3xl font-bold">{uploadSpeed.toFixed(2)} <span className="text-lg font-normal">Mbps</span></p>
                            </CardContent>
                        </Card>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}