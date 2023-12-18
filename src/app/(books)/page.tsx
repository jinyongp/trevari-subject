"use client";

import { useEffect, useRef } from "react";
import SearchForm from "./ui/SearchForm";
import BookCard from "./ui/BookCard";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useQueryParams } from "@/lib/hooks/use-query-params";
import { useSearchContext } from "@/lib/providers/search-provider";
import { useIntersectionObserver } from "@/lib/hooks/use-intersection-observer";

export default function Page() {
  const router = useRouter();
  const pathname = usePathname();
  const queryParam = useQueryParams();
  const { books, loading, loaded, error, load, loadMore } = useSearchContext();

  const loadMoreHandlerRef = useRef<HTMLDivElement>(null);
  useIntersectionObserver(
    loadMoreHandlerRef,
    ([entry]) => {
      if (entry.isIntersecting) {
        loadMore();
      }
    },
    { rootMargin: "300px" },
  );

  useEffect(() => {
    const query = queryParam.get("q");
    if (query && !books.length) {
      load(query);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSubmit(searchText: string) {
    const text = searchText.trim();
    if (text.length === 0) {
      return;
    }

    router.replace(`${pathname}?${queryParam.set("q", text)}`);

    await load(text);
  }

  return (
    <div className="p-4 sm:pb-4">
      <section className="sticky top-2 z-10 mx-auto grid place-items-center md:max-w-3/4">
        <SearchForm initialSearchText={queryParam.get("q") ?? ""} onSubmit={handleSubmit} />
      </section>
      {(() => {
        if (loading) {
          return (
            <section className="grid place-items-center py-10" id="pw-search-result-loading">
              <p className="text-lg font-bold text-slate-400">검색 중입니다...</p>
            </section>
          );
        }

        if (!loaded) {
          return;
        }

        if (error) {
          return (
            <section className="grid place-items-center py-10" id="pw-search-result-error">
              <p className="text-lg font-bold text-slate-400">검색 중 오류가 발생했습니다.</p>
            </section>
          );
        }

        if (!books.length) {
          return (
            <section className="grid place-items-center py-10" id="pw-search-result-empty">
              <p className="text-lg font-bold text-slate-400">검색 결과가 없습니다.</p>
            </section>
          );
        }

        return (
          <div className="mx-auto mt-10 space-y-10 md:max-w-3/4">
            <section className="grid gap-10">
              <h2 className="text-lg font-bold text-slate-400">검색 결과</h2>
            </section>
            <section className="grid gap-10" id="pw-search-result">
              <ul className="grid gap-10">
                {books.map((book) => (
                  <Link key={`book-${book.isbn13}`} href={`/books/${book.isbn13}`} className="pw-card" scroll={false}>
                    <BookCard book={book} />
                  </Link>
                ))}
              </ul>
            </section>
            <div ref={loadMoreHandlerRef} />
          </div>
        );
      })()}
    </div>
  );
}
