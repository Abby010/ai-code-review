import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { NextRequest, NextResponse } from 'next/server';

type FileRequestBody = {
  owner: string;
  repo: string;
  path: string;
};

export async function POST(req: NextRequest) {
    type SessionWithToken = {
        accessToken?: string;
      };
      
    const session = await getServerSession(authOptions as any) as SessionWithToken;
      
      if (!session.accessToken) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }

  const body: FileRequestBody = await req.json();
  const { owner, repo, path } = body;

  try {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        Accept: 'application/vnd.github.v3.raw',
      },
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch file content' }, { status: response.status });
    }

    const content = await response.text();

    return NextResponse.json({ content });
  } catch (err) {
    return NextResponse.json({ error: 'Internal error while fetching file content' }, { status: 500 });
  }
}
