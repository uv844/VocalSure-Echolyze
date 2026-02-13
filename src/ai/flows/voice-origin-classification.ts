'use server';
/**
 * @fileOverview A voice origin classification AI agent.
 *
 * - classifyVoiceOrigin - A function that handles the voice origin classification process.
 * - VoiceOriginClassificationInput - The input type for the classifyVoiceOrigin function.
 * - VoiceOriginClassificationOutput - The return type for the classifyVoiceOrigin function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const VoiceOriginClassificationInputSchema = z.object({
  audioDataUri: z
    .string()
    .describe(
      "An audio file (MP3) as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type VoiceOriginClassificationInput = z.infer<
  typeof VoiceOriginClassificationInputSchema
>;

const VoiceOriginClassificationOutputSchema = z.object({
  origin: z
    .union([z.literal('AI_GENERATED'), z.literal('HUMAN')])
    .describe('The detected origin of the voice in the audio.'),
  confidence: z
    .number()
    .min(0)
    .max(1)
    .describe('A confidence score (0 to 1) for the origin classification.'),
  explanation: z
    .string()
    .describe('A concise explanation for the origin classification.'),
});
export type VoiceOriginClassificationOutput = z.infer<
  typeof VoiceOriginClassificationOutputSchema
>;

export async function classifyVoiceOrigin(
  input: VoiceOriginClassificationInput
): Promise<VoiceOriginClassificationOutput> {
  return voiceOriginClassificationFlow(input);
}

const voiceOriginClassificationPrompt = ai.definePrompt({
  name: 'voiceOriginClassificationPrompt',
  input: {schema: VoiceOriginClassificationInputSchema},
  output: {schema: VoiceOriginClassificationOutputSchema},
  prompt: `You are an expert voice analysis AI system. Your task is to analyze the provided audio and determine if the voice in it is AI-generated or human.

Based on your analysis, classify the voice origin as either 'AI_GENERATED' or 'HUMAN'. Provide a confidence score between 0 and 1 (where 1 is highest confidence) for your classification, and a concise explanation for your determination.

Audio: {{media url=audioDataUri}}`,
});

const voiceOriginClassificationFlow = ai.defineFlow(
  {
    name: 'voiceOriginClassificationFlow',
    inputSchema: VoiceOriginClassificationInputSchema,
    outputSchema: VoiceOriginClassificationOutputSchema,
  },
  async input => {
    const {output} = await voiceOriginClassificationPrompt(input);
    return output!;
  }
);
