"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { HOME } from "../paths";
import { serializeIngredients } from "../scripts/serializedIngredients";
import { AmountType } from "../types/recipeTypes";

const keys = Object.keys(AmountType) as (keyof typeof AmountType)[];
const kk = ["kg", "g", "l", "ml", "ks"] as const;

const ingredientSchema = z.object({
  name: z.string().min(1),
  amountType: z.nativeEnum(AmountType),
  amount: z.coerce.number(),
});

const recipeSchema = z.object({
  title: z
    .string({ invalid_type_error: "Neplatný název" })
    .min(5, "Název musí být delší jak 5 znaků"),
  content: z
    .string({ invalid_type_error: "Neplatný text popisu" })
    .min(20, "Popis musí obsahovat nejméně 20 znaků"),
  tags: z.string({ invalid_type_error: "Neplatný typ tagu" }).array(),
  totalTimeInMinutes: z.coerce
    .number({
      invalid_type_error: "Musí být číslo",
      required_error: "Musí být vyplněno",
    })
    .gt(0, "Čas musí být pozitivní číslo"),
  ingredientsAmount: z.coerce.number().gt(0),
  ingredients: z
    .array(ingredientSchema)
    .min(1, "Musí být minimálně 1 ingredience"),
});

export type RecipeSchemaKeys = keyof z.infer<typeof recipeSchema>;

type RecipeErrors = Partial<Record<RecipeSchemaKeys, string[]>>;

export type RecipeFormState = null | {
  errors: RecipeErrors;
};

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

  // console.log(formData);

  if (rawFormData.error) {
    console.log(rawFormData.error);
    return {
      errors: rawFormData.error.flatten().fieldErrors,
    };
  }

  console.table(rawFormData);
  return null;

  const { title, content, totalTimeInMinutes } = rawFormData.data;
  const tags = rawFormData.data.tags.map((t) => t.trim().toLowerCase());

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
        },
        select: {
          id: true,
        },
      })
      .then((d) => `/${d.id}`);
  } catch (error) {
    console.log(error);
    return null;
  }

  revalidatePath(HOME);
  redirect(redirectUrl ?? HOME);
}
