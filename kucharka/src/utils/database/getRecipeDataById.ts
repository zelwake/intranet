import prisma from "@/lib/prisma";

export async function getRecipeDataById(id: string) {
  const data = await prisma.recipe.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      ingredientToRecipe: {
        include: {
          ingredient: true,
        },
      },
    },
  });

  return data;
}
