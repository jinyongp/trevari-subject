import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SearchProvider from "@/lib/providers/search-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "도서 검색 서비스",
  description: "도서 검색 서비스",
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SearchProvider>{children}</SearchProvider>
      </body>
    </html>
  );
}
