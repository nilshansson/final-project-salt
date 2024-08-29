"use server";

import { selectAllClasses, SelectClasses } from "@/db/query";
import ClassCollapse from "./class-collapse";
import { ClassModal, Main } from "@/app/_components";

export default async function Module() {
  const allClasses = await selectAllClasses();

  return (
    <Main title="Admin Modules">
      <ClassModal />
      <ClassCollapse allClasses={allClasses} />
    </Main>
  );
}
