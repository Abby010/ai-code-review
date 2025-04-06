import { NextRequest, NextResponse } from 'next/server';
import type { CodeReviewRequest, CodeReviewFeedback } from '@/../shared/types/codeReview';
import { getCodeReviewFeedback } from '@/../shared/utils/openaiService';

export async function POST(req: NextRequest) {
  try {
    const body: CodeReviewRequest = await req.json();

    if (!body.code || typeof body.code !== 'string' || body.code.trim() === '') {
      return NextResponse.json({ error: 'Invalid or missing code input.' }, { status: 400 });
    }

    const aiResponse = await getCodeReviewFeedback(body.code);

    let parsedFeedback: CodeReviewFeedback[] = [];

    try {
      parsedFeedback = JSON.parse(aiResponse);
    } catch (err) {
      return NextResponse.json({ error: 'Failed to parse OpenAI response.' }, { status: 502 });
    }

    return NextResponse.json({ feedback: parsedFeedback });
  } catch (error) {
    console.error('[ERROR] /api/review', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
