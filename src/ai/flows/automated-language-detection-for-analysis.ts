'use server';
/**
 * @fileOverview A Genkit flow for automated language detection in audio files.
 * It analyzes the provided audio to identify the spoken language and offers insights
 * for enhancing voice classification, optionally comparing with a user-selected language.
 *
 * - detectAudioLanguage - A function that handles the audio language detection process.
 * - DetectAudioLanguageInput - The input type for the detectAudioLanguage function.
 * - DetectAudioLanguageOutput - The return type for the detectAudioLanguage function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Input schema for the language detection flow
const DetectAudioLanguageInputSchema = z.object({
  audioDataUri: z
    .string()
    .describe(
      "Audio content as a data URI that must include a MIME type (e.g., audio/mp3) and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  userSelectedLanguage: z
    .string()
    .optional()
    .describe(
      'An optional user-selected language for comparison, e.g., "English", "Spanish".'
    ),
});
export type DetectAudioLanguageInput = z.infer<
  typeof DetectAudioLanguageInputSchema
>;

// Output schema for the language detection flow
const DetectAudioLanguageOutputSchema = z.object({
  detectedLanguage: z
    .string()
    .describe('The primary language detected in the audio (e.g., "English").'),
  confidenceScore: z
    .number()
    .min(0)
    .max(1)
    .describe('A confidence score (0.0 to 1.0) for the language detection.'),
  languageMatchVerdict: z
    .string()
    .optional()
    .describe(
      'A verdict on whether the detected language matches the user-selected language, if provided.'
    ),
  analysisGuidance: z
    .string()
    .describe(
      'Guidance on how this language information can enhance AI/human voice classification.'
    ),
});
export type DetectAudioLanguageOutput = z.infer<
  typeof DetectAudioLanguageOutputSchema
>;

export async function detectAudioLanguage(
  input: DetectAudioLanguageInput
): Promise<DetectAudioLanguageOutput> {
  return automatedLanguageDetectionForAnalysisFlow(input);
}

const languageDetectionPrompt = ai.definePrompt({
  name: 'languageDetectionPrompt',
  input: { schema: DetectAudioLanguageInputSchema },
  output: { schema: DetectAudioLanguageOutputSchema },
  prompt: `You are an expert language detection AI for audio analysis. Your task is to analyze the provided audio and accurately identify the primary language spoken.

If a 'userSelectedLanguage' is provided, compare your detected language with it and explain any discrepancies or matches.

Finally, explain how knowing the specific language of an audio can help enhance the accuracy and contextual relevance of AI/human voice classification.

Output your response in JSON format according to the provided schema.

Audio for analysis: {{media url=audioDataUri}}

{{#if userSelectedLanguage}}
User-selected language for comparison: {{{userSelectedLanguage}}}
{{/if}}`,
});

const automatedLanguageDetectionForAnalysisFlow = ai.defineFlow(
  {
    name: 'automatedLanguageDetectionForAnalysisFlow',
    inputSchema: DetectAudioLanguageInputSchema,
    outputSchema: DetectAudioLanguageOutputSchema,
  },
  async (input) => {
    const { output } = await languageDetectionPrompt(input);
    if (!output) {
      throw new Error('Failed to detect language from audio.');
    }
    return output;
  }
);
