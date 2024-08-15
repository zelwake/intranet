"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { HOME } from "../paths";

const schema = z.object({
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
});

export type RecipeSchemaKeys = keyof z.infer<typeof schema>;

type RecipeErrors = Partial<Record<RecipeSchemaKeys, string[]>>;

export type RecipeFormState = null | {
  errors: RecipeErrors;
};

export async function createRecipe(
  prevState: RecipeFormState,
  formData: FormData
): Promise<RecipeFormState> {
  const rawFormData = schema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
    tags: formData.getAll("tags"),
    totalTimeInMinutes: formData.get("totalTimeInMinutes"),
  });

  if (rawFormData.error) {
    return {
      errors: rawFormData.error.flatten().fieldErrors,
    };
  }

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
