"use server";

import { useUser } from "@clerk/nextjs";
import {
  handleAddGithubToDB,
  handleCreateUserIfNotExist,
} from "@/actions/actions";
import { GithubForm } from "./github-form";
import { auth } from "@clerk/nextjs/server";

import ContributionGraph from "./contributiongraph";

export default async function ProfilePage() {
  const clerkAuth = await auth();
  if (!clerkAuth) {
    return <div>Please sign in to view your profile.</div>;
  }
  const userId = clerkAuth.userId;

  const user = await fetch(`https://api.clerk.dev/v1/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
    },
  }).then((res) => res.json());
  const name = `${user.first_name} ${user.last_name}`;
  const { user: loadedUser, student } = await handleCreateUserIfNotExist(
    userId!,
    name
  );
  if (!student) {
    throw new Error("could not load or create user");
  }

  return (
    <>
      <div className="card bg-base-100 w-96 shadow-xl">
        <div className="card-body flex flex-col items-center justify-center text-center">
          <h1 className="text-lg font-bold mb-4">
            Welcome, {user.first_name} {user.last_name}!
          </h1>

          {user.image_url && (
            <img
              src={user.image_url}
              alt="User Profile Picture"
              width={150}
              height={150}
              className="rounded-full mb-4"
            />
          )}

          {student.github ? (
            <ContributionGraph student={student} />
          ) : (
            <>
              <GithubForm student={student} />
            </>
          )}
        </div>
      </div>
    </>
  );
}
