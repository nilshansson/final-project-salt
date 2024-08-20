"use client";

import { useUser } from "@clerk/nextjs";
import GitHubCommits from "./committracker";
import { useEffect, useState } from "react";
import {
  handleAddGithubToDB,
  handleCreateUserIfNotExist,
} from "@/actions/actions";

export default function ProfilePage() {
  const [hasGithubUsername, setHasGithubUsername] = useState(false);
  const [githubUsername, setGithubUsername] = useState("");
  const { user, isLoaded, isSignedIn } = useUser();

  const userId = user?.id;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (githubUsername && userId) {
      handleAddGithubToDB(userId, githubUsername);
      setHasGithubUsername(true);
    }
  };

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      const userId = user.id;
      const name = `${user.firstName} ${user.lastName}`;
      handleCreateUserIfNotExist(userId, name);
    }
  }, [isLoaded, isSignedIn, user]);

  if (!isSignedIn) {
    return <div>Please sign in to view your profile.</div>;
  }

  return (
    <>
      <div className="card bg-base-100 w-96 shadow-xl">
        <div className="card-body flex flex-col items-center justify-center text-center">
          <h1 className="text-lg font-bold mb-4">
            Welcome, {user.firstName} {user.lastName}!
          </h1>

          {user.imageUrl && (
            <img
              src={user.imageUrl}
              alt="User Profile Picture"
              width={150}
              height={150}
              className="rounded-full mb-4"
            />
          )}

          {hasGithubUsername ? (
            <GitHubCommits username={githubUsername} />
          ) : (
            <form onSubmit={handleSubmit} className="join">
              <input
                className="input input-bordered join-item"
                placeholder="GitHub Username"
                value={githubUsername}
                onChange={(e) => setGithubUsername(e.target.value)}
              />
              <button type="submit" className="btn join-item rounded-r-full">
                Add
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
