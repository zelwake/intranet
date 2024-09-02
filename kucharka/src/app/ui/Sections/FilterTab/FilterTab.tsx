import { getIngredients } from "@/utils/database/getIngredients";
import { getTags } from "@/utils/database/getTags";
import { AsyncReturnType } from "@/utils/types/AsyncReturnType";
import FilterTabIngredient from "./FilterTabIngredient";
import FilterTabTag from "./FilterTabTag";

export type FilterTabProps = {
  tagData: AsyncReturnType<typeof getTags>;
  ingredientData: AsyncReturnType<typeof getIngredients>;
};

export default function FilterTab({ tagData, ingredientData }: FilterTabProps) {
  return (
    <section className="flex flex-nowrap gap-2 justify-between align-bottom px-5">
      <div>
        <h3 className="text-lime-400 underline underline-offset-2">
          Dostupné tagy:
        </h3>
        <div className="flex flex-wrap gap-2 mt-2">
          {tagData.map((t) => (
            <FilterTabTag key={t.id} {...t} />
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-amber-400 underline underline-offset-2">
          Dostupné ingredience:
        </h3>
        <div className="flex flex-wrap gap-2 mt-2">
          {ingredientData.map((i) => (
            <FilterTabIngredient key={i.id} {...i} />
          ))}
        </div>
      </div>
    </section>
  );
}
