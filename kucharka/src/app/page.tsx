import { getRecipeData } from "@/utils/database/getRecipeData";
import Image from "next/image";
import Header from "./ui/Sections/Header";

export default async function Home() {
  const data = await getRecipeData();
  return (
    <>
      <Header text="Seznam receptů" />
      <section className="grid grid-cols-2 items-center p-10">
        {data.map((recipe) => (
          <div
            key={recipe.id}
            className="p-5 text-lime-200 flex flex-col gap-2"
          >
            <h3 className="text-lg font-bold uppercase">{recipe.title}</h3>
            <Image
              src={
                recipe.photo_url
                  ? `/images/${recipe.photo_url}`
                  : "/images/stock.jpg"
              }
              alt={recipe.title}
              width={128}
              height={128}
              className="h-auto"
            />
            <p>Popis:</p>
            <p>{recipe.content}</p>

            <p>Čas přípravy je {recipe.totalTimeInMinutes} minut</p>
            <table>
              <thead>
                <tr>
                  <th colSpan={2}>Ingredience:</th>
                </tr>
              </thead>
              <tbody>
                {recipe.ingredientToRecipe.map((itr) => (
                  <tr key={itr.ingredient.id}>
                    <td>{itr.ingredient.name}</td>
                    <td>
                      {itr.ingredientAmount} {itr.ingredientAmountType}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <section className="flex gap-2 flex-wrap justify-start">
              <h4>Tagy:</h4>
              {recipe.TagToRecipe.map((ttr) => {
                return (
                  <p
                    key={ttr.tag.id}
                    className="underline cursor-pointer hover:text-lime-50 transition-colors"
                  >
                    {ttr.tag.name}
                  </p>
                );
              })}
            </section>
          </div>
        ))}
      </section>
    </>
  );
}
