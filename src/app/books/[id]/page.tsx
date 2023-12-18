import { getBookDetail } from "@/api/fetch";
import Image from "next/image";
import { notFound } from "next/navigation";
import GoBackButton from "./ui/GoBackButton";

export default async function Page({ params }: { params: { id: string } }) {
  const book = await getBookDetail(params.id);

  if (!book) {
    notFound();
  }

  const link = `https://itbook.store/books/${book.isbn13}`;

  return (
    <div className="relative flex gap-10 p-4 sm:pb-4" id="pw-book-detail">
      <div className="absolute -top-4 left-4">
        <GoBackButton>
          <span className="text-slate-800 underline">뒤로</span>
        </GoBackButton>
      </div>
      <section>
        <div className="relative aspect-[3/4] w-96">
          <Image
            src={book.image}
            alt={book.title}
            fill
            priority
            sizes="99.9vw" // https://github.com/vercel/next.js/issues/58586
            className="rounded bg-gray-100 object-cover"
          />
        </div>
      </section>
      <section className="flex flex-col gap-4 [&_label>p]:text-slate-800 [&_label>span]:text-sm [&_label>span]:font-bold [&_label>span]:text-slate-600">
        <label>
          <span>제목</span>
          <p>{book.title}</p>
        </label>
        <label>
          <span>부제목</span>
          <p>{book.subtitle}</p>
        </label>
        <label>
          <span>저자</span>
          <p>{book.authors}</p>
        </label>
        <label>
          <span>출판사</span>
          <p>{book.publisher}</p>
        </label>
        <label>
          <span>페이지 수</span>
          <p>{book.pages}</p>
        </label>
        <label>
          <span>평점</span>
          <p>
            {[...Array(5)].map((_, i) => (
              <span key={i}>{i < +book.rating ? "★" : "☆"}</span>
            ))}
          </p>
        </label>
        <label>
          <span>가격</span>
          <p>{book.price}</p>
        </label>
        <label>
          <span>상세정보</span>
          <p>
            {book.desc}
            <span className="ml-2 !text-xs underline">
              <a href={link}>더보기</a>
            </span>
          </p>
        </label>
      </section>
    </div>
  );
}
