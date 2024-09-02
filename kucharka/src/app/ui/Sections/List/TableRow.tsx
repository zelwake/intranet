"use client";

import { ArrayElement } from "@/utils/types/generics";
import { AmountType, AmountTypeKeys } from "@/utils/types/recipeTypes";
import { useSearchParams } from "next/navigation";
import { TableProps } from "./Table";

export type TableRowProps = ArrayElement<TableProps["ingredientToRecipe"]>;

export default function TableRow({
  ingredient,
  ingredientAmount,
  ingredientAmountType,
}: TableRowProps) {
  const searchParams = useSearchParams();

  const isPresentInSearchParams = searchParams
    .getAll("ingredient")
    ?.includes(ingredient.name);
  return (
    <tr>
      <td
        className={isPresentInSearchParams ? "font-medium text-amber-500" : ""}
      >
        {ingredient.name}
      </td>
      <td className="text-right">{ingredientAmount}</td>
      <td className="text-left pl-1">
        {AmountType[ingredientAmountType as AmountTypeKeys]}
      </td>
    </tr>
  );
}
