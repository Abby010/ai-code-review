export async function fetchUserRepos(accessToken: string) {
    const response = await fetch('https://api.github.com/user/repos', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });
  
    if (!response.ok) {
      console.error('[GitHub] Failed to fetch repos:', await response.text());
      throw new Error('GitHub API error');
    }
  
    const repos = await response.json();
  
    // Return only relevant repo data
    return repos.map((repo: any) => ({
      id: repo.id,
      name: repo.name,
      fullName: repo.full_name,
      private: repo.private,
    }));
  }
  