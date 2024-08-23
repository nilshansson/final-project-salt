"use client";

import Link from "next/link";
import ContributionGraph from "../profile/contributiongraph";

type StudentCardProps = {
  student: {
    id: number;
    name: string;
    userId: string | null;
    classId: number | null;
    github: string | null;
  };
};

export default function StudentCard({ student }: StudentCardProps) {
  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <div className="card-body flex flex-col items-center justify-center text-center">
        <h1 className="text-lg font-bold mb-4">{student.name}</h1>
        github:{" "}
        {student.github ? (
          <>
            <p>
              <Link href={`https://github.com/${student.github}`}>
                {student.github}
              </Link>
            </p>
            <ContributionGraph student={student} />
          </>
        ) : (
          <p>this student hasnt added their github</p>
        )}
      </div>
    </div>
  );
}
