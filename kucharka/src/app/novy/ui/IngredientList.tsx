"use client";

import { ingredientReducer } from "@/utils/scripts/recipeReducer";
import { AmountType, Ingredient } from "@/utils/types/recipeTypes";
import { useReducer } from "react";

type IngredientListProps = {
  errors?: string[];
};

const initialState: Ingredient[] = [{ name: "", amount: "", amountType: "kg" }];

export default function IngredientList({ errors }: IngredientListProps) {
  const [ingredients, dispatch] = useReducer(ingredientReducer, initialState);

  const handleIngredientChange = (
    index: number,
    field: keyof Ingredient,
    value: string
  ) => {
    dispatch({ type: "UPDATE_INGREDIENT", index, field, value });
  };

  const handleAddIngredient = () => {
    dispatch({ type: "ADD_INGREDIENT" });
  };

  const handleRemoveIngredient = (index: number) => {
    dispatch({ type: "REMOVE_INGREDIENT", index });
  };

  // TODO přidávat řádky jenom když jsou všechny zaplněný + možnost odebrat řádek

  return (
    <div className="grid grid-cols-4 gap-1 relative">
      <div className="grid grid-cols-subgrid col-span-4">
        <p>Množství</p>
        <p>Jednotka</p>
        <p className="col-span-2">Surovina</p>
      </div>

      {ingredients.map((ingredient, i) => (
        <div key={i} className="grid grid-cols-subgrid col-span-4 relative">
          <label>
            <input
              className="w-28"
              type="number"
              step="0.1"
              value={ingredient.amount}
              name={`ingredientAmount_${i}`}
              onChange={(e) =>
                handleIngredientChange(i, "amount", e.target.value)
              }
              required
            />
          </label>
          <select
            className="w-28"
            value={ingredient.amountType}
            onChange={(e) =>
              handleIngredientChange(i, "amountType", e.target.value)
            }
            required
            name={`ingredientAmountType_${i}`}
          >
            {Array.from(Object.entries(AmountType)).map(([key, value]) => (
              <option value={key} key={key}>
                {value}
              </option>
            ))}
          </select>
          <label className="col-span-2">
            <input
              required
              className="w-full"
              value={ingredient.name}
              onChange={(e) =>
                handleIngredientChange(i, "name", e.target.value)
              }
              name={`ingredientName_${i}`}
            />
          </label>
          <button
            className="bg-red-600 text-sky-50 absolute px-2 -right-20"
            onClick={(e) => {
              e.preventDefault();
              handleRemoveIngredient(i);
            }}
            type="button"
          >
            Odebrat
          </button>
        </div>
      ))}

      <button
        className="col-span-4 bg-green-600 text-stone-100 font-bold text-xl text-center rounded-md hover:text-green-600 hover:bg-green-200 transition-colors"
        type="button"
        onClick={(e) => {
          e.preventDefault;
          handleAddIngredient();
        }}
      >
        +
      </button>

      <input
        type="hidden"
        name="ingredientsAmount"
        value={ingredients.length}
      />

      {errors && (
        <p className="absolute -bottom-6 text-red-600 text-sm place-self-center">
          {errors.join(", ")}
        </p>
      )}
    </div>
  );
}
