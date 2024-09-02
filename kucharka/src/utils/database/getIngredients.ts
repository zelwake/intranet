"use server";

import prisma from "@/lib/prisma";

export async function getIngredients() {
  return prisma.ingredient.findMany();
}
