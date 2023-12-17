import Link from "next/link";

export default function NotFound() {
  return (
    <section className="grid place-items-center gap-4 py-10">
      <p className="text-lg font-bold text-slate-400">해당 책에 대한 정보를 찾을 수 없습니다.</p>
      <Link className="text-lg font-bold text-slate-400 underline" href="/">
        홈으로 돌아가기
      </Link>
    </section>
  );
}
