export const serializeIngredients = (
  ingredientsAmount: number,
  data: FormData
) => {
  const serialized = [];

  for (let i = 0; i < ingredientsAmount; i++) {
    const name = data.get(`ingredientName_${i}`) as string;
    const amount = parseFloat(data.get(`ingredientAmount_${i}`) as string);
    const amountType = data.get(`ingredientAmountType_${i}`) as string;

    serialized.push({ name, amount, amountType });
  }
  return serialized;
};
