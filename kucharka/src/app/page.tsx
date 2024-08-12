import { getRecipeData } from "@/utils/database/getRecipeData";

export default async function Home() {
  const data = await getRecipeData();
  return (
    <>
      <header>
        <h1 className="font-bold text-gray-200 text-3xl text-center">
          Seznam receptů
        </h1>
      </header>
      {data.map((e) => (
        <p key={e.id}>{e.title}</p>
      ))}
    </>
  );
}
