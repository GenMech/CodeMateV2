"use client";

import { ModeToggle } from "@/components/modeToggle";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOutIcon } from "lucide-react";
import Link from "next/link";

function AccountDropdown() {
  const session = useSession();
  // const isLoggedIn = !!session.data;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"link"}>
          <Avatar className="mr-2">
            <AvatarImage src={session.data?.user?.image ?? ""} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {session.data?.user?.name && `Welcome, ${session.data?.user?.name}`}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="cursor-pointer" onClick={() => signOut()}>
          <LogOutIcon className="mr-2" /> Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function Header() {
  const session = useSession();

  return (
    <header className="bg-gray-100 dark:bg-gray-900 py-3 px-5">
      <div className="flex justify-between items-center">
        <Link href="/">CodeMate</Link>
        <div className="flex items-center gap-4">
          {!session.data ? (
            <Button variant={"outline"} onClick={() => signIn("google")}>
              Sign In
            </Button>
          ) : (
            <AccountDropdown />
          )}
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
