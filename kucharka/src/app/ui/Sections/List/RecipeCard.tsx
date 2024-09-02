import { InferFromArray } from "@/utils/types/generics";
import { ListProps } from "../List";
import HeaderLink from "./HeaderLink";

export type RecipeCardProps = InferFromArray<ListProps["data"]>;

export default function RecipeCard({
  TagToRecipe,
  ingredientToRecipe,
  // totalTimeInMinutes,
  ...props
}: RecipeCardProps) {
  return (
    <li className="p-5 text-lime-200 flex flex-col gap-2">
      <HeaderLink {...props} />

      <table>
        <thead>
          <tr>
            <th colSpan={2} className="text-left">
              Ingredience:
            </th>
          </tr>
        </thead>
        <tbody>
          {ingredientToRecipe.map((itr) => (
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
        {TagToRecipe.map((ttr) => {
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
  );
}
