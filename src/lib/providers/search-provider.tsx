"use client";

import { getBooks } from "@/api/fetch";
import { BookListItem } from "@/api/model";
import { createContext, useContext, useMemo, useState } from "react";

interface SearchContextProps {
  keyword: string;
  page: number;
  books: BookListItem[];
  loading: boolean;
  loaded: boolean;
  error: boolean;
  load(keyword?: string): Promise<void>;
  reload(keyword?: string): Promise<void>;
  loadMore(keyword?: string): Promise<void>;
}

export const SearchContext = createContext<SearchContextProps>({} as never);

export function useSearchContext() {
  return useContext(SearchContext);
}

export default function SearchProvider({ children }: React.PropsWithChildren) {
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [books, setBooks] = useState<BookListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [completed, setCompleted] = useState(false);

  async function load(query: string = keyword) {
    reset();
    setLoading(true);
    setLoaded(false);
    updateKeyword(query);

    const res = await getBooks(query);
    setError(!res);
    setLoading(false);
    setLoaded(true);

    if (res) {
      setBooks(res.books);
      setPage(+res.page + 1);
      setCompleted(res.books.length === 0);
    }
  }

  async function reload(query: string = keyword) {
    updateKeyword(query);
    setLoaded(true);
    setLoading(false);

    const res = await getBooks(query);
    setError(!res);

    if (res) {
      setBooks(res.books);
      setPage(+res.page + 1);
      setCompleted(res.books.length === 0);
    }
  }

  async function loadMore(query: string = keyword) {
    updateKeyword(query);
    if (completed) return;
    const res = await getBooks(query, page);
    if (res) {
      setBooks([...books, ...res.books]);
      setPage(+res.page + 1);
      setCompleted(res.books.length === 0);
    }
  }

  function updateKeyword(query: string) {
    if (keyword !== query) setKeyword(query);
  }

  function reset() {
    setKeyword("");
    setPage(1);
    setBooks([]);
    setLoading(false);
    setLoaded(false);
    setError(false);
    setCompleted(false);
  }

  const uniqueBooks = useMemo(() => {
    const map = new Map<string, BookListItem>();
    books.forEach((book) => {
      if (!map.has(book.isbn13)) {
        map.set(book.isbn13, book);
      }
    });
    return Array.from(map.values());
  }, [books]);

  return (
    <SearchContext.Provider
      value={{
        keyword,
        page,
        books: uniqueBooks,
        loading,
        loaded,
        error,
        load,
        reload,
        loadMore,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
