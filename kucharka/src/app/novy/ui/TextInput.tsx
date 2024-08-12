export type TextInputProps = {
  text: string;
  name: string;
};

export default function TextInput({ text, name }: TextInputProps) {
  return (
    <label className="flex items-center justify-start gap-3">
      <p className="text-2xl">{text}</p>

      <input
        name={name}
        className="min-w-72 py-2 px-4 outline-none rounded-e-md"
      />
    </label>
  );
}
