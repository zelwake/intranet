export type TextInputProps = {
  text: string;
  name: string;
};

export default function TextInput({ text, name }: TextInputProps) {
  return (
    <label className="flex flex-col items-start justify-start">
      <p>{text}</p>

      <input name={name} className="w-96 py-2 px-4 outline-none" required />
    </label>
  );
}
