"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

const schema = z.object({
  title: z
    .string({ invalid_type_error: "Neplatný název" })
    .min(5, "Název musí být delší jak 5 znaků"),
  content: z.string({ invalid_type_error: "Neplatný text popisu" }),
  tags: z.string({ invalid_type_error: "Neplatný typ tagu" }).array(),
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
  const parseFormData = schema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
    tags: formData.getAll("tags"),
  });

  if (parseFormData.error) {
    return {
      errors: parseFormData.error.flatten().fieldErrors,
    };
  }

  //TODO uložit data do databáze

  //TODO přesunout po vytvoření na stránku s receptem

  redirect("/");
}
