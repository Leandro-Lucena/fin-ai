"use client";

import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { MenuIcon } from "lucide-react";

const Navbar = () => {
  const pathname = usePathname();
  const generateLink = (name: string, path: string) => {
    return (
      <Link
        href={path}
        className={`font:bold ${pathname === path ? "text-primary" : "text-muted-foreground"} text-xl md:text-base`}
      >
        {name}
      </Link>
    );
  };
  return (
    <nav className="flex justify-between border-b border-solid px-4 py-4">
      <div className="flex items-center">
        <div className="me-4 md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <MenuIcon className="h-7 w-7" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="px-20">
                {generateLink("Dashboard", "/")}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="px-20">
                {generateLink("Transações", "/transactions")}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="px-20">
                {generateLink("Assinatura", "/subscription")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Image src="/logo.svg" width={173} height={39} alt="Finanace AI" />
        <div className="ms-8 hidden gap-10 md:flex">
          {generateLink("Dashboard", "/")}
          {generateLink("Transações", "/transactions")}
          {generateLink("Assinatura", "/subscription")}
        </div>
      </div>
      <UserButton />
    </nav>
  );
};

export default Navbar;
