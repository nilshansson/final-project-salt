"use client";

import { useUser } from "@clerk/nextjs";
import GitHubCommits from "./committracker";

export default function ProfilePage() {
  const { user, isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

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

          <GitHubCommits username="nilshansson" />
        </div>
      </div>
    </>
  );
}
