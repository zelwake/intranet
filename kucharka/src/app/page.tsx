import { getRecipeData } from "@/utils/database/getRecipeData";
import Header from "./ui/Sections/Header";

export default async function Home() {
  const data = await getRecipeData();
  return (
    <>
      <Header text="Seznam receptů" />
      {data.map((e) => (
        <p key={e.id}>{e.title}</p>
      ))}
    </>
  );
}
