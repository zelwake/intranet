import { getRecipeData } from "@/utils/database/getRecipeData";

export default async function Home() {
  const data = await getRecipeData();
  return (
    <main>
      {data.map((e) => (
        <p key={e.id}>{e.title}</p>
      ))}
    </main>
  );
}
