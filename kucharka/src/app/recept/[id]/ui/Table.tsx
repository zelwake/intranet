"use client";

import { AmountType, AmountTypeKeys } from "@/utils/types/recipeTypes";
import { RecipeInfoProps } from "../RecipeInfo";

export default function Table({
  ingredientToRecipe,
}: Pick<RecipeInfoProps["recipeData"], "ingredientToRecipe">) {
  function checkIngredient(e: React.ChangeEvent<HTMLInputElement>) {
    const isChecked = e.target.checked;

    const parentColumn = e.target.parentElement;
    if (parentColumn) {
      const parentRow = parentColumn.parentElement;

      if (parentRow) {
        parentRow.style.backgroundColor = isChecked ? "#065f46" : "inherit";
        // #065f46 is tailwind bg-emerald-800
      }
    }
  }

  return (
    <table className="mt-10 max-w-2xl flex-grow gap-4">
      <thead>
        <tr>
          <th colSpan={4}>
            <h2 className="text-2xl">Ingredience</h2>
          </th>
        </tr>
      </thead>

      <tbody>
        {ingredientToRecipe.map((itr, i) => (
          <tr key={i} className="transition-colors duration-500">
            <td className="w-1/12 pl-5 py-1 flex flex-col">
              <input
                type="checkbox"
                onChange={checkIngredient}
                className="h-5 w-5"
                id={`checkbox_${i}`}
              />
              <label className="absolute" htmlFor={`checkbox_${i}`}></label>
            </td>
            <td className="text-right">{itr.ingredient.name}</td>
            <td className="text-right w-1/4">{itr.ingredientAmount}</td>
            <td className="w-1/4 pl-2">
              {AmountType[itr.ingredientAmountType as AmountTypeKeys]}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
