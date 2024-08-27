import { IntroCard } from "@/app/module/[id]/intro-card";
import { LinksCard } from "@/app/module/[id]/links-card";
import {
  combinedLink,
  selectAllCourseModulesByClassId,
  selectAllLinksByModule,
  selectClass,
  SelectClasses,
  SelectModule,
} from "@/db/query";

interface moduleWithLinks {
  module: SelectModule;
  links: combinedLink[];
}

interface classesWithModulesWithLinks {
  class: SelectClasses;
  moduleWLink: moduleWithLinks[];
}

export default async function classPage({
  params,
}: {
  params: { classId: string };
}) {
  const newClass = await selectClass(Number(params.classId));
  const modules = await selectAllCourseModulesByClassId(newClass.id);
  const moduleWLink: moduleWithLinks[] = await Promise.all(
    modules.map(async (module) => {
      const links = await selectAllLinksByModule(module.id);
      return { module, links };
    })
  );
  const classWModules: classesWithModulesWithLinks = {
    class: newClass,
    moduleWLink: moduleWLink,
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-10">
      <h1 className="text-5xl font-extrabold my-8 text-saltDarkBlue">
        {classWModules.class.name}
      </h1>

      {classWModules.moduleWLink.map((moduleWLink) => (
        <details className="collapse bg-saltDarkBlue my-2">
          <summary className="collapse-title text-xl font-bold text-white">
            {moduleWLink.module.title}
          </summary>
          <div className="collapse-content">
            <div
              key={moduleWLink.module.id}
              className="flex flex-col md:flex-row gap-8 mb-8 w-full mt-5"
            >
              <div className="w-full md:w-8/12">
                <IntroCard
                  title={moduleWLink.module.title}
                  intro={moduleWLink.module.intro}
                />
              </div>

              <div className="w-full md:w-4/12">
                <LinksCard
                  links={moduleWLink.links}
                  moduleId={moduleWLink.module.id}
                />
              </div>
            </div>
          </div>
        </details>
      ))}
    </main>
  );
}
