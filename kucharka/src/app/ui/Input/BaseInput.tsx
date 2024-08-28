export type BaseInputProps = {
  text: string;
  errors?: string[];
};

type ExtendedBaseInputProps = BaseInputProps & {
  children: React.ReactNode[];
};

export default function BaseInput({
  text,
  errors,
  children,
}: ExtendedBaseInputProps) {
  return (
    <label className="flex flex-col items-start justify-start relative">
      <p>{text}</p>
      {children}
      <p className="absolute text-red-600 -bottom-6">{errors?.join(", ")}</p>
    </label>
  );
}
