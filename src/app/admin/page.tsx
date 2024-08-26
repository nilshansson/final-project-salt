"use server";

import { auth } from "@clerk/nextjs/server";
import StudentCard from "../_components/studentcard";
import { getAllStudentInfo, SelectStudent } from "@/db/query";

export default async function AdminPage() {
  const allStudentInfo: SelectStudent[] = await getAllStudentInfo();

  return (
    <>
      <h1 className="text-center text-5xl font-extrabold text-saltDarkBlue py-10 underline">
        Admin Dashboard
      </h1>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 p-4 justify-items-center">
        {allStudentInfo.map((student) => (
          <StudentCard key={student.userId} student={student} />
        ))}
      </div>
    </>
  );
}
