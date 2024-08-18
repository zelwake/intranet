"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { HOME, RECIPE_ID } from "../paths";
import { serializeIngredients } from "../scripts/serializedIngredients";
import { RecipeFormState, recipeSchema } from "../types/recipeTypes";

export async function createRecipe(
  prevState: RecipeFormState,
  formData: FormData
): Promise<RecipeFormState> {
  const rawFormData = recipeSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
    tags: formData.getAll("tags"),
    totalTimeInMinutes: formData.get("totalTimeInMinutes"),
    ingredientsAmount: formData.get("ingredientsAmount"),
    ingredients: serializeIngredients(
      parseInt(formData.get("ingredientsAmount") as string),
      formData
    ),
  });

  if (rawFormData.error) {
    return {
      errors: rawFormData.error.flatten().fieldErrors,
    };
  }

  const { title, content, totalTimeInMinutes } = rawFormData.data;
  const tags = rawFormData.data.tags.map((t) => t.trim().toLowerCase());
  const ingredients = rawFormData.data.ingredients.map((i) => ({
    ...i,
    name: i.name.trim().toLowerCase(),
  }));

  let redirectUrl = null;

  try {
    redirectUrl = await prisma.recipe
      .create({
        data: {
          title,
          content,
          photo_url: "",
          totalTimeInMinutes,
          TagToRecipe: {
            create: tags.map((t) => ({
              tag: {
                connectOrCreate: {
                  where: { name: t },
                  create: { name: t },
                },
              },
            })),
          },
          ingredientToRecipe: {
            create: ingredients.map((i) => ({
              ingredient: {
                connectOrCreate: {
                  where: { name: i.name },
                  create: { name: i.name },
                },
              },
              ingredientAmount: i.amount,
              ingredientAmountType: i.amountType,
            })),
          },
        },
        select: {
          id: true,
        },
      })
      .then((d) => RECIPE_ID(d.id));
  } catch (error) {
    console.log(error);
    return null;
  }

  revalidatePath(HOME);
  redirect(redirectUrl ?? HOME);
}
