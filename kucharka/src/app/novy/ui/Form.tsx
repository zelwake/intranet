"use client";

import { createRecipe, RecipeSchemaKeys } from "@/utils/database/createRecipe";
import { useFormState } from "react-dom";
import IngredientList from "./IngredientList";
import NumberInput from "./NumberInput";
import SelectTags, { SelectTagsProps } from "./SelectTags";
import SubmitButton from "./SubmitButton";
import TextareaInput from "./TextareaInput";
import TextInput from "./TextInput";

export default function Form({ tags }: SelectTagsProps) {
  const [formState, formAction] = useFormState(createRecipe, null);

  const extractError = (key: RecipeSchemaKeys): string[] | undefined => {
    if (formState == null) return undefined;

    console.log(formState);

    return formState.errors[key] ?? undefined;
  };

  return (
    <form
      action={formAction}
      className="bg-sky-400 py-5 px-10 mt-10 flex flex-col justify-center items-center gap-8"
    >
      <TextInput name="title" text="Název" errors={extractError("title")} />

      <IngredientList />

      <TextareaInput
        name="content"
        text="Postup"
        errors={extractError("content")}
      />

      <NumberInput
        name="totalTimeInMinutes"
        text="Doba vaření v minutách"
        errors={extractError("totalTimeInMinutes")}
      />

      <SelectTags tags={tags} />

      <SubmitButton />
    </form>
  );
}
