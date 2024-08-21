"use client";

import StudentCard from "../_components/studentcard";
import { useEffect, useState } from "react";
import { getAllStudentInfo } from "@/db/query";

type StudentInfo = {
  id: number;
  userId: string;
  name: string;
  github: string | null;
};
export default function AdminPage() {
  const [studentsInfo, setStudentsInfo] = useState<StudentInfo[]>([]);

  useEffect(() => {
    async function fetchStudents() {
      try {
        const allStudentInfo: StudentInfo[] = await getAllStudentInfo();

        setStudentsInfo(allStudentInfo);
        console.log(studentsInfo);
        console.log(allStudentInfo);
      } catch (error) {
        console.error("Failed to fetch student info:", error);
      }
    }
    fetchStudents();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-14 sm:grid-cols-2 lg:grid-cols-4 p-4 justify-items-center">
      {studentsInfo.map((student) => (
        <StudentCard key={student.userId} student={student} />
      ))}
    </div>
  );
}
