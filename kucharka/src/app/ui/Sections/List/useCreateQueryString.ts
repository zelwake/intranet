import { ReadonlyURLSearchParams } from "next/navigation";
import { useCallback } from "react";

export function useCreateQueryString(
  name: string,
  value: string,
  searchParams: ReadonlyURLSearchParams
) {
  const isPresentInSearchParams = searchParams.getAll("tag")?.includes(value);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (!isPresentInSearchParams) params.append(name, value);

      return params.toString();
    },
    [isPresentInSearchParams, searchParams]
  );

  return createQueryString(name, value);
}
