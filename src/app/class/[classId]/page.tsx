import { IntroCard } from "@/app/module/[id]/intro-card";
import { LinksCard } from "@/app/module/[id]/links-card";
import { combinedLink, selectAllCourseModulesByClassId, selectAllLinksByModule, selectClass, selectClassByName, SelectClasses, SelectModule } from "@/db/query";

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
export default async function classPage({ params }: { params: { classId: string } }) {
  const newClass = await selectClass(Number(params.classId))
  const modules = await selectAllCourseModulesByClassId(newClass.id);
      const moduleWLink:moduleWithLinks[] = await Promise.all(
        modules.map(async (module) => {
          const links = await selectAllLinksByModule(module.id);
          return { module, links };
        })
      );
  const classWModules:classesWithModulesWithLinks = {class:newClass, moduleWLink:moduleWLink}



  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="card bg-base-100 w-full items-center prose lg:prose-lg shadow-xl">

      <h1>{classWModules.class.name}</h1>
      {classWModules.moduleWLink.map((moduleWLink)=>(
        <><IntroCard title={moduleWLink.module.title} intro={moduleWLink.module.intro} />
        <LinksCard links={moduleWLink.links} moduleId={moduleWLink.module.id} /></>
      ))}
      </div>
    </main>
  );
}
