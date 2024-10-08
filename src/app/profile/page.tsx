"use server";

import { auth } from "@clerk/nextjs/server";
import { handleCreateSaltieIfNotExist } from "@/actions/actions";
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
  const saltieId = clerkAuth.userId;

  const saltie = await fetch(`https://api.clerk.dev/v1/users/${saltieId}`, {
    headers: {
      Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
    },
  }).then((res) => res.json());

  const name = `${saltie.first_name} ${saltie.last_name}`;
  const { student } = await handleCreateSaltieIfNotExist(saltieId!, name);
  if (!student) {
    throw new Error("Could not load or create saltie");
  }

  let content;

  const GITHUB_ACCESS_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

  if (student.classId) {
    const { precourseStart, bootcampStart } = await getCourseDatesByClassId(
      student.classId
    );

    content = student.github ? (
      <>
      <h1 className="text-saltDarkPink">Commits since precourse start:</h1>
      <CommitTracker student={student} precourseStart={precourseStart} bootcampStart={bootcampStart} GITHUB_ACCESS_TOKEN={GITHUB_ACCESS_TOKEN}/>
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
                Welcome, {saltie.first_name} {saltie.last_name}!
              </h1>
              {saltie.image_url && (
                <Image
                  src={saltie.image_url}
                  alt="Saltie Profile Picture"
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
