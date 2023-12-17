"use client";

import { useRouter } from "next/navigation";

interface Props extends React.PropsWithChildren<React.HTMLAttributes<HTMLButtonElement>> {}

export default function GoBack({ children, ...props }: Props) {
  const router = useRouter();

  return (
    <button type="button" {...props} onClick={() => router.back()}>
      {children}
    </button>
  );
}
