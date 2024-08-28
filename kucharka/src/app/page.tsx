import { getRecipeData } from "@/utils/database/getRecipeData";
import Header from "./ui/Sections/Header";

export default async function Home() {
  const data = await getRecipeData();
  return (
    <>
      <Header text="Seznam receptů" />
      <section className="grid grid-cols-2 items-center p-10">
        {data.map((e) => (
          <div key={e.id} className="p-5 text-lime-200 flex flex-col gap-2">
            <h3 className="text-lg font-bold uppercase">{e.title}</h3>
            <p>Popis:</p>
            <p>{e.content}</p>

            <p>Čas přípravy je {e.totalTimeInMinutes} minut</p>
            <table>
              <thead>
                <tr>
                  <th colSpan={2}>Ingredience:</th>
                </tr>
              </thead>
              <tbody>
                {e.ingredientToRecipe.map((i) => (
                  <tr key={i.ingredient.id}>
                    <td>{i.ingredient.name}</td>
                    <td>
                      {i.ingredientAmount} {i.ingredientAmountType}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <section className="flex gap-2 flex-wrap justify-start">
              <h4>Tagy:</h4>
              {e.TagToRecipe.map((t) => {
                return (
                  <p
                    key={t.tag.id}
                    className="underline cursor-pointer hover:text-lime-50 transition-colors"
                  >
                    {t.tag.name}
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
