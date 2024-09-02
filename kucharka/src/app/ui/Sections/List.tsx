import { getRecipeData } from "@/utils/database/getRecipeData";
import { AsyncReturnType } from "@/utils/types/AsyncReturnType";
import RecipeCard from "./List/RecipeCard";

export type ListProps = { data: AsyncReturnType<typeof getRecipeData> };

export default function List({ data }: ListProps) {
  return (
    <ul className="grid grid-cols-2 items-start p-10">
      {data.map((recipe) => (
        <RecipeCard key={recipe.id} {...recipe} />
      ))}
    </ul>
  );
}
