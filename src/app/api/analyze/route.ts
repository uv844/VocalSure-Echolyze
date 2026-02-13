
import { NextRequest, NextResponse } from 'next/server';
import { classifyVoiceOrigin } from '@/ai/flows/voice-origin-classification';
import { detectAudioLanguage } from '@/ai/flows/automated-language-detection-for-analysis';

const EXPECTED_API_KEY = 'echolyze_hackathon_2026';

export async function POST(req: NextRequest) {
  try {
    // 1. Validate API Key
    const apiKey = req.headers.get('x-api-key');
    if (apiKey !== EXPECTED_API_KEY) {
      return NextResponse.json(
        { error: 'Unauthorized: Invalid or missing x-api-key header.' },
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

    // 2. Run Voice Origin Classification
    const originResult = await classifyVoiceOrigin({ audioDataUri });

    // 3. Run Language Detection
    const languageResult = await detectAudioLanguage({ 
      audioDataUri, 
      userSelectedLanguage 
    });

    // 4. Combine results
    const combinedResponse = {
      ...originResult,
      detectedLanguage: languageResult.detectedLanguage,
      languageConfidence: languageResult.confidenceScore,
      languageMatchVerdict: languageResult.languageMatchVerdict,
      analysisGuidance: languageResult.analysisGuidance,
      timestamp: new Date().toISOString()
    };

    return NextResponse.json(combinedResponse);
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', message: error.message },
      { status: 500 }
    );
  }
}
