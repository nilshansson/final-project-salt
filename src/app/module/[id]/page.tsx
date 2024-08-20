import { selectCourseModule } from "@/db/query";

export default async function content({ params }: { params: { id: string } }) {
  const module = await selectCourseModule(Number(params.id));

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="card bg-base-100 w-full items-center shadow-xl">
      <div className="card bg-base-100 w-full shadow-xl">
        <div className="card-body prose lg:prose-lg">
          <h2 className="card-title">{module.title}</h2>
          <p>{module.intro}</p>
          <div className="card-actions justify-end"></div>
        </div>
      </div>

        <div className="collapse collapse-arrow bg-base-200">
          <input type="radio" name="my-accordion-2"/>
          <div className="collapse-title text-xl font-medium">
            Youtube links
          </div>
          <div className="collapse-content">
            <p>here is the link: </p>
          </div>
        </div>
        <div className="collapse collapse-arrow bg-base-200">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title text-xl font-medium">docs</div>
          <div className="collapse-content">
            <p>here is the doc link</p>
          </div>

          {}
        </div>
        <div className="collapse collapse-arrow bg-base-200">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title text-xl font-medium">katas</div>
          <div className="collapse-content">
            <p>here is the codewars kata</p>
          </div>
        </div>
      </div>
    </main>
  );
}
