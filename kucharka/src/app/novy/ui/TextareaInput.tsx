import { TextInputProps } from "./TextInput";

export default function TextareaInput({ name, text, errors }: TextInputProps) {
  return (
    <label className="relative">
      <p>{text}</p>
      <textarea
        rows={8}
        cols={37}
        name={name}
        required
        className="resize-y py-2 px-4 outline-none"
      />
      <p className="absolute -bottom-5 text-red-600">{errors?.join(", ")}</p>
    </label>
  );
}
