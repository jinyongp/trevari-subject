import SearchProvider from "./search-provider";

export default function Provider({ children }: React.PropsWithChildren) {
  return (
    // <ScrollProvider>
    <SearchProvider>{children}</SearchProvider>
    // </ScrollProvider>
  );
}
