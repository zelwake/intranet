import { getRecipeDataById } from "@/utils/database/getRecipeDataById";
import { DynamicRouteSlugProps } from "@/utils/types/dynamicRoute";
import RecipeInfo from "./RecipeInfo";

export default async function Recipe({ params }: DynamicRouteSlugProps) {
  const recipeData = await getRecipeDataById(params.id);

  if (!recipeData)
    return (
      <section className="text-red-500 flex items-center justify-center">
        <h1 className="text-4xl mt-10">Recept s tímto id neexistuje</h1>
      </section>
    );

  return (
    <section className="text-white flex flex-col px-20">
      <RecipeInfo recipeData={recipeData} />
    </section>
  );
}
