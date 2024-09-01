"use server";

import prisma from "@/lib/prisma";

export const getRecipeData = async () => {
  const data = await prisma.recipe.findMany({
    select: {
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
      id: true,
      photo_url: true,
      title: true,
      totalTimeInMinutes: true,
    },
  });

  return data;
};
