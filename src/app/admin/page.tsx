"use server";

import { selectAllClasses, getAllStudentInfo, SelectStudent } from "@/db/query";
import { StudentCard } from "../_components";

export default async function AdminPage() {
  const allStudentInfo: SelectStudent[] = await getAllStudentInfo();
  const allClasses = await selectAllClasses();

  return (
    <>


      {allClasses.map((classItem) => (
        <div key={classItem.id} className="w-full p-4 pb-10">
          <h2 className="text-3xl font-bold bg-saltDarkBlue text-white mb-6 w-fit px-3 rounded-2xl">
            {classItem.name}
          </h2>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5 justify-items-center">
            {allStudentInfo
              .filter((student) => student.classId === classItem.id)
              .map((student) => (
                <StudentCard key={student.userId} student={student} />
              ))}

            {allStudentInfo.filter(
              (student) => student.classId === classItem.id
            ).length === 0 && <p>No students in this class.</p>}
          </div>
        </div>
      ))}
    </>
  );
}


      // <h1 className="text-center text-5xl font-extrabold text-saltDarkBlue py-10 underline">
      //   Admin Dashboard
      // </h1>
