"use server";

import prisma from "@/lib/prisma";

export const getRecipeData = async () => {
  const data = await prisma.recipe.findMany();

  return data;
};
