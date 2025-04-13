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
  
  export async function fetchRepoFiles(fullName: string, accessToken: string) {
    const url = `https://api.github.com/repos/${fullName}/contents`;
  
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });
  
    if (!response.ok) {
      console.error('[GitHub] Failed to fetch files:', await response.text());
      throw new Error('GitHub API error');
    }
  
    const contents = await response.json();
    return contents.filter((item: any) => item.type === 'file').map((file: any) => ({
      name: file.name,
      path: file.path,
    }));
  }
  