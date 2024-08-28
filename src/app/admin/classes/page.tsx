"use server";

import { selectAllClasses } from "@/db/queries/class-queries";
import { getAllStudentInfo } from "@/db/queries/student-queries";
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
