"use server";

import { auth } from "@clerk/nextjs/server";
import { handleCreateUserIfNotExist } from "@/actions/actions";
import { getCourseDatesByClassId } from "@/db/queries/class-queries";
import { GithubForm } from "./github-form";
import CommitTracker from "../_components/commit-tracker";
import ClassMaterial from "./class-material";
import Image from "next/image";

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

  let content;

  if (student.classId) {
    const { precourseStart, bootcampStart } = await getCourseDatesByClassId(
      student.classId
    );

    content = student.github ? (
      <>
        <h1 className="text-saltDarkPink">Commits since precourse start:</h1>
        <CommitTracker
          student={student}
          precourseStart={precourseStart}
          bootcampStart={bootcampStart}
        />
      </>
    ) : (
      <GithubForm student={student} />
    );
  } else {
    content = <h1>Please ask admin to assign a class to you</h1>;
  }

  return (
    <main className=" min-h-screen p-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card col-span-1 shadow-xl bg-white px-9 py-6 h-[790px]">
          <div className="flex flex-col items-center justify-center text-center ">
            <div className="bg-saltDarkBlue flex p-4 flex-col items-center justify-center w-full mb-3 rounded">
              <h1 className="text-saltDarkBlue prose font-extrabold text-4xl p-2 mb-4 bg-saltOrange  rounded-lg w-full">
                Profile
              </h1>

              <h1 className="text-lg font-extrabold mb-4 text-white text-center">
                Welcome, {user.first_name} {user.last_name}!
              </h1>
              {user.image_url && (
                <Image
                  src={user.image_url}
                  alt="User Profile Picture"
                  width={250}
                  height={250}
                  className="rounded-full mb-4"
                />
              )}
            </div>
            {content}
          </div>
        </div>

        <div className="col-span-2">
          <div className="card bg-white p-4 shadow-xl h-auto">
            <ClassMaterial />
          </div>
        </div>
      </div>
    </main>
  );
}
