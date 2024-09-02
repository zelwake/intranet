import { ArrayElement } from "@/utils/types/generics";
import { ListProps } from "../List";
import HeaderLink from "./HeaderLink";
import Table from "./Table";
import Tags from "./Tags";

export type RecipeCardProps = ArrayElement<ListProps["data"]>;

export default function RecipeCard({
  TagToRecipe,
  ingredientToRecipe,
  ...props
}: RecipeCardProps) {
  return (
    <li className="p-5 text-lime-200 grid grid-rows-subgrid row-span-4 gap-3">
      <HeaderLink {...props} />

      <Table ingredientToRecipe={ingredientToRecipe} />

      <Tags TagToRecipe={TagToRecipe} />
    </li>
  );
}
