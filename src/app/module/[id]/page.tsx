export default function content({ params }: { params: { id: string } }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="card bg-base-100 w-full items-center shadow-xl">
      <div className="card bg-base-100 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">introduction</h2>
          <p>introduction text here</p>
          <div className="card-actions justify-end"></div>
        </div>
      </div>

      <article className="prose lg:prose-xl">
        <h1>{params.id}</h1>
        <p>testing prose testing prose testing prose</p>
        <div className="collapse collapse-arrow bg-base-200">
          <input type="radio" name="my-accordion-2" defaultChecked />
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
        </div>
        <div className="collapse collapse-arrow bg-base-200">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title text-xl font-medium">katas</div>
          <div className="collapse-content">
            <p>here is the codewars kata</p>
          </div>
        </div>
      </article>
      </div>
    </main>
  );
}
