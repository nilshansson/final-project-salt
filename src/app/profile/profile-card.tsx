"use server"

import { getCourseDatesByClassId } from "@/db/queries/class-queries";
import CommitTracker from "../_components/commit-tracker";
import { GithubForm } from "./github-form";
import { handleCreateSaltieIfNotExist } from "@/actions/actions";
import Image from "next/image";

interface ProfileProps{
  saltieId:string
}

export default async function ProfileCard({saltieId}:ProfileProps){
  const saltie = await fetch(`https://api.clerk.dev/v1/salties/${saltieId}`, {
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
              Welcome, {saltie.first_name} {saltie.last_name}!
            </h1>
            {saltie.image_url && (
              <Image
                src={saltie.image_url}
                alt="Saltie Profile Picture"
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
