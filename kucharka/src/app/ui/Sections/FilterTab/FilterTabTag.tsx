"use client";

import { ArrayElement } from "@/utils/types/generics";
import { usePathname, useRouter } from "next/navigation";
import { useCreateQueryString } from "../List/useCreateQueryString";
import { FilterTabProps } from "./FilterTab";

export default function FilterTabTag({
  id,
  name,
}: ArrayElement<FilterTabProps["data"]>) {
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
