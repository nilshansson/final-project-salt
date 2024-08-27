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
import { ClassModal } from "@/app/_components";

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

  const allClassesWithModules: classesWithModulesWithLinks[] =
    await Promise.all(
      allClasses.map(async (currentClass) => {
        const modules = await selectAllCourseModulesByClassId(currentClass.id);

        const moduleWLink = await Promise.all(
          modules.map(async (module) => {
            const links = await selectAllLinksByModule(module.id);
            return { module, links };
          })
        );

        return {
          class: currentClass,
          moduleWLink,
        };
      })
    );

  return (
    <div className="container mx-auto p-10 space-y-8">
      <h1 className="text-center text-5xl font-extrabold text-saltDarkBlue py-10 underline">
        Admin Dashboard
      </h1>
      <ClassModal />
      <ClassCollapse allClassesWithModules={allClassesWithModules} />
    </div>
  );
}
