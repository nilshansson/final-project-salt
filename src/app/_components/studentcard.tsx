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

export default async function StudentCard({ student }: StudentCardProps) {
  const { courseStart, courseEnd } = await getCourseDatesByClassId(
    student.classId
  );
  return (
    <div className="card bg-saltLightPink min-w-80 shadow-xl">
      <div className="card-body flex flex-col items-center justify-center text-center">
        <h1 className="text-lg font-bold mb-4 text-saltDarkBlue">
          {student.name}
        </h1>
        github:{" "}
        {student.github ? (
          <>
            <p>
              <Link
                href={`https://github.com/${student.github}`}
                className="underline"
              >
                {student.github}
              </Link>
            </p>
            <ContributionGraph
              student={student}
              courseStart={courseStart}
              courseEnd={courseEnd}
            />
          </>
        ) : (
          <p className="text-red-700">this student hasnt added their github</p>
        )}
      </div>
    </div>
  );
}
