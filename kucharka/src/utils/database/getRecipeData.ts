"use server";

import prisma from "@/lib/prisma";

type RecipeDataProps = {
  [key: string]: string | undefined;
};

export const getRecipeData = async (searchParams: RecipeDataProps) => {
  const where: {
    where?: {
      totalTimeInMinutes?: {
        gte?: number;
        lte?: number;
      };
      TagToRecipe?: {
        some: {
          tag: {
            name: {
              in: string[];
            };
          };
        };
      };
    };
  } = {};

  const tags = searchParams["tags"];
  const time = {
    gte: searchParams["gte"],
    lte: searchParams["lte"],
  };

  if (tags || time.gte || time.lte) {
    where.where = {};
    if (tags) {
      where.where.TagToRecipe = {
        some: {
          tag: {
            name: {
              in: typeof tags === "string" ? [tags] : tags,
            },
          },
        },
      };
    }
    if (time.gte) {
      where.where.totalTimeInMinutes = {
        gte: parseInt(time.gte),
      };
    }
    if (time.lte) {
      where.where.totalTimeInMinutes = {
        lte: parseInt(time.lte),
      };
    }
  }

  console.table(where);

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
    ...where,
  });

  return data;
};
