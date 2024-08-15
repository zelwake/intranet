"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const schema = z.object({
  title: z
    .string({ invalid_type_error: "Neplatný název" })
    .min(5, "Název musí být delší jak 5 znaků"),
  content: z
    .string({ invalid_type_error: "Neplatný text popisu" })
    .min(20, "Popis musí obsahovat nejméně 20 znaků"),
  tags: z.string({ invalid_type_error: "Neplatný typ tagu" }).array(),
  totalTimeInMinutes: z
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
  });

  if (rawFormData.error) {
    return {
      errors: rawFormData.error.flatten().fieldErrors,
    };
  }

  const parsedData = rawFormData.data;
  const tags = parsedData.tags.map((t) => t.trim().toLowerCase());

  let redirectUrl: string = "";
  //TODO uložit data do databáze
  try {
    redirectUrl = await prisma.recipe
      .create({
        data: {
          title: parsedData.title,
          content: parsedData.content,
          photo_url: "",
          totalTimeInMinutes: 123,
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
    return null;
  }

  //TODO přesunout po vytvoření na stránku s receptem

  revalidatePath("/");
  redirect(redirectUrl);
}
