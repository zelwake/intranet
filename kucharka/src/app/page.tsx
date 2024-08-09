import { getRecipeData } from "@/utils/database/getRecipeData";

export default async function Home() {
  const data = await getRecipeData();
  return (
    <main className="h-screen w-full bg-blue-950">
      <header>
        <h1 className="font-bold text-gray-200 text-3xl text-center pt-5">
          Seznam receptů
        </h1>
        <a href="/" className="absolute right-2 top-2">
          <button className="text-blue-800 px-2 py-1 bg-slate-100 rounded-md">
            Zpět na intranet
          </button>
        </a>
      </header>
      {data.map((e) => (
        <p key={e.id}>{e.title}</p>
      ))}
    </main>
  );
}
