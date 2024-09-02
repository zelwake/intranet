import { getTags } from "@/utils/database/getTags";
import { AsyncReturnType } from "@/utils/types/AsyncReturnType";
import FilterTabTag from "./FilterTabTag";

export type FilterTabProps = { data: AsyncReturnType<typeof getTags> };

export default function FilterTab({ data }: FilterTabProps) {
  return (
    <section className="flex flex-nowrap gap-2 justify-start align-bottom px-5">
      <div>
        <h3 className="text-lime-400 underline underline-offset-2">
          Dostupné tagy:
        </h3>
        <div className="flex flex-wrap gap-2 mt-2">
          {data.map((t) => (
            <FilterTabTag key={t.id} {...t} />
          ))}
        </div>
      </div>
    </section>
  );
}
