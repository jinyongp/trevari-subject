import type { BookDetailResponse, BookListResponse } from "./model";

const API_URL = "https://api.itbook.store/1.0";

interface QueryToken {
  include: string;
  exclude?: string;
}

export function processOrOperator(query: string): QueryToken[] {
  return query.split("|").map((token) => ({ include: token }));
}

export function processNotOperator(query: string): QueryToken {
  if (query.includes("-")) {
    const [base, exclude] = query.split("-");
    return { include: base, exclude };
  } else {
    return { include: query };
  }
}

export function parseQuery(query: string) {
  const orQueries = processOrOperator(query);
  const parsedQueries = orQueries.map((orQuery) => processNotOperator(orQuery.include));
  return parsedQueries;
}

export async function fetchBooks(query: string, page?: number): Promise<BookListResponse | null> {
  try {
    const res = await fetch(`${API_URL}/search/${query}/${page ?? ""}`);
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    return res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function searchBooksByQueryToken(tokens: QueryToken[], page?: number): Promise<BookListResponse> {
  let _page = 0;
  const results = await Promise.all(
    tokens.map(async ({ include, exclude }) => {
      const result = await fetchBooks(include, page);
      if (!result) return [];
      _page = Math.max(_page, +result.page);
      if (!exclude) return result.books;
      return result.books.filter((book) => !book.title.toLowerCase().includes(exclude.toLowerCase()));
    }),
  );

  return {
    page: `${_page}`,
    books: results.flat(),
  };
}

export async function getBooks(keyword: string, page?: number): Promise<BookListResponse | null> {
  if (!keyword) return null;

  const tokens = parseQuery(keyword);
  return searchBooksByQueryToken(tokens, page);
}

export async function getBookDetail(isbn13: string): Promise<BookDetailResponse | null> {
  try {
    const res = await fetch(`${API_URL}/books/${isbn13}`);
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    return res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}
