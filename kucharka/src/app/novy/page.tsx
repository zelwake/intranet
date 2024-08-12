import { createRecipe } from "@/utils/database/createRecipe";
import { Metadata } from "next";
import Header from "../ui/Sections/Header";
import SubmitButton from "./ui/SubmitButton";
import TextInput from "./ui/TextInput";

export const metadata: Metadata = {
  title: "Nový recept",
};

export default function Novy() {
  return (
    <>
      <Header text="Nový recept" />
      <form
        action={createRecipe}
        className="bg-sky-400 py-5 px-10 mt-10 flex flex-col justify-center items-center gap-8"
      >
        <TextInput name="title" text="Název" />
        <SubmitButton />
      </form>
    </>
  );
}
