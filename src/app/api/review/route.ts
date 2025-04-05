import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.code || typeof body.code !== 'string' || body.code.trim() === '') {
      return NextResponse.json({ error: 'Invalid or missing code input.' }, { status: 400 });
    }

    // TODO: AI logic or dummy response will go here
    return NextResponse.json({
      message: 'Code received successfully',
      codeLength: body.code.length,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
