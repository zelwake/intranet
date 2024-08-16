import { useEffect, useReducer, useRef } from "react";

enum AmountType {
  "kg" = "kilogram",
  "g" = "gram",
  "l" = "litr",
  "ml" = "mililitr",
  "ks" = "kus",
}

type Ingredient = {
  name: string;
  amount: string;
  amountType: AmountType;
};

type ActionType =
  | { type: "ADD_INGREDIENT" }
  | { type: "REMOVE_INGREDIENT"; index: number }
  | { type: "UPDATE_INGREDIENT"; index: number; field: string; value: string };

const initialState: Ingredient[] = [
  { name: "", amount: "", amountType: AmountType.kg },
];

function ingredientReducer(
  state: Ingredient[],
  action: ActionType
): Ingredient[] {
  switch (action.type) {
    case "ADD_INGREDIENT":
      return [...state, { name: "", amount: "", amountType: AmountType.kg }];
    case "REMOVE_INGREDIENT":
      return state.filter((_, index) => index !== action.index);
    case "UPDATE_INGREDIENT":
      return state.map((ingredient, index) =>
        index === action.index
          ? { ...ingredient, [action.field]: action.value }
          : ingredient
      );

    default:
      return state;
  }
}

export default function IngredientList() {
  const [ingredients, dispatch] = useReducer(ingredientReducer, initialState);
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (hiddenInputRef.current) {
      hiddenInputRef.current.value = JSON.stringify(ingredients);
    }
  }, [ingredients]);

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

  // TODO dostat data na server
  // TODO možná z nich udělat json? ještě nevím jak to prohnat přes zod
  // TODO přidávat řádky jenom když jsou všechny zaplněný + možnost odebrat řádek

  return (
    <div className="grid grid-cols-4 gap-1">
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
              onChange={(e) =>
                handleIngredientChange(i, "amount", e.target.value)
              }
            />
          </label>
          <select
            className="w-28"
            value={ingredient.amountType}
            onChange={(e) =>
              handleIngredientChange(i, "amountType", e.target.value)
            }
          >
            {Array.from(Object.entries(AmountType)).map(([key, value]) => (
              <option value={key} key={key}>
                {value}
              </option>
            ))}
          </select>
          <label className="col-span-2">
            <input
              className="w-full"
              value={ingredient.name}
              onChange={(e) =>
                handleIngredientChange(i, "name", e.target.value)
              }
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

      <input type="hidden" name="ingredients" ref={hiddenInputRef} />
    </div>
  );
}
