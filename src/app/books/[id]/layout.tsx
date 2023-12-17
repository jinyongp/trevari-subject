export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <main className="container relative mx-auto min-h-screen">
      <header className="grid place-items-center gap-4 py-12 md:gap-10 md:py-20">
        <h1 className="text-3xl font-extrabold text-slate-900 md:text-4xl">도서 정보</h1>
      </header>
      {children}
    </main>
  );
}
