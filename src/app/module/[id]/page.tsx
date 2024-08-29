import { selectCourseModule } from "@/db/query";
import dynamic from "next/dynamic";
import { IntroCard } from "./intro-card";
import { LinksCard } from "./links-card";

export default async function Content({ params }: { params: { id: string } }) {
  const currModule = await selectCourseModule(Number(params.id));

  return (
    <main className="flex min-h-screen flex-col items-center p-10">
      <div className="flex flex-col md:flex-row gap-8 mb-8 w-full mt-5">
        <div className="w-full md:w-8/12">
            <IntroCard title={currModule.title} intro={currModule.intro} />
        </div>
        <div className="w-full md:w-4/12">
            <LinksCard moduleId={currModule.id} />
        </div>
      </div>
    </main>
  );
}
