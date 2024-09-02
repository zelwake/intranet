import { RECIPE_ID } from "@/utils/paths";
import { formatTimeWithMinutes } from "@/utils/scripts/formatTimeWithMinutes";
import { PickFromArray } from "@/utils/types/generics";
import Image from "next/image";
import Link from "next/link";
import { ListProps } from "../List";

type HeaderLinkProps = PickFromArray<
  ListProps["data"],
  "id" | "title" | "photo_url" | "totalTimeInMinutes"
>;

export default function HeaderLink({
  id,
  photo_url,
  title,
  totalTimeInMinutes,
}: HeaderLinkProps) {
  return (
    <section className="space-y-2">
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
      <p>Čas přípravy je {formatTimeWithMinutes(totalTimeInMinutes)}</p>
    </section>
  );
}
