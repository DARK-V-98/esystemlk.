
"use client";

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, Play, Pause, Download, Volume2, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { generateSpeech, type TTSVoice } from '@/ai/flows/tts-flow';

// Supported voices for the AI model
const supportedVoices: { name: string, gender: string }[] = [
    { name: 'Alloy', gender: 'Male' },
    { name: 'Echo', gender: 'Male' },
    { name: 'Fable', gender: 'Male' },
    { name: 'Onyx', gender: 'Male' },
    { name: 'Nova', gender: 'Female' },
    { name: 'Shimmer', gender: 'Female' },
];

export default function TextToSpeechPage() {
  const [text, setText] = useState('Hello world! Welcome to our advanced text-to-speech tool powered by AI.');
  const [selectedVoice, setSelectedVoice] = useState<TTSVoice>('Alloy');
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1); // Note: Pitch might not be supported by all models, but we keep it for UI consistency
  const [isLoading, setIsLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const onPlaying = () => setIsPlaying(true);
    const onPauseOrEnd = () => setIsPlaying(false);
    
    audio.addEventListener('play', onPlaying);
    audio.addEventListener('pause', onPauseOrEnd);
    audio.addEventListener('ended', onPauseOrEnd);

    return () => {
      audio.removeEventListener('play', onPlaying);
      audio.removeEventListener('pause', onPauseOrEnd);
      audio.removeEventListener('ended', onPauseOrEnd);
    };
  }, [audioRef.current]);

  const handleGenerateSpeech = async () => {
    if (!text.trim()) return;

    setIsLoading(true);
    setAudioUrl(null);
    if(audioRef.current) {
        audioRef.current.pause();
    }
    
    try {
      const result = await generateSpeech({ text, voice: selectedVoice, rate, pitch });
      if (result.media) {
        setAudioUrl(result.media);
      } else {
        throw new Error('No audio data received.');
      }
    } catch (error) {
      console.error("Error generating speech:", error);
      // You could show a toast notification here
    } finally {
      setIsLoading(false);
    }
  };
  
  const handlePlayPause = () => {
      if (!audioRef.current) return;
      
      if (isPlaying) {
          audioRef.current.pause();
      } else {
          audioRef.current.play();
      }
  }

  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <div className="bg-black/30 backdrop-blur-lg border border-white/10 shadow-2xl rounded-3xl py-8 text-center mb-10">
        <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">AI Text to Speech</h1>
        <p className="text-white/80 md:text-xl mt-4 max-w-3xl mx-auto">
          Convert text to high-quality audio using an advanced AI model.
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
          <CardTitle>Converter</CardTitle>
          <CardDescription>Enter text, choose your settings, and generate the audio.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text to speak..."
              className="h-40 text-base"
            />
            
            <div className="grid md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <Label htmlFor="voice">AI Voice</Label>
                    <Select value={selectedVoice} onValueChange={(v) => setSelectedVoice(v as TTSVoice)}>
                        <SelectTrigger id="voice">
                            <SelectValue placeholder="Select a voice..." />
                        </SelectTrigger>
                        <SelectContent>
                            {supportedVoices.map(voice => (
                                <SelectItem key={voice.name} value={voice.name}>
                                    {voice.name} ({voice.gender})
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="rate">Rate ({rate.toFixed(1)})</Label>
                    <Slider id="rate" value={[rate]} onValueChange={(val) => setRate(val[0])} min={0.5} max={2} step={0.1} />
                </div>
            </div>

            <Button onClick={handleGenerateSpeech} disabled={isLoading} className="w-full" size="lg">
                {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin"/> : <Volume2 className="mr-2 h-5 w-5" />}
                {isLoading ? 'Generating Audio...' : 'Generate Speech'}
            </Button>
            
            {audioUrl && (
                <div className="space-y-4 pt-4 border-t border-border">
                    <h3 className="text-center font-semibold">Generated Audio</h3>
                    <audio ref={audioRef} src={audioUrl} className="w-full" controls />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Button onClick={handlePlayPause} variant="secondary">
                             {isPlaying ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
                             {isPlaying ? 'Pause' : 'Play'}
                        </Button>
                         <Button asChild>
                           <a href={audioUrl} download="speech.wav">
                             <Download className="mr-2 h-4 w-4" /> Download WAV
                           </a>
                        </Button>
                    </div>
                </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
