import { getRecipeDataById } from "@/utils/database/getRecipeDataById";
import { AsyncReturnType } from "@/utils/types/AsyncReturnType";
import Content from "./ui/Content";
import Header from "./ui/Header";
import Table from "./ui/Table";

export type RecipeInfoProps = {
  recipeData: AsyncReturnType<typeof getRecipeDataById>;
};

export default function RecipeInfo({ recipeData }: RecipeInfoProps) {
  return (
    <>
      <Header photo_url={recipeData.photo_url} title={recipeData.title} />

      <Table ingredientToRecipe={recipeData.ingredientToRecipe} />

      <Content content={recipeData.content} />
    </>
  );
}
