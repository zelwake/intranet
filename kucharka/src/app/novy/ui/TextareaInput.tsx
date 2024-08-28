import BaseInput from "@/app/ui/Input/BaseInput";
import { TextInputProps } from "./TextInput";

export default function TextareaInput({ name, text, errors }: TextInputProps) {
  return (
    <BaseInput text={text} errors={errors}>
      <textarea
        rows={8}
        cols={37}
        name={name}
        required
        className="resize-y py-2 px-4 outline-none"
      />
    </BaseInput>
  );
}
