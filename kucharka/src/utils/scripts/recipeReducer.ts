import { Ingredient } from "../types/recipeTypes";

type ActionType =
  | { type: "ADD_INGREDIENT" }
  | { type: "REMOVE_INGREDIENT"; index: number }
  | { type: "UPDATE_INGREDIENT"; index: number; field: string; value: string };

export function ingredientReducer(
  state: Ingredient[],
  action: ActionType
): Ingredient[] {
  switch (action.type) {
    case "ADD_INGREDIENT":
      return [...state, { name: "", amount: "", amountType: "kg" }];
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
