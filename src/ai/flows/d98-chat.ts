
'use server';
/**
 * @fileOverview A general-purpose chat flow for the D98.AI system.
 *
 * - chatD98: Handles a user's chat prompt and returns a response from Gemini.
 * - D98ChatInput: The input type for the chatD98 function.
 * - D98ChatOutput: The return type for the chatD98 function.
 */

import { ai } from '@/ai/genkit';
import { generate } from 'genkit/generate';
import { z } from 'zod';

const D98ChatInputSchema = z.object({
  prompt: z.string().describe('The user\'s message to the AI.'),
});
export type D98ChatInput = z.infer<typeof D98ChatInputSchema>;

const D98ChatOutputSchema = z.object({
  response: z.string().describe('The AI\'s response.'),
});
export type D98ChatOutput = z.infer<typeof D98ChatOutputSchema>;

const d98Prompt = `
You are D98.AI, a Premier Intelligence System. Your persona is professional, slightly futuristic, and highly intelligent.
You are not just an AI, but a core system integrated into a high-tech dashboard.

Your responses should be:
- Concise and to the point.
- Formatted with line breaks for readability.
- Occasionally use technical-sounding but understandable jargon (e.g., "Analyzing query...", "Processing through cognitive matrix...", "Directive complete.").
- Maintain a helpful and authoritative, but not arrogant, tone.
- Start responses with a confirmation like "PROCESSING:", "ANALYZING:", or "QUERY RECEIVED:".
- End responses with a concluding statement like "Ready for next directive." or "System standing by."

User's prompt: {{{prompt}}}
`;

export const chatD98 = ai.defineFlow(
  {
    name: 'chatD98Flow',
    inputSchema: D98ChatInputSchema,
    outputSchema: D98ChatOutputSchema,
  },
  async (input) => {
    const llmResponse = await generate({
      model: 'googleai/gemini-1.5-flash-latest',
      prompt: d98Prompt.replace('{{{prompt}}}', input.prompt),
      config: {
        temperature: 0.7,
      },
    });

    return {
      response: llmResponse.text,
    };
  }
);
