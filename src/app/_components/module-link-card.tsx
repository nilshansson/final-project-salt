"use client";

import {
  combinedLink,
  selectAllCourseModulesByClassId,
  SelectClasses,
  SelectModule,
} from "@/db/query";
import { IntroCard } from "../module/[id]/intro-card";
import { LinksCard } from "../module/[id]/links-card";
import { useEffect, useState } from "react";
import { selectAllLinksByModule } from "@/db/queries/link-queries";

interface ModuleLinkCardProps {
  currClass: SelectClasses;
}

export default function ModuleLinkCard({ currClass }: ModuleLinkCardProps) {
  const [modules, setModules] = useState<SelectModule[]>([]);
  const [loadedModules, setLoadedModules] = useState<
    Record<number, SelectModule>
  >({});
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const modulesData = await selectAllCourseModulesByClassId(currClass.id);
        setModules(modulesData);

        // Fetch each module's links independently
        modulesData.forEach(async (module) => {
          const moduleWithLinks = {
            ...module,
            links: await selectAllLinksByModule(module.id),
          };
          setLoadedModules((prevModules) => ({
            ...prevModules,
            [module.id]: moduleWithLinks,
          }));
        });
      } catch (error) {
        console.error("Failed to load modules", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchModules();
  }, [currClass.id]);

  if (isLoading) {
    return <div className="pt-14">Loading modules...</div>;
  }

  return (
    <>
      {modules.map((module) => (
        <details
          key={module.id}
          className="collapse bg-saltDarkBlue my-2 w-full"
        >
          <summary className="collapse-title text-xl font-bold text-white">
            {module.title}
          </summary>
          <div className="collapse-content">
            <div className="flex flex-col md:flex-row gap-8 mb-8 w-full mt-5">
              <div className="w-full md:w-8/12">
                <IntroCard title={module.title} intro={module.intro} />
              </div>
              <div className="w-full md:w-4/12">
                {loadedModules[module.id] ? (
                  <LinksCard moduleId={module.id} />
                ) : (
                  <div>Loading links...</div>
                )}
              </div>
            </div>
          </div>
        </details>
      ))}
    </>
  );
}
