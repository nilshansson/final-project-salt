"use server";

import { combinedLink, selectAllClasses, selectAllCourseModules, selectAllCourseModulesByClassId, selectAllLinksByModule, SelectClasses, SelectModule } from "@/db/query";
import Link from "next/link";

interface moduleWithLinks {
  module: SelectModule;
  links: combinedLink[];
}

interface classesWithModules{
  class: SelectClasses;
  modules: SelectModule[];
}

interface classesWithModulesWithLinks{
  class:SelectClasses
  moduleWLink:moduleWithLinks[]
}

export default async function Module() {
  const allClasses = await selectAllClasses();

  const allClassesWithModules: classesWithModulesWithLinks[] = await Promise.all(
    allClasses.map(async (currentClass) => {
      const modules = await selectAllCourseModulesByClassId(currentClass.id);

      // Step 3: For each module, fetch its links
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
      {allClassesWithModules.map(({ class:currClass, moduleWLink }) => (
              <div className="card bg-base-100 prose lg:prose-lg p-4">
              <h1>{currClass.name}</h1>
              {moduleWLink.map((module)=>(
                <div className="card bg-base-200 p-4 my-1">
                <h2>{module.module.title}</h2>
                <p>{module.module.intro}</p>
                {module.links.map((link)=>(
                  <div className="card bg-base-300 p-2 my-1">
                  <Link href={link.url}>{link.title}</Link>
                  </div>
                ))}
                </div>
              ))}
              </div>
            ))}
    </div>
  );
}
