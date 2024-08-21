import GitHubCommits from "../profile/committracker";

export default function StudentCard({ name, github }) {
  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <div className="card-body flex flex-col items-center justify-center text-center">
        <h1 className="text-lg font-bold mb-4">{name}</h1>
        <h2>github: {github}</h2>

        <GitHubCommits username={github} />
      </div>
    </div>
  );
}
