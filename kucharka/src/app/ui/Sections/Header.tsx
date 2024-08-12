export type HeaderProps = {
  text: string;
};

export default function Header({ text }: HeaderProps) {
  return (
    <>
      <header>
        <h1 className="font-bold text-gray-200 text-3xl text-center">{text}</h1>
      </header>
    </>
  );
}
