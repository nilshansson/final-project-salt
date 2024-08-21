"use client";

import { SelectStudent } from "@/db/query";
import { useState, useEffect } from "react";
const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

interface GHCommitProps {
  student: SelectStudent;
}

export function GitHubCommits({ student }: GHCommitProps){
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
        const reposUrl = `https://api.github.com/users/${student.github}/repos`;

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
          const commitsUrl = `https://api.github.com/repos/${student.github}/${
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
  }, [student.github]);

  if (loading) {
    return <span className="loading loading-spinner loading-sm"></span>;
  }

  if (error) {
    return (
      <div role="alert" className="alert alert-error">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>{error}</span>
      </div>
    );
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
