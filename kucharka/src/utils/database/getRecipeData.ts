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
    },
  });

  return data;
};
