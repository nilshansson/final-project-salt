"use client";

import StudentCard from "../_components/studentcard";
import { useEffect, useState } from "react";
import { getAllStudentInfo } from "@/db/query";
import { handleFetchingAllStudentInfo } from "@/actions/actions";

type StudentInfo = {
  name: string;
  userId: string;
  github: string | null;
  classId: number;
};

export default function AdminPage() {
  const [studentsInfo, setStudentsInfo] = useState<StudentInfo[]>([]);

  useEffect(() => {
    async function fetchStudents() {
      try {
        const allStudentInfo: StudentInfo[] =
          await handleFetchingAllStudentInfo();

        setStudentsInfo(allStudentInfo);
      } catch (error) {
        console.error("Failed to fetch student info:", error);
      }
    }
    fetchStudents();
  }, []);

  return (
    <>
      {studentsInfo.map((student) => (
        <StudentCard
          key={student.userId}
          name={student.name}
          github={student.github}
        />
      ))}
      <h1>admin page</h1>
    </>
  );
}
