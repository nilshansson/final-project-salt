"use server";

import { getAllStudentInfo, selectAllClasses } from "@/db/query";
import EditClassesForm from "./editclassesform";

export default async function ClassesOverviewPage() {
  const allStudents = await getAllStudentInfo();
  const allClasses = await selectAllClasses();

  return (
    <div>
      <h1>Class Management</h1>

      <EditClassesForm allStudents={allStudents} allClasses={allClasses} />
    </div>
  );
}
