export default function HomeLayout({ children }: React.PropsWithChildren) {
  return (
    <main className="container relative mx-auto min-h-screen">
      <header className="grid place-items-center gap-4 py-12 md:gap-10 md:py-20">
        <h1 className="text-3xl font-extrabold text-slate-900 md:text-4xl">도서 검색 서비스</h1>
        <h2 className="text-sm font-bold text-slate-500 md:text-lg">검색하고 싶은 책의 제목을 입력해보세요!</h2>
      </header>
      <main className="container mx-auto pb-20">{children}</main>
      <footer className="absolute bottom-0 grid h-20 w-full place-items-center gap-4">
        <p className="text-sm font-bold text-slate-500 md:text-lg">
          <a href="https://itbook.store/">itbook.store</a>
        </p>
      </footer>
    </main>
  );
}
