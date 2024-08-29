
export function SkeletonProfileCard() {
  return (
    <div className="card col-span-1 shadow-xl bg-saltDarkBlue h-160 animate-pulse">
      <div className="card-body flex flex-col items-center justify-center text-center">
        <div className="rounded-full bg-gray-300 w-32 h-32 mb-4"></div>
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-6 bg-gray-300 rounded w-1/2"></div>
      </div>
    </div>
  );
}
