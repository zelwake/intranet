import NavLink, { NavLinkProps } from "./NavLink";

const navigation: NavLinkProps[] = [
  { href: "/", name: "Seznam receptů" },
  { href: "/novy", name: "Nový recept" },
];

export default function NavBar() {
  return (
    <div className="bg-blue-800 flex flex-row justify-start items-center gap-2 px-8 py-4  fixed w-screen top-0 shadow-lg shadow-gray-400">
      {navigation.map((n, i) => (
        <NavLink key={i} {...n} />
      ))}
      <div className="grow" />
      <a href="/" className="">
        <button className="text-blue-800 px-2 py-1 bg-slate-100 rounded-md">
          Zpět na intranet
        </button>
      </a>
    </div>
  );
}
