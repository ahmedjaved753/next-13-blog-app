"use client";

import { signOut } from "next-auth/react";
import { MenubarTrigger } from "./ui/menubar";

function LogoutButton() {
  return (
    <MenubarTrigger onClick={() => signOut()} className="text-lg">
      Logout
    </MenubarTrigger>
  );
}

export default LogoutButton;
