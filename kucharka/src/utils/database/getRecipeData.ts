"use server";

import prisma from "@/lib/prisma";

export const getRecipeData = async () => {
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
