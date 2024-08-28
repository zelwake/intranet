import BaseInput, { BaseInputProps } from "@/app/ui/Input/BaseInput";
import { useState } from "react";

type FileInputProps = BaseInputProps & {
  name: string;
};

export default function FileInput({ text, errors, name }: FileInputProps) {
  const [filename, setFilename] = useState("");

  function changeFilename(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e);

    const files = e.target.files;
    if (files && files.item(0)) {
      setFilename(files.item(0)!.name);
    }
  }

  return (
    <BaseInput text={text} errors={errors}>
      <>
        <input
          type="file"
          name={name}
          accept="images/*"
          onChange={changeFilename}
        />
        <input
          type="text"
          name={`${name}Name`}
          value={filename}
          readOnly
          hidden
        />
      </>
    </BaseInput>
  );
}
