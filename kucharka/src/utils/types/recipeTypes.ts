import { z } from "zod";

export enum AmountType {
  kg = "kilogram",
  g = "gram",
  l = "litr",
  ml = "mililitr",
  ks = "kus",
}

export type Ingredient = {
  name: string;
  amount: string;
  amountType: keyof typeof AmountType;
};

const keys = Object.keys(AmountType) as Array<keyof typeof AmountType>;
const enumValues = keys as [keyof typeof AmountType];

export const ingredientSchema = z.object({
  name: z.string().min(1),
  amountType: z.enum(enumValues, {
    errorMap: (issue, _ctx) => {
      switch (issue.code) {
        case "invalid_enum_value":
          return {
            message: `Špatná hodnota jednotky. Očekává se: ${keys.join(
              ", "
            )}. Předáno "${issue.received}"`,
          };
        default:
          return { message: "Špatný typ hodnoty" };
      }
    },
  }),
  amount: z.coerce.number(),
});

export const recipeSchema = z.object({
  title: z
    .string({ invalid_type_error: "Neplatný název" })
    .min(5, "Název musí být delší jak 5 znaků"),
  content: z
    .string({ invalid_type_error: "Neplatný text popisu" })
    .min(20, "Popis musí obsahovat nejméně 20 znaků"),
  tags: z.string({ invalid_type_error: "Neplatný typ tagu" }).array(),
  totalTimeInMinutes: z.coerce
    .number({
      invalid_type_error: "Musí být číslo",
      required_error: "Musí být vyplněno",
    })
    .gt(0, "Čas musí být pozitivní číslo"),
  ingredientsAmount: z.coerce.number().gt(0),
  ingredients: z
    .array(ingredientSchema)
    .min(1, "Musí být minimálně 1 ingredience"),
});

export type RecipeSchemaKeys = keyof z.infer<typeof recipeSchema>;

type RecipeErrors = Partial<Record<RecipeSchemaKeys, string[]>>;

export type RecipeFormState = null | {
  errors: RecipeErrors;
};
