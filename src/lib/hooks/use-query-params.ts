import { useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function useQueryParams() {
  const searchParams = useSearchParams();

  const set = useCallback(
    (name: string, value: string) => {
      const newParams = new URLSearchParams(searchParams);
      newParams.set(name, value);
      return `${newParams}`;
    },
    [searchParams],
  );

  const get = useCallback(
    (name: string) => {
      const newParams = new URLSearchParams(searchParams);
      return newParams.get(name);
    },
    [searchParams],
  );

  function toString() {
    return `${searchParams}`;
  }

  return {
    set,
    get,
    toString,
  };
}
