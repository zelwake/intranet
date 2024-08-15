"use client";

import { createRecipe } from "@/utils/database/createRecipe";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import SelectTags, { SelectTagsProps } from "./SelectTags";
import SubmitButton from "./SubmitButton";
import TextareaInput from "./TextareaInput";
import TextInput from "./TextInput";

export default function Form({ tags }: SelectTagsProps) {
  const [formState, formAction] = useFormState(createRecipe, null);
  const router = useRouter();

  useEffect(() => {
    if (formState && formState.success) {
    }
  }, [formState]);

  return (
    <form
      action={formAction}
      className="bg-sky-400 py-5 px-10 mt-10 flex flex-col justify-center items-center gap-8"
    >
      <TextInput name="title" text="Název" />

      <TextareaInput name="content" text="Postup" />

      <SelectTags tags={tags} />

      <SubmitButton />
    </form>
  );
}
