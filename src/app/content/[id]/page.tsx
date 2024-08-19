export default function content({ params }: { params: { id: string } }){
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <article className="prose lg:prose-xl">
      <h1>{params.id}</h1>
      <p>testing prose testing prose testing prose</p>
    </article>
    </main>
  );
}
