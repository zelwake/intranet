import { TextInputProps } from "./TextInput";

export default function TextareaInput({ name, text }: TextInputProps) {
  return (
    <label>
      <p>{text}</p>
      <textarea
        rows={8}
        cols={37}
        name={name}
        required
        className="resize-y py-2 px-4 outline-none"
      />
    </label>
  );
}
