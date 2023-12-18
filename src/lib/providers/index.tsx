import SearchProvider from "./search-provider";

export default function Provider({ children }: React.PropsWithChildren) {
  return <SearchProvider>{children}</SearchProvider>;
}
