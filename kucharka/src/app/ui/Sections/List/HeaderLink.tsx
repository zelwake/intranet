import { RECIPE_ID } from "@/utils/paths";
import { PickFromArray } from "@/utils/types/generics";
import Image from "next/image";
import Link from "next/link";
import { ListProps } from "../List";

type HeaderLinkProps = PickFromArray<
  ListProps["data"],
  "id" | "title" | "photo_url"
>;

export default function HeaderLink({ id, photo_url, title }: HeaderLinkProps) {
  return (
    <Link href={RECIPE_ID(id)}>
      <h3 className="text-lg font-bold uppercase">{title}</h3>
      <Image
        src={photo_url ? `/images/${photo_url}` : "/images/stock.jpg"}
        alt={title}
        width={196}
        height={196}
        className="h-auto mt-2"
      />
    </Link>
  );
}
