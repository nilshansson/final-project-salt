import GitHubCommits from "../profile/committracker";

// Update the props to expect the full student object
type StudentCardProps = {
  student: {
    id: number;
    userId: string;
    name: string;
    github: string | null;
  };
};

export default function StudentCard({ student }: StudentCardProps) {
  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <div className="card-body flex flex-col items-center justify-center text-center">
        <h1 className="text-lg font-bold mb-4">{student.name}</h1>
        <h2>github: {student.github}</h2>

        <GitHubCommits student={student} />
      </div>
    </div>
  );
}
