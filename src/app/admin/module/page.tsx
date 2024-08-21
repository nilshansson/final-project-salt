"use server";

import { combinedLink, selectAllCourseModules, selectAllLinksByModule, SelectModule } from "@/db/query";

interface moduleWithLinks {
  module: SelectModule;
  links: combinedLink[];
}

export default async function Module() {
  const allModules = await selectAllCourseModules();

  // Map over allModules and collect moduleWithLinks using Promise.all
  const allModulesWithLinks: moduleWithLinks[] = await Promise.all(
    allModules.map(async (module) => {
      const moduleLinks: combinedLink[] = await selectAllLinksByModule(module.id);
      return { module, links: moduleLinks };
    })
  );

  return (
    <div className="container mx-auto p-10 space-y-8">
      {allModulesWithLinks.map(({ module, links }) => (
        <div key={module.id} className="card bg-white shadow-md rounded-lg p-6 space-y-4">
          <div className="module-header">
            <h2 className="text-2xl font-semibold">{module.title}</h2>
            {module.intro && <p className="text-gray-600 mt-2">{module.intro}</p>}
          </div>
          <div className="links space-y-4">
            {links.map((link) => (
              <div key={link.id} className="link-item bg-gray-50 p-4 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium">
                  <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {link.title}
                  </a>
                </h3>
                {link.description && <p className="text-gray-500 mt-1">{link.description}</p>}
                <div className="mt-4">
                  <button className="text-sm text-white bg-blue-500 hover:bg-blue-600 rounded px-3 py-1">Edit Link</button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <button className="text-sm text-white bg-green-500 hover:bg-green-600 rounded px-4 py-2">Edit Module</button>
          </div>
        </div>
      ))}
    </div>
  );
}
