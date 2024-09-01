import { Ingredient, IngredientToRecipe, Recipe } from "@prisma/client";
import Content from "./ui/Content";
import Header from "./ui/Header";
import Table from "./ui/Table";

type IngredientToRecipeWithIngredient = IngredientToRecipe & {
  ingredient: Ingredient;
};

export type RecipeInfoProps = {
  recipeData: Recipe & {
    ingredientToRecipe: IngredientToRecipeWithIngredient[];
  };
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
