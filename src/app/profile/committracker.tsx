import { useState, useEffect } from "react";
const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

const GitHubCommits = ({ username }: { username: string }) => {
  const [totalCommits, setTotalCommits] = useState<number | null>(null);
  const [weeklyCommits, setWeeklyCommits] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGitHubData = async () => {
      if (!GITHUB_TOKEN) {
        setError("GitHub token is missing.");
        setLoading(false);
        return;
      }

      const startDate = new Date("2024-06-03T00:00:00Z");
      const oneWeek = 7 * 24 * 60 * 60 * 1000;
      const endDate = new Date(startDate.getTime() + 4 * oneWeek);
      try {
        const reposUrl = `https://api.github.com/users/${username}/repos`;

        const reposResponse = await fetch(reposUrl, {
          headers: {
            Authorization: `token ${GITHUB_TOKEN}`,
          },
        });

        if (!reposResponse.ok) {
          throw new Error(`Repos API error: ${reposResponse.statusText}`);
        }

        const repos = await reposResponse.json();

        let totalCommits = 0;
        const weeklyCommitsArray = Array(4).fill(0);

        for (const repo of repos) {
          const commitsUrl = `https://api.github.com/repos/${username}/${
            repo.name
          }/commits?since=${startDate.toISOString()}&until=${endDate.toISOString()}`;
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

          const commits = await commitsResponse.json();

          for (const commit of commits) {
            const commitDate = new Date(commit.commit.author.date).getTime();
            const weekIndex = Math.floor(
              (commitDate - startDate.getTime()) / oneWeek
            );
            if (weekIndex >= 0 && weekIndex < 4) {
              weeklyCommitsArray[weekIndex]++;
              totalCommits++;
            }
          }
        }

        setTotalCommits(totalCommits);
        setWeeklyCommits(weeklyCommitsArray);
        setLoading(false);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred.");
        }
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
      <h2>Total Commits since Precourse start: {totalCommits}</h2>
      <h3>Commits per Week:</h3>
      <ul>
        {weeklyCommits.map((commits, index) => (
          <li key={index}>
            Week {index + 1}: {commits} commits
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GitHubCommits;
