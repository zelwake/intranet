import { ArrayElement } from "@/utils/types/generics";
import { ListProps } from "../List";
import HeaderLink from "./HeaderLink";
import Table from "./Table";

export type RecipeCardProps = ArrayElement<ListProps["data"]>;

export default function RecipeCard({
  TagToRecipe,
  ingredientToRecipe,
  ...props
}: RecipeCardProps) {
  return (
    <li className="p-5 text-lime-200 grid grid-rows-subgrid row-span-4 gap-2">
      <HeaderLink {...props} />

      <Table ingredientToRecipe={ingredientToRecipe} />

      <section className="flex gap-2 flex-wrap justify-start">
        <h4>Tagy:</h4>
        {TagToRecipe.map((ttr) => {
          return (
            <p
              key={ttr.tag.id}
              className="underline cursor-pointer hover:text-lime-50 transition-colors"
            >
              {ttr.tag.name}
            </p>
          );
        })}
      </section>
    </li>
  );
}
