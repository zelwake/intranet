"use server";

export async function createRecipe(formData: FormData) {
  const rawFormData = {};
  console.log(formData);

  await new Promise((resolve) =>
    setTimeout(
      () => resolve(console.log("finished wait in createRecipe function")),
      1500
    )
  );

  return 1;
}
