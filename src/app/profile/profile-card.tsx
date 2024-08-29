"use server"

import { getCourseDatesByClassId } from "@/db/queries/class-queries";
import CommitTracker from "../_components/commit-tracker";
import { GithubForm } from "./github-form";
import { handleCreateUserIfNotExist } from "@/actions/actions";
import Image from "next/image";

interface ProfileProps{
  userId:string
}

export default async function ProfileCard({userId}:ProfileProps){
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

  const GITHUB_ACCESS_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
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
          GITHUB_ACCESS_TOKEN={GITHUB_ACCESS_TOKEN}
        />
      </>
    ) : (
      <GithubForm student={student} />
    );
  } else {
    content = <h1>Please ask admin to assign a class to you</h1>;
  }
  return (

        <div className="card col-span-1 shadow-xl bg-saltDarkBlue h-160">
          <div className="card-body flex flex-col items-center justify-center text-center ">
            <h1 className="text-lg font-bold mb-4 text-white">
              Welcome, {user.first_name} {user.last_name}!
            </h1>
            {user.image_url && (
              <Image
                src={user.image_url}
                alt="User Profile Picture"
                width={150}
                height={150}
                className="rounded-full mb-4"
              />
            )}
            {content}
          </div>
        </div>
  )
}
