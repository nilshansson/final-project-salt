"use server";

import { getAllStudentInfo, selectAllClasses } from "@/db/query";
import EditClassesForm from "./editclassesform";

export default async function ClassesOverviewPage() {
  const allStudents = await getAllStudentInfo();
  const allClasses = await selectAllClasses();

  return (
    <div>
      <div>
        <h1 className="text-center text-5xl font-extrabold text-saltDarkBlue py-10 mb-24 underline">
          Class Management
        </h1>

        <EditClassesForm allStudents={allStudents} allClasses={allClasses} />
      </div>
    </div>
  );
}
