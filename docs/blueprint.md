# **App Name**: EchoLyze Pro

## Core Features:

- Voice Analysis API: Accepts Base64-encoded MP3 audio or an uploaded MP3 file (generating Base64 in the backend), validates the API key, and analyzes the voice to determine if it is AI-generated or human.
- Language Detection: Automatically identifies the language spoken in the provided audio and compares it with the user-selected language. Uses a tool to determine when to incorporate this information into the main classification output.
- Classification Output: Returns a JSON response indicating whether the audio is AI_GENERATED or HUMAN, along with a confidence score and an explanation.
- API Key Validation: Secures the API by validating the `x-api-key` header with the value `echolyze_hackathon_2026`.
- Home Page UI: An eye-catching landing page providing a description of the service, clear instructions for API usage, and an appealing design.
- Interactive API Page: A dedicated page with an input form to submit audio samples and view results. The language selection uses a dropdown menu with flag icons, home language text, and English translation in brackets. Displays real-time analysis results with visually appealing components.
- History and Documentation: A page to check the history and another one with detailed documentation on how to use the API, including request/response examples, and authentication rules.

## Style Guidelines:

- Primary color: Deep blue (#2E3192) evoking intelligence, depth, and reliability.
- Background color: Light gray (#E8E8E8), nearly desaturated from the primary hue, to ensure a clean, modern look without overwhelming the user.
- Accent color: Vibrant orange (#FF6B00), analogous to the blue but with higher saturation and brightness, drawing the eye to actionable elements.
- Font pairing: 'Space Grotesk' (sans-serif) for headlines and 'Inter' (sans-serif) for body text.
- Use minimalistic icons representing audio processing and language selection.
- Modern and responsive layout with clear sections for input, output, and documentation.
- Subtle loading animations and transitions to enhance user experience.