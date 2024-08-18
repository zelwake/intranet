"use server";

import prisma from "@/lib/prisma";

export const getRecipeData = async () => {
  console.log(
    await prisma.recipe.findMany({
      include: {
        ingredientToRecipe: true,
        TagToRecipe: true,
      },
    })
  );

  const data = await prisma.recipe.findMany({
    include: {
      TagToRecipe: {
        select: {
          tag: true,
        },
      },
      ingredientToRecipe: {
        select: {
          ingredient: true,
          ingredientAmount: true,
          ingredientAmountType: true,
        },
      },
    },
  });

  return data;
};
