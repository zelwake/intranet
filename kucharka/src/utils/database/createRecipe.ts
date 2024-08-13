"use server";

import { z } from "zod";

const schema = z.object({
  title: z.string({ invalid_type_error: "Neplatný název" }),
  content: z.string(),
  tags: z.string().array(),
});

export async function createRecipe(formData: FormData) {
  const rawFormData = schema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
    tags: formData.getAll("tags"),
  });

  rawFormData.error
    ? console.log(rawFormData.error.flatten())
    : console.log(rawFormData.data);

  await new Promise((resolve) =>
    setTimeout(
      () => resolve(console.log("finished wait in createRecipe function")),
      1500
    )
  );

  //TODO uložit data do databáze
  //TODO přesunout po vytvoření na stránku s receptem

  return 1;
}
