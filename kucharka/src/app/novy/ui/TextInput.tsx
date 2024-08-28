import BaseInput, { BaseInputProps } from "@/app/ui/Input/BaseInput";

export type TextInputProps = BaseInputProps & {
  name: string;
};

export default function TextInput({ text, name, errors }: TextInputProps) {
  return (
    <BaseInput text={text} errors={errors}>
      <input name={name} className="w-96 py-2 px-4 outline-none" required />
    </BaseInput>
  );
}
