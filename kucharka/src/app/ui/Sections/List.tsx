import { getRecipeData } from "@/utils/database/getRecipeData";
import { AsyncReturnType } from "@/utils/types/AsyncReturnType";
import HeaderLink from "./HeaderLink";

export type ListProps = { data: AsyncReturnType<typeof getRecipeData> };

export default function List({ data }: ListProps) {
  return (
    <ul className="grid grid-cols-2 items-start p-10">
      {data.map((recipe) => (
        <li key={recipe.id} className="p-5 text-lime-200 flex flex-col gap-2">
          <HeaderLink
            id={recipe.id}
            photo_url={recipe.photo_url}
            title={recipe.title}
          />

          <p>Čas přípravy je {recipe.totalTimeInMinutes} minut</p>
          <table>
            <thead>
              <tr>
                <th colSpan={2} className="text-left">
                  Ingredience:
                </th>
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
        </li>
      ))}
    </ul>
  );
}
