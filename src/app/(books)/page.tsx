"use client";

import { useEffect, useState } from "react";
import { getBooks } from "@/api/fetch";
import SearchForm from "./ui/SearchForm";
import BookCard from "./ui/BookCard";
import { BookListItem } from "@/api/model";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useQueryParams } from "@/lib/hooks/use-query-params";
import { useSearchContext } from "@/lib/providers/search-provider";

export default function Page() {
  // TODO: 브라우저 뒤로가기 버튼으로 이동 시 스크롤 위치 복원 기능 문제 수정 필요
  // useScrollContext("books");

  const router = useRouter();
  const pathname = usePathname();
  const queryParam = useQueryParams();
  const searchContext = useSearchContext();

  const [books, setBooks] = useState<BookListItem[]>(searchContext.books);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const query = queryParam.get("q");
    if (query) {
      if (books.length > 0) {
        reload(query);
      } else {
        load(query);
      }
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

  async function load(text: string) {
    setLoaded(false);
    setLoading(true);

    const res = await getBooks(text);
    setError(!res);
    setLoading(false);
    setLoaded(true);

    if (res) {
      setBooks(res.books);
      searchContext.books = res.books;
    }
  }

  async function reload(text: string) {
    setLoaded(true);
    setLoading(false);

    const res = await getBooks(text);
    setError(!res);

    if (res) {
      setBooks(res.books);
      searchContext.books = res.books;
    }
  }

  function handleTextChange(searchText: string) {
    searchContext.keyword = searchText;
  }

  return (
    <div className="p-4 sm:pb-4">
      <section className="sticky top-2 z-10 mx-auto grid place-items-center md:max-w-3/4">
        <SearchForm
          initialSearchText={queryParam.get("query") ?? ""}
          onSubmit={handleSubmit}
          onTextChange={handleTextChange}
        />
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
              <h2 className="text-lg font-bold text-slate-400">검색 결과 ({books.length}건)</h2>
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
          </div>
        );
      })()}
    </div>
  );
}
