import { RecipeCardProps } from "./RecipeCard";
import TableRow from "./TableRow";

export type TableProps = Pick<RecipeCardProps, "ingredientToRecipe">;

export default function Table({ ingredientToRecipe }: TableProps) {
  return (
    <table>
      <thead>
        <tr>
          <th
            colSpan={3}
            className="text-left font-light underline underline-offset-2 text-lime-400"
          >
            Ingredience:
          </th>
        </tr>
      </thead>
      <tbody>
        {ingredientToRecipe.map((itr) => (
          <TableRow key={itr.ingredient.id} {...itr} />
        ))}
      </tbody>
    </table>
  );
}
