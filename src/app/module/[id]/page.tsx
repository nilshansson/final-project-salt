import { selectAllLinksByModule, selectCourseModule } from "@/db/query";
import { IntroCard } from "./intro-card";
import { LinksCard } from "./links-card";

export default async function content({ params }: { params: { id: string } }) {
  const module = await selectCourseModule(Number(params.id));
  const links = await selectAllLinksByModule(module.id);

  return (
    <main className="flex min-h-screen flex-col items-center p-10">
      <div className="flex flex-col md:flex-row gap-8 mb-8 w-full mt-5">
        <div className="w-full md:w-8/12">
          <IntroCard title={module.title} intro={module.intro} />
        </div>

        <div className="w-full md:w-4/12">
          <LinksCard links={links} moduleId={module.id} />
        </div>
      </div>
    </main>
  );
}
