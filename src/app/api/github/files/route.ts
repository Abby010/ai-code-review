import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { fetchRepoFiles } from '@/../shared/utils/githubService';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions as any);
  if (!session || !session.accessToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { fullName } = await req.json();
  if (!fullName) {
    return NextResponse.json({ error: 'Missing repo name' }, { status: 400 });
  }

  const files = await fetchRepoFiles(fullName, session.accessToken);
  return NextResponse.json({ files });
}
