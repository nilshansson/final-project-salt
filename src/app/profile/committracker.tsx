import { useState, useEffect } from "react";
const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

const GitHubCommits = ({ username }: { username: string }) => {
  const [totalCommits, setTotalCommits] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGitHubData = async () => {
      if (!GITHUB_TOKEN) {
        setError("GitHub token is missing.");
        setLoading(false);
        return;
      }

      const since = "2024-06-03T00:00:00Z";

      try {
        const userUrl = `https://api.github.com/users/${username}`;
        const reposUrl = `https://api.github.com/users/${username}/repos`;

        const userResponse = await fetch(userUrl, {
          headers: {
            Authorization: `token ${GITHUB_TOKEN}`,
          },
        });

        if (!userResponse.ok) {
          throw new Error(`User API error: ${userResponse.statusText}`);
        }

        const user = await userResponse.json();
        console.log("Fetched user:", user);

        const reposResponse = await fetch(reposUrl, {
          headers: {
            Authorization: `token ${GITHUB_TOKEN}`,
          },
        });

        if (!reposResponse.ok) {
          throw new Error(`Repos API error: ${reposResponse.statusText}`);
        }

        const repos = await reposResponse.json();
        console.log("Fetched repos:", repos);

        let totalCommits = 0;

        for (const repo of repos) {
          const commitsUrl = `https://api.github.com/repos/${username}/${repo.name}/commits?since=${since}&per_page=1`;
          const commitsResponse = await fetch(commitsUrl, {
            headers: {
              Authorization: `token ${GITHUB_TOKEN}`,
            },
          });

          if (commitsResponse.status === 409) {
            continue;
          }

          if (!commitsResponse.ok) {
            throw new Error(`Commits API error: ${commitsResponse.statusText}`);
          }

          const commits = commitsResponse.headers.get("link");

          if (commits) {
            const match = commits.match(/&page=(\d+)>; rel="last"/);
            if (match) {
              totalCommits += parseInt(match[1], 10);
            }
          }
        }

        setTotalCommits(totalCommits);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Error fetching GitHub data.");
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, [username]);

  if (loading) {
    return <div>Loading GitHub commits...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>GitHub User: {username}</h1>
      <h2>Total Commits since start of the precourse: {totalCommits}</h2>
    </div>
  );
};

export default GitHubCommits;
