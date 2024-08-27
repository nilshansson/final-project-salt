"use server";

import Link from "next/link";
import ContributionGraph from "../profile/contributiongraph";
import { getCourseDatesByClassId } from "@/db/query";

type StudentCardProps = {
  student: {
    id: number;
    name: string;
    userId: string | null;
    classId: number | null;
    github: string | null;
  };
};

export async function StudentCard({ student }: StudentCardProps) {
  const { courseStart, courseEnd } = await getCourseDatesByClassId(
    student.classId
  );

  return (
    <div className="card bg-saltLightPink min-w-80 shadow-xl">
      <div className="card-body flex flex-col items-center justify-center text-center">
        <h1 className="text-2xl font-bold mb-4 text-saltDarkBlue">
          {student.name}
        </h1>

        {student.github ? (
          <div className="w-full ">
            <div className="mb-4 bg-saltOrange rounded-2xl p-3">
              <label className="font-semibold text-saltDarkBlue">
                GitHub:{" "}
              </label>
              <Link
                href={`https://github.com/${student.github}`}
                className="underline text-white ml-2 font-bold hover:text-saltDarkBlue"
              >
                {student.github}
              </Link>
            </div>
            <ContributionGraph
              student={student}
              courseStart={courseStart}
              courseEnd={courseEnd}
            />
          </div>
        ) : (
          <p className="text-red-600">This student hasn't added their GitHub</p>
        )}
      </div>
    </div>
  );
}
