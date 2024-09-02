import { PickFromArray } from "@/utils/types/generics";
import { ListProps } from "../List";

export type TableProps = PickFromArray<ListProps["data"], "ingredientToRecipe">;

export default function Table({ ingredientToRecipe }: TableProps) {
  return (
    <table>
      <thead>
        <tr>
          <th
            colSpan={2}
            className="text-left font-light underline underline-offset-2 text-lime-400"
          >
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
  );
}
