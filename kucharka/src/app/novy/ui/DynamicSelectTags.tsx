"use client";

import { Tag } from "@prisma/client";
import { useRef, useState } from "react";

type DynamicSelectTagsProps = { tags: Tag[] };

export default function DynamicSelectTags({ tags }: DynamicSelectTagsProps) {
  const [dynamicList, setDynamicList] = useState(tags);
  const newTagRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <select multiple size={6} name="tags" className="w-96 outline-none">
        {dynamicList.map((t) => (
          <option value={t.id} key={t.id}>
            {t.name}
          </option>
        ))}
      </select>
      <label className="flex mt-2">
        <p>Přidat novou</p>
        <input className="grow mx-2" ref={newTagRef} />
        <button
          onClick={(e) => {
            e.preventDefault();
            const value = newTagRef.current?.value.trim();
            if (value !== undefined && value !== "") {
              setDynamicList((prev) => [
                ...prev,
                { id: 0 - dynamicList.length, name: value },
              ]);
              newTagRef.current!.value = "";
            }
          }}
        >
          Přidat
        </button>
      </label>
    </>
  );
}
