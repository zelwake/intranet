import { getCookingTime } from "@/utils/database/getCookingTime";
import { getIngredients } from "@/utils/database/getIngredients";
import { getTags } from "@/utils/database/getTags";
import FilterTabIngredient from "./FilterTabIngredient";
import FilterTabTag from "./FilterTabTag";
import FilterTabTime from "./FilterTabTime";

export default async function FilterTab() {
  const tagData = await getTags();
  const ingredientData = await getIngredients();
  const cookingTimeData = await getCookingTime();

  return (
    <section className="flex flex-nowrap gap-5 justify-between items-baseline px-5">
      <div>
        <h3 className="text-lime-400 underline underline-offset-2">
          Dostupné tagy:
        </h3>
        <div className="flex flex-wrap justify-center gap-2 mt-2">
          {tagData.map((t) => (
            <FilterTabTag key={t.id} {...t} />
          ))}
        </div>
      </div>

      <FilterTabTime {...cookingTimeData} />

      <div>
        <h3 className="text-amber-400 underline underline-offset-2">
          Dostupné ingredience:
        </h3>
        <div className="flex flex-wrap gap-2 justify-center mt-2">
          {ingredientData.map((i) => (
            <FilterTabIngredient key={i.id} {...i} />
          ))}
        </div>
      </div>
    </section>
  );
}
