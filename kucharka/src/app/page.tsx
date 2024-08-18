import { getRecipeData } from "@/utils/database/getRecipeData";
import Header from "./ui/Sections/Header";

export default async function Home() {
  const data = await getRecipeData();
  return (
    <>
      <Header text="Seznam receptů" />
      <section className="flex flex-col items-center">
        {data.map((e) => (
          <div key={e.id} className="p-5 text-lime-200 flex flex-col gap-2">
            <h3 className="text-lg font-bold uppercase">{e.title}</h3>
            <p>Popis:</p>
            <p>{e.content}</p>

            <p>Čas přípravy je {e.totalTimeInMinutes} minut</p>
            <table>
              <thead>
                <th>
                  <td>Ingredience:</td>
                </th>
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
            <p>Tagy: {e.TagToRecipe.map((t) => t.tag.name).join(", ")}</p>
          </div>
        ))}
      </section>
    </>
  );
}
