import { getRecipeData } from "@/utils/database/getRecipeData";
import { getTags } from "@/utils/database/getTags";
import FilterTab from "./ui/Sections/FilterTab/FilterTab";
import Header from "./ui/Sections/Header";
import List from "./ui/Sections/List";

export type HomeProps = {
  searchParams: {
    [key: string]: string | undefined;
  };
};

export default async function Home({ searchParams }: HomeProps) {
  const recipeData = await getRecipeData(searchParams);
  const tagData = await getTags();

  return (
    <>
      <Header text="Seznam receptů" />

      <FilterTab data={tagData} />

      <List data={recipeData} />
    </>
  );
}
