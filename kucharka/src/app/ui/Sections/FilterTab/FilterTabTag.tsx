"use client";

import { getIngredients } from "@/utils/database/getIngredients";
import { AsyncReturnType } from "@/utils/types/AsyncReturnType";
import { ArrayElement } from "@/utils/types/generics";
import { usePathname, useRouter } from "next/navigation";
import { useCreateQueryString } from "../List/useCreateQueryString";

export default function FilterTabTag({
  id,
  name,
}: ArrayElement<AsyncReturnType<typeof getIngredients>>) {
  const router = useRouter();
  const pathname = usePathname();
  const [createQueryString, isPresentInQueryString] = useCreateQueryString(
    "tag",
    name
  );

  return (
    <button
      key={id}
      className={`bg-lime-300 rounded-lg px-3 py-0.5 hover:bg-lime-50 transition-color duration-500 ${
        isPresentInQueryString ? "-order-1 bg-amber-500" : ""
      }`}
      onClick={() => router.push(`${pathname}?${createQueryString}`)}
    >
      {name}
    </button>
  );
}
