"use client";

import { createRecipe, RecipeFormState } from "@/utils/database/createRecipe";
import { useFormState } from "react-dom";
import SelectTags, { SelectTagsProps } from "./SelectTags";
import SubmitButton from "./SubmitButton";
import TextareaInput from "./TextareaInput";
import TextInput from "./TextInput";

export default function Form({ tags }: SelectTagsProps) {
  const [formState, formAction] = useFormState(createRecipe, null);

  function extractError(formState: RecipeFormState): string[] | undefined {
    if (formState == null) return undefined;
  }

  return (
    <form
      action={formAction}
      className="bg-sky-400 py-5 px-10 mt-10 flex flex-col justify-center items-center gap-8"
    >
      <TextInput
        name="title"
        text="Název"
        errors={formState?.errors.title ?? undefined}
      />

      <TextareaInput name="content" text="Postup" />

      <SelectTags tags={tags} />

      <SubmitButton />
    </form>
  );
}
