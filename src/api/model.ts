export interface BookListResponse {
  total: string;
  page: string;
  books: BookListItem[];
}

export type BookListItem = {
  title: string;
  subtitle: string;
  isbn13: string;
  price: string;
  image: string;
  url: string;
};

export interface BookDetailResponse {
  title: string;
  subtitle: string;
  isbn13: string;
  authors: string;
  publisher: string;
  pages: string;
  rating: string;
  desc: string;
  price: string;
  image: string;
}
