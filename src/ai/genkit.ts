import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

/**
 * Genkit configuration for Echolyze AI.
 * We use the string identifier for models to ensure maximum stability and avoid named export build errors.
 */
export const ai = genkit({
  plugins: [
    googleAI(),
  ],
  model: 'googleai/gemini-2.0-flash',
});
