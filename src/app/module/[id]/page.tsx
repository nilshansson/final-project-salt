import { selectCourseModule } from "@/db/query";
import { IntroCard } from "./intro-card";
import { LinksCard } from "./links-card";

export default async function content({ params }: { params: { id: string } }) {
  const module = await selectCourseModule(Number(params.id));

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="card bg-base-100 w-full items-center shadow-xl">
        <IntroCard title={module.title} intro={module.intro}/>

        <LinksCard/>
      </div>
    </main>
  );
}
