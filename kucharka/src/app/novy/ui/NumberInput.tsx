import BaseInput, { BaseInputProps } from "@/app/ui/Input/BaseInput";

export type NumberInputProps = BaseInputProps & {
  name: string;
};

export default function NumberInput({ text, name, errors }: NumberInputProps) {
  return (
    <BaseInput text={text} errors={errors}>
      <input
        name={name}
        className="w-96 py-2 px-4 outline-none"
        type="number"
        required
      />
    </BaseInput>
  );
}
