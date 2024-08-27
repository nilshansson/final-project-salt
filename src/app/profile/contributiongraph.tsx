"use client";

import React, { useEffect, useState } from "react";

interface GHCommitProps {
  student: {
    id: number;
    name: string;
    userId: string | null;
    classId: number | null;
    github: string | null;
  };
  courseStart: Date | null;
  courseEnd: Date | null;
}

export default function ContributionGraph({
  student,
  courseStart,
  courseEnd,
}: GHCommitProps) {
  const [contributionCalendar, setContributionCalendar] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const studentGithub = student.github;

  useEffect(() => {
    async function fetchContributions() {
      try {
        if (!studentGithub || !courseStart || !courseEnd) {
          throw new Error("Missing necessary data (GitHub username or dates)");
        }

        const GITHUB_GRAPHQL_URL = "https://api.github.com/graphql";
        const GITHUB_ACCESS_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

        const query = `
          query ($username: String!, $fromDate: DateTime!, $toDate: DateTime!) {
            user(login: $username) {
              contributionsCollection(from: $fromDate, to: $toDate) {
                contributionCalendar {
                  totalContributions
                  weeks {
                    contributionDays {
                      date
                      contributionCount
                    }
                  }
                }
              }
            }
          }
        `;

        const today = new Date();
        const fromDate = courseStart.toISOString();
        const toDate =
          courseEnd > today ? today.toISOString() : courseEnd.toISOString();

        const response = await fetch(GITHUB_GRAPHQL_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${GITHUB_ACCESS_TOKEN}`,
          },
          body: JSON.stringify({
            query,
            variables: { username: studentGithub, fromDate, toDate },
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch contributions");
        }

        const data = await response.json();
        setContributionCalendar(
          data.data.user.contributionsCollection.contributionCalendar.weeks
        );
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchContributions();
  }, [studentGithub, courseStart, courseEnd]);

  const getColor = (count: number) => {
    if (count === 0) return "#ebedf0";
    if (count < 5) return "#c6e48b";
    if (count < 10) return "#7bc96f";
    return "#239a3b";
  };

  if (isLoading) {
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
    <div className="flex flex-col bg-saltOrange w-full rounded-3xl py-3 justify-center items-center">
      {contributionCalendar.map((week: any, i: number) => {
        const weekTotalContributions = week.contributionDays.reduce(
          (sum: number, day: any) => sum + day.contributionCount,
          0
        );

        return (
          <div key={i} className="flex flex-row">
            <h3 className="text-sm">
              Week {i + 1}: {weekTotalContributions} commits
            </h3>

            <div className="flex flex-row">
              {week.contributionDays.map((day: any, j: number) => (
                <div
                  key={j}
                  title={`${day.contributionCount} contributions on ${day.date}`}
                  className="w-3 h-3 mb-1"
                  style={{
                    backgroundColor: getColor(day.contributionCount),
                  }}
                ></div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
