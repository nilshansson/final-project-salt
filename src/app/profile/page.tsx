"use server";

import { auth } from "@clerk/nextjs/server";
import { handleCreateUserIfNotExist } from "@/actions/actions";
import { getCourseDatesByClassId } from "@/db/query";
import ContributionGraph from "./contributiongraph";
import { GithubForm } from "./github-form";

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
  const { student } = await handleCreateUserIfNotExist(userId!, name);
  if (!student) {
    throw new Error("Could not load or create user");
  }

  const { courseStart, courseEnd } = await getCourseDatesByClassId(
    student.classId
  );

  return (
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
          <>
            <h1>commits since precourse start: </h1>
            <ContributionGraph
              student={student}
              courseStart={courseStart}
              courseEnd={courseEnd}
            />
          </>
        ) : (
          <GithubForm student={student} />
        )}
      </div>
    </div>
  );
}
