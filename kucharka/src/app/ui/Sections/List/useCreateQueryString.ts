import { useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function useCreateQueryString(
  name: "tag" | "ingredient" | "lte" | "gte",
  value: string
): [string, boolean] {
  const searchParams = useSearchParams();
  const isPresentInSearchParams = searchParams.getAll(name)?.includes(value);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (isPresentInSearchParams) params.delete(name, value);
      else params.append(name, value);

      return params.toString();
    },
    [isPresentInSearchParams, searchParams]
  );

  return [createQueryString(name, value), isPresentInSearchParams];
}
