import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: process.env.GOOGLE_GENAI_API_KEY || 'AIzaSyCpY-y1ikZ6nJXYtx0jbDcSZIGKB4rG4Ng',
    }),
  ],
  model: 'googleai/gemini-1.5-flash-latest',
});
