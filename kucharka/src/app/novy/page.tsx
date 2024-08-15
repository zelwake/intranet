import { getTags } from "@/utils/database/getTags";
import { Metadata } from "next";
import Header from "../ui/Sections/Header";
import Form from "./ui/Form";

export const metadata: Metadata = {
  title: "Nový recept",
};

export default async function Novy() {
  const tags = await getTags();

  return (
    <>
      <Header text="Nový recept" />
      <Form tags={tags} />
    </>
  );
}
