"use class";

import { combinedLink, selectAllClasses, selectAllCourseModules, selectAllCourseModulesByClassId, selectAllLinksByModule, SelectClasses, SelectModule } from "@/db/query";
import Link from "next/link";
import { useState } from "react";

interface moduleWithLinks {
  module: SelectModule;
  links: combinedLink[];
}

interface ModuleCollapseProps{
  allModulesWithLinks:moduleWithLinks[]
}

export default function ModuleCollapse({allModulesWithLinks}:ModuleCollapseProps) {
  return (
          <div className="collapse-content">
          {allModulesWithLinks.map((module) => (
              <div key={module.module.id} className="collapse bg-base-200 my-1">
                <input type="checkbox" />
                <div className="collapse-title text-xl font-semibold">
                  {module.module.title}
                </div>
                <div className="collapse-content">
                  <p>{module.module.intro}</p>
                  {module.links.map((link) => (
                    <div key={link.id} className="card bg-base-300 p-2 my-1">
                      <Link href={link.url}>{link.title}</Link>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
  );
}
