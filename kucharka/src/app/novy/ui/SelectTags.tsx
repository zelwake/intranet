import { getTags } from "@/utils/database/getTags";
import DynamicSelectTags from "./DynamicSelectTags";

export default async function SelectTags() {
  const tags = await getTags();

  return (
    <label className="flex flex-col">
      <p>Skupiny</p>
      {/* <select multiple size={6} name="tags" className="w-96 outline-none">
        {tags.map((t) => (
          <option value={t.id} key={t.id}>
            {t.name}
          </option>
        ))}
      </select>
      <label className="flex justify-between mt-2">
        Přidat novou
        <input className="grow ml-2" />
      </label> */}
      <DynamicSelectTags tags={tags} />
    </label>
  );
}
