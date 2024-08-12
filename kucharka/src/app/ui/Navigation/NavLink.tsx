import Link from "next/link";

export type NavLinkProps = {
  href: string;
  name: string;
};

export default function NavLink({ href, name }: NavLinkProps) {
  return (
    <Link
      href={href}
      className="text-slate-200 px-4 py-1 border-2 rounded-md hover:bg-cyan-400 hover:text-stone-800 transition-colors"
    >
      {name}
    </Link>
  );
}
