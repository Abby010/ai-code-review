import { NextRequest, NextResponse } from 'next/server';
import type { CodeReviewRequest, CodeReviewFeedback } from '@/../shared/types/codeReview';

export async function POST(req: NextRequest) {
  try {
    const body: CodeReviewRequest = await req.json();

    if (!body.code || typeof body.code !== 'string' || body.code.trim() === '') {
      return NextResponse.json({ error: 'Invalid or missing code input.' }, { status: 400 });
    }

    // Dummy feedback
    const dummyFeedback: CodeReviewFeedback[] = [
      { line: 2, message: 'Consider renaming variable for clarity.' },
      { line: 5, message: 'Possible off-by-one error in loop condition.' },
    ];

    return NextResponse.json({ feedback: dummyFeedback });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
