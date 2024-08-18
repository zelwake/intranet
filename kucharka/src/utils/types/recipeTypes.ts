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
