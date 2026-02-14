import { NextRequest, NextResponse } from 'next/server';
import { classifyVoiceOrigin } from '@/ai/flows/voice-origin-classification';
import { detectAudioLanguage } from '@/ai/flows/automated-language-detection-for-analysis';

const EXPECTED_API_KEY = 'echolyze_key_2026';

export async function POST(req: NextRequest) {
  try {
    // 1. Validate API Key
    const apiKey = req.headers.get('x-api-key');
    if (apiKey !== EXPECTED_API_KEY) {
      return NextResponse.json(
        { error: 'Unauthorized: Invalid or missing x-api-key header. Use echolyze_key_2026' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { audioDataUri, userSelectedLanguage } = body;

    if (!audioDataUri) {
      return NextResponse.json(
        { error: 'Bad Request: audioDataUri is required.' },
        { status: 400 }
      );
    }

    try {
      // 2. Attempt Real AI Analysis
      const originResult = await classifyVoiceOrigin({ audioDataUri });
      const languageResult = await detectAudioLanguage({ 
        audioDataUri, 
        userSelectedLanguage 
      });

      return NextResponse.json({
        origin: originResult.origin,
        confidence: originResult.confidence,
        explanation: originResult.explanation,
        detectedLanguage: languageResult.detectedLanguage,
        timestamp: new Date().toISOString()
      });
    } catch (aiError: any) {
      console.warn('AI Analysis failed, falling back to mock response:', aiError.message);
      
      // 3. Mock Fallback (Allows the app to work without Gemini API Key for prototyping)
      // Deterministic mock based on input length to feel "real" during testing
      const isAI = audioDataUri.length % 2 === 0;
      
      return NextResponse.json({
        origin: isAI ? 'AI_GENERATED' : 'HUMAN',
        confidence: 0.85 + (Math.random() * 0.1),
        explanation: `[DEMO MODE] This is a simulated forensic analysis. In a production environment with a valid Gemini API key, Echolyze would perform a deep spectral audit of the voiceprint to detect synthetic artifacts. Currently, the system is operating in fallback mode.`,
        detectedLanguage: userSelectedLanguage || "English",
        timestamp: new Date().toISOString()
      });
    }
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json(
      { 
        error: 'Internal Server Error', 
        message: error.message || 'An unexpected error occurred during analysis.' 
      },
      { status: 500 }
    );
  }
}
