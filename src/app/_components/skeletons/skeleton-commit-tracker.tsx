

export async function SkeletonCommitTracker() {
  return (
    <div className="flex flex-col bg-saltLightGrey w-full rounded p-3 animate-pulse">
      <div className="h-6 bg-gray-300 rounded w-full mb-4"></div>
      <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-full"></div>
    </div>
  );
}
