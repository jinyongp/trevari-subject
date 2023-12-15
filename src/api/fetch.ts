import type { BookDetailResponse, BookListResponse } from "./model";

const API_URL = "https://api.itbook.store/1.0";

export async function getBooks(keyword: string, page?: number): Promise<BookListResponse> {
  if (!keyword) throw new Error("검색 키워드를 입력해야 합니다.");
  return fetch(`${API_URL}/search/${keyword}/${page ?? ""}`).then((res) => res.json());
}

export async function getBookDetail(isbn13: string): Promise<BookDetailResponse> {
  return fetch(`${API_URL}/books/${isbn13}`).then((res) => res.json());
}
