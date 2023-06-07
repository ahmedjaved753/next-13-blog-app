import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

const NAVBAR_DATA = [
  { name: "Add Blog", path: "/add-blog" },
  {
    name: "My Blogs",
    path: "/blogs",
  },
];

export function Navbar() {
  return (
    <Menubar>
      {NAVBAR_DATA.map((navbarItem) => (
        <MenubarMenu key={navbarItem.path}>
          <MenubarTrigger className="text-lg">
            <Link href={navbarItem.path}>{navbarItem.name}</Link>
          </MenubarTrigger>
        </MenubarMenu>
      ))}
      <MenubarMenu>
        <LogoutButton />
      </MenubarMenu>
    </Menubar>
  );
}
