import { getRecipeData } from "@/utils/database/getRecipeData";
import Header from "./ui/Sections/Header";
import List from "./ui/Sections/List";

export type HomeProps = {
  searchParams: {
    [key: string]: string | undefined;
  };
};

export default async function Home({ searchParams }: HomeProps) {
  const data = await getRecipeData(searchParams);

  return (
    <>
      <Header text="Seznam receptů" />
      <List data={data} />
    </>
  );
}
