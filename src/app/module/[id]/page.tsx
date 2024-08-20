import { selectCourseModule, selectLinksByModule, selectUtlinksByModule } from "@/db/query";
import { IntroCard } from "./intro-card";
import { LinksCard } from "./links-card";

export default async function content({ params }: { params: { id: string } }) {
  const module = await selectCourseModule(Number(params.id));
  const utlinks = await selectUtlinksByModule(module.id)
  const links = await selectLinksByModule(module.id)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="card bg-base-100 w-full items-center shadow-xl">
        <IntroCard title={module.title} intro={module.intro}/>

        <LinksCard utlinks={utlinks} links={links} moduleId={module.id}/>
      </div>
    </main>
  );
}
