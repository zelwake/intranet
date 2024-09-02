import { getRecipeData } from "@/utils/database/getRecipeData";
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

  return (
    <>
      <Header text="Seznam receptů" />

      <FilterTab />

      <List data={recipeData} />
    </>
  );
}
