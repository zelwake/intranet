"use client";

import { getTags } from "@/utils/database/getTags";
import { AsyncReturnType } from "@/utils/types/AsyncReturnType";
import { ArrayElement } from "@/utils/types/generics";
import { usePathname, useRouter } from "next/navigation";
import { useCreateQueryString } from "../List/useCreateQueryString";

export default function FilterTabIngredient({
  id,
  name,
}: ArrayElement<AsyncReturnType<typeof getTags>>) {
  const router = useRouter();
  const pathname = usePathname();
  const [createQueryString, isPresentInQueryString] = useCreateQueryString(
    "ingredient",
    name
  );

  return (
    <button
      key={id}
      className={`bg-amber-300 rounded-lg px-3 py-0.5 hover:bg-amber-50 transition-color duration-500 ${
        isPresentInQueryString ? "-order-1 bg-lime-500" : ""
      }`}
      onClick={() => router.push(`${pathname}?${createQueryString}`)}
    >
      {name}
    </button>
  );
}
