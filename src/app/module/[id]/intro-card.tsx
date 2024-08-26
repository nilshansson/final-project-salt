interface IntroCardProps {
  title: string;
  intro: string | null;
}

export function IntroCard({ title, intro }: IntroCardProps) {
  return (
    <div className="card bg-saltBluePastell shadow-md mb-6">
      <div className="card-body prose lg:prose-lg w-full max-w-full">
        <h2 className="card-title py-5 text-2xl text-saltDarkBlue">{title}</h2>
        <p className="text-saltDarkBlue leading-loose">{intro}</p>
        <div className="card-actions justify-end"></div>
      </div>
    </div>
  );
}
