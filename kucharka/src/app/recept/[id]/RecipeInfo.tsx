"use client";

import { Ingredient, IngredientToRecipe, Recipe } from "@prisma/client";
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

      <h2 className="mt-10">Postup</h2>
      <p>{recipeData.content}</p>
    </>
  );
}
