import { Tag } from "@prisma/client";
import { useRef, useState } from "react";

export type SelectTagsProps = { tags: Tag[] };

export default function SelectTags({ tags }: SelectTagsProps) {
  const [tagList, setTagList] = useState(tags);
  const newTagRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <label className="flex flex-col">
        <p>Skupiny</p>

        <select multiple size={6} name="tags" className="w-96 outline-none">
          {tagList.map((t) => (
            <option value={t.name} key={t.id}>
              {t.name}
            </option>
          ))}
        </select>
      </label>
      <label className="flex mt-2">
        <p>Přidat novou</p>
        <input className="grow mx-2" ref={newTagRef} />
        <button
          onClick={(e) => {
            e.preventDefault();
            const value = newTagRef.current?.value.trim();
            if (value !== undefined && value !== "") {
              setTagList((prev) => [
                ...prev,
                { id: 0 - tagList.length, name: value.toLowerCase() },
              ]);
              newTagRef.current!.value = "";
            }
          }}
        >
          Přidat
        </button>
      </label>
    </div>
  );
}
