"use client";

import { useRef, useState } from "react";

interface Props {
  initialSearchText?: string;
  onSubmit?(searchText: string): void;
  onTextChange?(searchText: string): void;
}

export default function SearchForm({ initialSearchText, onSubmit, onTextChange }: Props) {
  const [searchText, setSearchText] = useState(initialSearchText ?? "");
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit?.(searchText);
    inputRef.current?.blur();
  }

  function handleTextChange(event: React.ChangeEvent<HTMLInputElement>) {
    onTextChange?.(event.target.value);
    setSearchText(event.target.value);
  }

  return (
    <form className="flex w-full items-center justify-center" onSubmit={handleSubmit}>
      <label className="flex w-full flex-col gap-5">
        <input
          type="text"
          ref={inputRef}
          id="pw-search"
          value={searchText}
          onChange={handleTextChange}
          className="w-full rounded-l-md border border-r-0 border-slate-300 p-2 text-base focus:border-slate-400 focus:outline-none md:text-xl"
          placeholder="책 제목을 입력해주세요."
        />
      </label>
      <button
        type="submit"
        id="pw-search-submit-button"
        className="whitespace-nowrap rounded-r-md border border-slate-800 bg-slate-800 p-2 text-base text-white focus:bg-slate-900 focus:outline-none md:text-xl"
      >
        검색
      </button>
    </form>
  );
}
