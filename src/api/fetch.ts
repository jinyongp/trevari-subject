import type { BookDetailResponse, BookListResponse } from "./model";

const API_URL = "https://api.itbook.store/1.0";

export async function getBooks(keyword: string, page?: number): Promise<BookListResponse | null> {
  if (!keyword) return null;
  try {
    const res = await fetch(`${API_URL}/search/${keyword}/${page ?? ""}`);
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    return res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
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
