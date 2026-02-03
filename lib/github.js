const GITHUB_API = "https://api.github.com";

const headers = {
  Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  "Accept": "application/vnd.github+json",
};

export async function getUserRepos() {
  const res = await fetch(
    `${GITHUB_API}/users/${process.env.GITHUB_USERNAME}/repos?per_page=100`,
    { headers, next: { revalidate: 3600 } } // cache 1 hour
  );

  if (!res.ok) {
    throw new Error("Failed to fetch GitHub repos");
  }

  return res.json();
}


export async function getGitHubStats() {
  const reposRes = await fetch(
    `https://api.github.com/users/${process.env.GITHUB_USERNAME}/repos?per_page=100`,
    {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
      },
      next: { revalidate: 3600 },
    }
  );

  if (!reposRes.ok) {
    throw new Error("Failed to fetch repos");
  }

  const repos = await reposRes.json();

  const repoCount = repos.length;

  // Approximate commits (cheap & safe)
  const commitCount = repos.reduce(
    (sum, repo) => sum + (repo.size || 0),
    0
  );

  return {
    repoCount,
    commitCount,
  };
}


export async function fetchRepos() {
  const username = process.env.GITHUB_USERNAME;
  const token = process.env.GITHUB_TOKEN;

  if (!username) throw new Error("GITHUB_USERNAME not set");
  if (!token) console.warn("GITHUB_TOKEN not set — will use unauthenticated requests");

  try {
    const res = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=10&sort=updated`,
      {
        headers: token
          ? {
              Authorization: `Bearer ${token}`,
              Accept: "application/vnd.github+json",
            }
          : { Accept: "application/vnd.github+json" },
        next: { revalidate: 3600 }, // ISR: rebuild every hour
      }
    );

    if (!res.ok) {
      throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();

    // Filter out forks
    return data.filter(repo => !repo.fork);
  } catch (error) {
    console.error("Failed to fetch GitHub repos:", error);
    return [];
  }
}
