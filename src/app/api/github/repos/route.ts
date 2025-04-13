import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { fetchUserRepos } from '@/../shared/utils/githubService';
import { NextResponse } from 'next/server';

type SessionWithToken = {
  accessToken?: string;
};

export async function GET() {
  const session = (await getServerSession(authOptions as any)) as SessionWithToken;

  if (!session || !session.accessToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const repos = await fetchUserRepos(session.accessToken);
    return NextResponse.json({ repos });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch repositories' }, { status: 500 });
  }
}
