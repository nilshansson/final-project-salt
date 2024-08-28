"use server";

import {
  combinedLink,
  selectAllClasses,
  selectAllCourseModules,
  selectAllCourseModulesByClassId,
  selectAllLinksByModule,
  SelectClasses,
  SelectModule,
} from "@/db/query";
import Link from "next/link";
import ClassCollapse from "./class-collapse";
import { ClassModal, Main } from "@/app/_components";

interface moduleWithLinks {
  module: SelectModule;
  links: combinedLink[];
}

interface classesWithModules {
  class: SelectClasses;
  modules: SelectModule[];
}

interface classesWithModulesWithLinks {
  class: SelectClasses;
  moduleWLink: moduleWithLinks[];
}

export default async function Module() {
  const allClasses = await selectAllClasses();


  return (
      <Main title="Admin Modules">
      <ClassModal />
      <ClassCollapse allClasses={allClasses} />
    </Main>
  );
}
