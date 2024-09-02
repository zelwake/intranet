"use server";

import prisma from "@/lib/prisma";

export async function getCookingTime() {
  return prisma.recipe.aggregate({
    _max: {
      totalTimeInMinutes: true,
    },
    _min: {
      totalTimeInMinutes: true,
    },
  });
}
