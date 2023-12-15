"use client";

import { useRef, useState } from "react";
import { getBooks } from "@/api/fetch";
import SearchForm from "./ui/SearchForm";
import BookCard from "./ui/BookCard";
import { BookListItem } from "@/api/model";

export default function Page() {
  const total = useRef(0);
  const page = useRef(1);

  const [books, setBooks] = useState<BookListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  async function handleSubmit(searchText: string) {
    const text = searchText.trim();
    if (text.length === 0) {
      return;
    }

    setLoaded(false);
    setLoading(true);
    const res = await getBooks(text);
    setBooks(res.books);
    setLoading(false);
    setLoaded(true);

    total.current = +res.total;
    page.current = +res.page;
    window.scrollTo({ top: 0 });
  }

  function handleTextChange() {
    setLoaded(false);
  }

  return (
    <div className="p-4 sm:pb-4">
      <section className="sticky top-2 z-10 mx-auto grid place-items-center md:max-w-3/4">
        <SearchForm onSubmit={handleSubmit} onTextChange={handleTextChange} />
      </section>
      {loading ? (
        <section className="grid place-items-center py-10">
          <p className="text-lg font-bold text-slate-400">검색 중입니다...</p>
        </section>
      ) : null}
      {loaded && books.length === 0 ? (
        <section className="grid place-items-center py-10" id="pw-search-result-empty">
          <p className="text-lg font-bold text-slate-400">검색 결과가 없습니다.</p>
        </section>
      ) : null}
      {books.length > 0 ? (
        <div className="mx-auto mt-10 space-y-10 md:max-w-3/4">
          <section className="grid gap-10">
            <h2 className="text-lg font-bold text-slate-400">검색 결과 ({books.length}건)</h2>
          </section>
          <section className="grid gap-10" id="pw-search-result">
            <ul className="grid gap-10">
              {books.map((book) => (
                <BookCard key={`book-${book.isbn13}`} book={book} />
              ))}
            </ul>
          </section>
        </div>
      ) : null}
    </div>
  );
}