import { getRecipeDataById } from "@/utils/database/getRecipeDataById";
import { DynamicRouteSlugProps } from "@/utils/types/dynamicRoute";
import Image from "next/image";

export default async function Recipe({ params }: DynamicRouteSlugProps) {
  const recipeData = await getRecipeDataById(params.id);

  if (!recipeData)
    return (
      <section className="text-white">
        <h1>Recept s tímto id neexistuje</h1>
      </section>
    );

  return (
    <section className="text-white">
      <h1>{recipeData.title}</h1>
      <Image
        src={
          recipeData.photo_url
            ? `/images/${recipeData.photo_url}`
            : "/images/stock.jpg"
        }
        alt={recipeData.title}
        width={1600}
        height={900}
        className="h-auto w-32"
      />
      <table>
        <thead>
          <tr>
            <th colSpan={3}>Ingredience</th>
          </tr>
        </thead>
        <tbody>
          {recipeData.ingredientToRecipe.map((itr, i) => (
            <tr key={i}>
              <td>{itr.ingredient.name}</td>
              <td>{itr.ingredientAmount}</td>
              <td>{itr.ingredientAmountType}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Postup</h2>
      <p>{recipeData.content}</p>
    </section>
  );
}
