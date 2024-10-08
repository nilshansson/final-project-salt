import { IntroCard } from "@/app/module/[id]/intro-card";
import { LinksCard } from "@/app/module/[id]/links-card";
// import {
//   combinedLink,
//   getStudentInfo,
//   selectAllCourseModulesByClassId,
//   selectAllLinksByModule,
//   selectClass,
//   SelectClasses,
//   SelectModule,
// } from "@/db/query";
import {
  combinedLink,
  selectAllLinksByModule,
} from "@/db/queries/link-queries";
import { getStudentInfo } from "@/db/queries/student-queries";
import {
  SelectModule,
  selectAllCourseModulesByClassId,
} from "@/db/queries/module-queries";
import { SelectClasses, selectClass } from "@/db/queries/class-queries";
import { auth } from "@clerk/nextjs/server";

export default async function ClassMaterial() {
  const clerkAuth = await auth();
  const saltieId = clerkAuth.saltieId;

  interface moduleWithLinks {
    module: SelectModule;
    links: combinedLink[];
  }

  interface classesWithModulesWithLinks {
    class: SelectClasses;
    moduleWLink: moduleWithLinks[];
  }

  const saltieinfo = await getStudentInfo(saltieId!);

  const classMaterials: (classesWithModulesWithLinks | null)[] =
    await Promise.all(
      saltieinfo.map(async (saltieClassInfo) => {
        const { classId } = saltieClassInfo;

        if (classId !== null) {
          const selectedClass = await selectClass(classId);
          const modules = await selectAllCourseModulesByClassId(classId);

          const moduleWLink: moduleWithLinks[] = await Promise.all(
            modules.map(async (module) => {
              const links = await selectAllLinksByModule(module.id);
              return { module, links };
            })
          );

          return {
            class: selectedClass,
            moduleWLink: moduleWLink,
          };
        }

        return null;
      })
    );

  const filteredClassMaterials = classMaterials.filter(
    (classMaterial): classMaterial is classesWithModulesWithLinks =>
      classMaterial !== null
  );

  return (
    <main className="flex h-auto flex-col items-center ">
      {filteredClassMaterials.map((classWModules) => (
        <>
          <h1 className="text-5xl font-extrabold mb-8 text-saltDarkBlue bg-saltOrange w-full py-4 text-center rounded-2xl">
            {classWModules.class.name}
          </h1>

          {classWModules.moduleWLink.map((moduleWLink) => (
            <details
              className="collapse bg-saltDarkBlue my-2"
              key={moduleWLink.module.id}
            >
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
                      moduleId={moduleWLink.module.id}
                    />
                  </div>
                </div>
              </div>
            </details>
          ))}
        </>
      ))}
    </main>
  );
}
