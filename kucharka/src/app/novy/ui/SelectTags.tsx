import { Tag } from "@prisma/client";
import { useRef, useState } from "react";

export type SelectTagsProps = { tags: Tag[] };

export default function SelectTags({ tags }: SelectTagsProps) {
  const [tagList, setTagList] = useState<Tag[]>(tags);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const newTagRef = useRef<HTMLInputElement>(null);

  const handleAddTag = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const value = newTagRef.current?.value.trim();
    if (value !== undefined && value !== "") {
      const newTag = { id: 0 - tagList.length, name: value.toLowerCase() };
      setTagList((prev) => [...prev, newTag]);

      setSelectedTags((prev) => [...prev, newTag.name]);

      newTagRef.current!.value = "";
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(
      (option) => option.value
    );
    setSelectedTags(selectedOptions);
  };

  return (
    <div>
      <label className="flex flex-col">
        <p>Skupiny</p>

        <select
          multiple
          size={6}
          name="tags"
          className="w-96 outline-none"
          value={selectedTags}
          onChange={handleSelectChange}
        >
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
        <button onClick={handleAddTag}>Přidat</button>
      </label>
    </div>
  );
}
