"use server";

import { getAllStudentInfo, selectAllClasses } from "@/db/query";
import EditClassesForm from "./edit-classes-form";
import { Main } from "@/app/_components";

export default async function ClassesOverviewPage() {
  const allStudents = await getAllStudentInfo();
  const allClasses = await selectAllClasses();

  return (
    <Main title="Class Management">
      <EditClassesForm allStudents={allStudents} allClasses={allClasses} />
    </Main>
  );
}

// <div>
//   <div>
//     <h1 className="text-center text-5xl font-extrabold text-white py-10 mb-24 underline bg-saltDarkBlue w-full">
//       Class Management
//     </h1>
