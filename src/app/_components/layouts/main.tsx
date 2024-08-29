
type Props = {
  children: React.ReactNode;
  title: string;
};

export function Main({ children, title }: Props) {
  return (
    <main className="max-w-full mx-auto flex flex-col drop-shadow-2xl min-h-screen">
      <div className="p-5 flex-1 flex">
        <div className="p-8 w-full bg-content text-text drop-shadow-2xl rounded flex-1">
          <div className="card p-4 h-full w-full bg-white drop-shadow-2xl flex flex-col">
            <h1 className="text-center text-5xl font-extrabold text-saltDarkBlue tracking-tighter py-10">
              {title}
            </h1>
            <div className="flex-1">
              {children}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
