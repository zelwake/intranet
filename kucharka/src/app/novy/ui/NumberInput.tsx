export type TextInputProps = {
  text: string;
  name: string;
  errors?: string[];
};

export default function NumberInput({ text, name, errors }: TextInputProps) {
  return (
    <label className="flex flex-col items-start justify-start relative">
      <p>{text}</p>

      <input
        name={name}
        className="w-96 py-2 px-4 outline-none"
        type="number"
        required
      />
      <p className="absolute text-red-600 -bottom-6">{errors?.join(", ")}</p>
    </label>
  );
}
