"use client";

import React, { useEffect, useState } from "react";

export default function ContributionGraph({ username }: { username: string }) {
  const [contributionCalendar, setContributionCalendar] = useState<any>([]);

  useEffect(() => {
    async function fetchContributions() {
      const GITHUB_GRAPHQL_URL = "https://api.github.com/graphql";
      const GITHUB_ACCESS_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

      const query = `
        query ($username: String!, $fromDate: DateTime!, $toDate: DateTime) {
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

      const fromDate = "2023-06-03T00:00:00Z";
      const toDate = "2023-07-03T23:59:59Z";

      const response = await fetch(GITHUB_GRAPHQL_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${GITHUB_ACCESS_TOKEN}`,
        },
        body: JSON.stringify({
          query,
          variables: { username, fromDate, toDate },
        }),
      });

      const data = await response.json();
      setContributionCalendar(
        data.data.user.contributionsCollection.contributionCalendar.weeks
      );
    }

    fetchContributions();
  }, [username]);

  const getColor = (count: number) => {
    if (count === 0) return "#ebedf0";
    if (count < 5) return "#c6e48b";
    if (count < 10) return "#7bc96f";
    return "#239a3b";
  };

  return (
    <div className="flex flex-row">
      {contributionCalendar.map((week: any, i: number) => (
        <div key={i} className="flex flex-col mr-1">
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
      ))}
    </div>
  );
}
