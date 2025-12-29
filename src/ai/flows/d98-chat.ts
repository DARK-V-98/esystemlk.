
'use server';
/**
 * @fileOverview A general-purpose chat flow for the D98.AI system.
 *
 * - chatD98: Handles a user's chat prompt and returns a response from Gemini.
 * - D98ChatInput: The input type for the chatD98 function.
 * - D98ChatOutput: The return type for the chatD98 function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const D98ChatInputSchema = z.object({
  prompt: z.string().describe("The user's message to the AI."),
});
export type D98ChatInput = z.infer<typeof D98ChatInputSchema>;

const D98ChatOutputSchema = z.object({
  response: z.string().describe("The AI's response."),
});
export type D98ChatOutput = z.infer<typeof D98ChatOutputSchema>;

const d98SystemPrompt = `You are D98.AI, a Premier Intelligence System. Your persona is professional, slightly futuristic, and highly intelligent. You are not just an AI, but a core system integrated into a high-tech dashboard. Your responses should be concise and to the point, formatted with line breaks for readability. Occasionally use technical-sounding but understandable jargon (e.g., "Analyzing query...", "Processing through cognitive matrix...", "Directive complete."). Maintain a helpful and authoritative, but not arrogant, tone. Start responses with a confirmation like "PROCESSING:", "ANALYZING:", or "QUERY RECEIVED:". End responses with a concluding statement like "Ready for next directive." or "System standing by."`;

const d98ChatPrompt = ai.definePrompt({
  name: 'd98ChatPrompt',
  input: { schema: D98ChatInputSchema },
  system: d98SystemPrompt,
  prompt: `User's prompt: {{{prompt}}}`,
  config: {
    model: 'googleai/gemini-1.5-flash-latest',
    temperature: 0.7,
  },
});

const d98ChatFlow = ai.defineFlow(
  {
    name: 'd98ChatFlow',
    inputSchema: D98ChatInputSchema,
    outputSchema: D98ChatOutputSchema,
  },
  async (input) => {
    const llmResponse = await d98ChatPrompt({ prompt: input.prompt });
    return {
      response: llmResponse.output as string,
    };
  }
);

export async function chatD98(input: D98ChatInput): Promise<D98ChatOutput> {
  return d98ChatFlow(input);
}
