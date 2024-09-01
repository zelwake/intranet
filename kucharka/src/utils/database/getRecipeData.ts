"use server";

import prisma from "@/lib/prisma";

export type RecipeDataProps = {
  [key: string]: string | undefined;
};

export const getRecipeData = async (searchParams: RecipeDataProps) => {
  const where = whereBuilder(searchParams);

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

type WhereProps = {
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
    ingredientToRecipe?: {
      some: {
        ingredient: {
          name: {
            in: string[];
          };
        };
      };
    };
  };
};

function whereBuilder(searchParams: RecipeDataProps) {
  const where: WhereProps = {};

  const tag = searchParams["tag"];
  const ingredient = searchParams["ingredient"];
  const time = {
    gte: searchParams["gte"],
    lte: searchParams["lte"],
  };

  if (tag || time.gte || time.lte || ingredient) {
    where.where = {};
    if (tag) {
      where.where.TagToRecipe = {
        some: {
          tag: {
            name: {
              in: Array.isArray(tag) ? tag : [tag],
            },
          },
        },
      };
    }
    if (ingredient) {
      where.where.ingredientToRecipe = {
        some: {
          ingredient: {
            name: {
              in: Array.isArray(ingredient) ? ingredient : [ingredient],
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
  return where;
}
