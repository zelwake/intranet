"use server";

import { z } from "zod";

const schema = z.object({
  title: z
    .string({ invalid_type_error: "Neplatný název" })
    .min(5, "Název musí být delší jak 5 znaků"),
  content: z.string({ invalid_type_error: "Neplatný text popisu" }),
  tags: z.string({ invalid_type_error: "Neplatný typ tagu" }).array(),
});

type SchemaKeys = keyof z.infer<typeof schema>;

type RecipeErrors = Partial<Record<SchemaKeys, string[]>>;

export type RecipeFormState =
  | null
  | {
      success: true;
      message: string;
      redirectUrl: string;
    }
  | {
      success: false;
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
      success: false,
      errors: parseFormData.error.flatten().fieldErrors,
    };
  }

  //TODO uložit data do databáze

  //TODO přesunout po vytvoření na stránku s receptem

  return {
    success: true,
    message: "Položka se přidala",
    redirectUrl: "/",
  };
}
