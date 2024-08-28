import ModuleLinkCard from "@/app/_components/module-link-card";
import {
  combinedLink,
  selectClass,
  SelectModule,
} from "@/db/query";

export interface moduleWithLinks {
  module: SelectModule;
  links: combinedLink[];
}

export default async function classPage({
  params,
}: {
  params: { classId: string };
}) {
  const currClass = await selectClass(Number(params.classId));

  return (
    <main className="flex min-h-screen flex-col items-center p-10">
      <h1 className="text-5xl font-extrabold mb-8 text-saltDarkBlue bg-saltOrange w-full py-4 text-center rounded-2xl">
        {currClass.name}
      </h1>
          <ModuleLinkCard currClass={currClass} />
    </main>
  );
}
