"use client";

import { ArrayElement } from "@/utils/types/generics";
import { usePathname, useRouter } from "next/navigation";
import { TagsProps } from "./Tags";
import { useCreateQueryString } from "./useCreateQueryString";

export type Tag = ArrayElement<TagsProps["TagToRecipe"]>;

export default function Tag({ tag }: Tag) {
  const router = useRouter();
  const pathname = usePathname();

  const [createQueryString, isPresentInSearchParams] = useCreateQueryString(
    "tag",
    tag.name
  );

  return (
    <span
      className={`underline cursor-pointer hover:text-lime-50 transition-colors ${
        isPresentInSearchParams ? "text-amber-500 font-medium" : ""
      }`}
      onClick={() => router.push(`${pathname}?${createQueryString}`)}
    >
      {tag.name}
    </span>
  );
}
