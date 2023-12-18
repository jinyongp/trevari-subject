"use client";

import { BookListItem } from "@/api/model";
import { createContext, useContext } from "react";

interface SearchContextProps {
  keyword: string;
  page: number;
  books: BookListItem[];
}

export const SearchContext = createContext<SearchContextProps>({
  keyword: "",
  page: 1,
  books: [],
});

export function useSearchContext() {
  return useContext(SearchContext);
}

export default function SearchProvider({ children }: React.PropsWithChildren) {
  return (
    <SearchContext.Provider
      value={{
        keyword: "",
        page: 1,
        books: [],
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
