import { Recipe } from "@prisma/client";
import Image from "next/image";

type HeaderProps = Pick<Recipe, "photo_url" | "title">;

export default function Header({ photo_url, title }: HeaderProps) {
  return (
    <header className="flex items-end gap-5">
      <Image
        src={photo_url ? `/images/${photo_url}` : "/images/stock.jpg"}
        alt={title}
        width={1600}
        height={900}
        className="h-auto max-w-72"
      />
      <h1 className="text-3xl">{title}</h1>
    </header>
  );
}
