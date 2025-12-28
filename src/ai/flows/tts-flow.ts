
'use server';

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import wav from 'wav';
import { googleAI } from '@genkit-ai/google-genai';

const ttsVoices = z.enum(['Alloy', 'Echo', 'Fable', 'Onyx', 'Nova', 'Shimmer']);
export type TTSVoice = z.infer<typeof ttsVoices>;

const TTSInputSchema = z.object({
  text: z.string().describe('The text to be converted to speech.'),
  voice: ttsVoices.default('Alloy').describe('The voice to use for the speech synthesis.'),
  rate: z.number().min(0.5).max(2).default(1).describe('The speaking rate.'),
  pitch: z.number().min(0).max(2).default(1).describe('The speaking pitch.'),
});

export type TTSInput = z.infer<typeof TTSInputSchema>;

const TTSOutputSchema = z.object({
  media: z.string().describe("A data URI of the generated audio in WAV format. 'data:audio/wav;base64,...'").optional(),
});

export type TTSOutput = z.infer<typeof TTSOutputSchema>;

export async function generateSpeech(input: TTSInput): Promise<TTSOutput> {
  return ttsFlow(input);
}

const ttsFlow = ai.defineFlow(
  {
    name: 'ttsFlow',
    inputSchema: TTSInputSchema,
    outputSchema: TTSOutputSchema,
  },
  async (input) => {
    const { media } = await ai.generate({
      model: googleAI.model('gemini-2.5-flash-preview-tts'),
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: input.voice },
          },
          // Rate and Pitch are not directly supported in this model's config,
          // but we keep them in the schema for future compatibility.
        },
      },
      prompt: input.text,
    });
    
    if (!media) {
      throw new Error('No media returned from the TTS model.');
    }

    const audioBuffer = Buffer.from(
      media.url.substring(media.url.indexOf(',') + 1),
      'base64'
    );

    const wavData = await toWav(audioBuffer);

    return {
      media: 'data:audio/wav;base64,' + wavData,
    };
  }
);


async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    const bufs: any[] = [];
    writer.on('error', reject);
    writer.on('data', function (d) {
      bufs.push(d);
    });
    writer.on('end', function () {
      resolve(Buffer.concat(bufs).toString('base64'));
    });

    writer.write(pcmData);
    writer.end();
  });
}
