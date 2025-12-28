"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, Play, Pause, Square, Volume2 } from 'lucide-react';
import Link from 'next/link';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function TextToSpeechPage() {
  const [text, setText] = useState('Hello world! Welcome to our text-to-speech tool.');
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>('');
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      if (availableVoices.length > 0) {
        setVoices(availableVoices);
        // Set a default voice, prefer a local one
        const defaultVoice = availableVoices.find(v => v.lang.includes('en') && v.localService) || availableVoices[0];
        if (defaultVoice) {
            setSelectedVoice(defaultVoice.name);
        }
      }
    };
    
    // Voices are loaded asynchronously
    window.speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices(); // Initial call in case voices are already loaded

    return () => {
        window.speechSynthesis.onvoiceschanged = null;
        window.speechSynthesis.cancel();
    }
  }, []);

  const handleSpeak = () => {
    if (isSpeaking) {
      window.speechSynthesis.pause();
      setIsSpeaking(false);
      return;
    }
    
    if(window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
        setIsSpeaking(true);
        return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    const voice = voices.find(v => v.name === selectedVoice);
    if (voice) {
      utterance.voice = voice;
    }
    utterance.rate = rate;
    utterance.pitch = pitch;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onpause = () => setIsSpeaking(false);
    utterance.onresume = () => setIsSpeaking(true);
    
    window.speechSynthesis.speak(utterance);
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };


  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <div className="bg-black/30 backdrop-blur-lg border border-white/10 shadow-2xl rounded-3xl py-8 text-center mb-10">
        <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">Text to Speech</h1>
        <p className="text-white/80 md:text-xl mt-4 max-w-3xl mx-auto">
          Convert text to audio using the Web Speech API.
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
          <CardDescription>Enter text, choose your settings, and press play.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text to speak..."
              className="h-40 text-base"
            />
            
            <div className="grid md:grid-cols-3 gap-6">
                 <div className="space-y-2">
                    <Label htmlFor="voice">Voice</Label>
                    <Select value={selectedVoice} onValueChange={setSelectedVoice}>
                        <SelectTrigger id="voice">
                            <SelectValue placeholder="Select a voice..." />
                        </SelectTrigger>
                        <SelectContent>
                            {voices.map(voice => (
                                <SelectItem key={voice.name} value={voice.name}>
                                    {voice.name} ({voice.lang})
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="rate">Rate ({rate.toFixed(1)})</Label>
                    <Slider id="rate" value={[rate]} onValueChange={(val) => setRate(val[0])} min={0.5} max={2} step={0.1} />
                </div>
                <div className="space-y-2">
                     <Label htmlFor="pitch">Pitch ({pitch.toFixed(1)})</Label>
                    <Slider id="pitch" value={[pitch]} onValueChange={(val) => setPitch(val[0])} min={0} max={2} step={0.1} />
                </div>
            </div>

            <div className="flex justify-center gap-4">
                <Button onClick={handleSpeak} size="lg">
                    {isSpeaking ? <Pause className="mr-2 h-5 w-5" /> : <Play className="mr-2 h-5 w-5" />}
                    {isSpeaking ? 'Pause' : (window.speechSynthesis.paused ? 'Resume' : 'Play')}
                </Button>
                <Button onClick={handleStop} variant="destructive" size="lg">
                    <Square className="mr-2 h-5 w-5" /> Stop
                </Button>
            </div>

        </CardContent>
      </Card>
    </div>
  );
}