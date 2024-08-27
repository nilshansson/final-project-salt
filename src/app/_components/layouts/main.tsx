type Props = {
  children: React.ReactNode;
  title:string
};

export function Main({ children, title }: Props) {
  return (
    <main className="max-w-5xl mx-auto flex flex-col drop-shadow-2xl">
      <div className="p-5">
        <div className="p-8 w-full bg-content text-text drop-shadow-2xl rounded">
      <h1 className="text-center text-5xl font-extrabold text-saltDarkBlue py-10 underline">
      {title}
      </h1>
          {children}
        </div>
      </div>
    </main>
  );
}
