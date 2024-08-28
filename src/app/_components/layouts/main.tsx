type Props = {
  children: React.ReactNode;
  title: string;
};

export function Main({ children, title }: Props) {
  return (
    <main className="max-w-full mx-auto flex flex-col drop-shadow-2xl">
      <div className="p-5">
        <div className="p-8 w-full bg-content text-text drop-shadow-2xl rounded">
          <h1 className="text-center text-5xl font-extrabold text-saltDarkBlue tracking-tighter py-10">
            {title}
          </h1>
          {children}
        </div>
      </div>
    </main>
  );
}
