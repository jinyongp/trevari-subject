import { RefObject, useCallback, useEffect, useRef } from "react";

export function useIntersectionObserver(
  target: RefObject<Element> | Element,
  callbackFn: IntersectionObserverCallback,
  options?: IntersectionObserverInit,
) {
  const observer = useRef<IntersectionObserver | null>(null);

  const observe = useCallback(() => {
    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver(callbackFn, options);

    if (target instanceof Element) {
      observer.current.observe(target);
    } else if (target.current) {
      observer.current.observe(target.current);
    }
  }, [target, callbackFn, options]);

  function unobserve() {
    if (observer.current) {
      observer.current.disconnect();
    }
  }

  useEffect(() => {
    observe();
    return unobserve;
  }, [target, callbackFn, options, observe]);

  return {
    stop: unobserve,
  };
}
