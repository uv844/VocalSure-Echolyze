import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: 'AIzaSyCpY-y1ikZ6nJXYtx0jbDcSZIGKB4rG4Ng',
    }),
  ],
  model: 'googleai/gemini-2.5-flash',
});
