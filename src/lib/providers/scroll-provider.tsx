"use client";

import { createContext, useContext, useEffect } from "react";

type ScrollContextProps = Record<string, number>;

export const ScrollContext = createContext<ScrollContextProps>({});

export function useScrollContext(name: string, scrollable?: Window | Element) {
  const scrollContext = useContext(ScrollContext);
  if (!scrollable && typeof window !== "undefined") {
    scrollable = window;
  }

  useEffect(() => {
    console.log(scrollContext[name]);
    if (scrollContext[name]) {
      new Promise((resolve) => setTimeout(resolve, 0)).then(() => {
        scrollable?.scrollTo(0, scrollContext[name]);
        printScrollable();
      });
    }
    scrollable?.addEventListener("scroll", updateScrollPosition);
    return () => scrollable?.removeEventListener("scroll", updateScrollPosition);

    function updateScrollPosition() {
      if (scrollable instanceof Window) {
        scrollContext[name] = scrollable.scrollY;
      } else if (scrollable instanceof Element) {
        scrollContext[name] = scrollable.scrollTop;
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function printScrollable() {
    if (scrollable instanceof Window) {
      console.log(`Scroll To ${scrollContext[name]} in Window (Height: ${scrollable.innerHeight})`);
    } else if (scrollable instanceof Element) {
      console.log(`Scroll To ${scrollContext[name]} in Element (Height: ${scrollable.scrollHeight})`);
    }
  }

  return scrollContext;
}

export default function ScrollProvider({ children }: React.PropsWithChildren) {
  return <ScrollContext.Provider value={{}}>{children}</ScrollContext.Provider>;
}
