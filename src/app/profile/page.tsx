"use server";

import { useUser } from "@clerk/nextjs";
import GitHubCommits from "./committracker";
import {
  handleAddGithubToDB,
  handleCreateUserIfNotExist,
} from "@/actions/actions";

export default async function ProfilePage() {
  const { user, isLoaded, isSignedIn } = useUser();

    if (!isLoaded || !isSignedIn || !user) {
    return <div>Please sign in to view your profile.</div>;
    }
      const userId = user.id;
      const name = `${user.firstName} ${user.lastName}`;
      const {user:loadedUser, student} = await handleCreateUserIfNotExist(userId, name);
      if(!student){
        throw new Error("could not load or create user")
      }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (githubUsername && userId) {
      handleAddGithubToDB(userId, githubUsername);
      setHasGithubUsername(true);
    }
  };


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

          {student.github ? (
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
