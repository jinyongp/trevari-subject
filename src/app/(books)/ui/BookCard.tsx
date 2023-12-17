import Image from "next/image";

interface Props {
  book: {
    title: string;
    subtitle: string;
    image: string;
  };
}

export default function BookCard({ book }: Props) {
  return (
    <div className="group rounded-md shadow-md">
      <figure className="flex flex-col items-center px-6 sm:flex-row">
        <div className="relative aspect-[2/3] h-80">
          <Image
            src={book.image}
            alt={`${book.title} - ${book.subtitle}`}
            fill
            sizes="100vw" // https://github.com/vercel/next.js/issues/58586
            className="object-cover transition-transform group-hover:scale-105"
          />
        </div>
        <figcaption className="mb-4 flex grow flex-col p-4 sm:mb-0">
          <h3 className="font-bold">{book.title}</h3>
          <p className="line-clamp-2">{book.subtitle}</p>
        </figcaption>
      </figure>
    </div>
  );
}
