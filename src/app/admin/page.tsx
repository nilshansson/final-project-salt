"use server";

import { auth } from "@clerk/nextjs/server";
import StudentCard from "../_components/studentcard";
import { getAllStudentInfo, SelectStudent } from "@/db/query";

export default async function AdminPage() {
  const allStudentInfo: SelectStudent[] = await getAllStudentInfo();

  return (
    <div className="grid grid-cols-1 gap-14 sm:grid-cols-2 lg:grid-cols-4 p-4 justify-items-center">
      <h1>Admin Dashboard</h1>
      {allStudentInfo.map((student) => (
        <StudentCard key={student.userId} student={student} />
      ))}
    </div>
  );
}
