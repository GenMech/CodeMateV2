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
import { LogIn, LogOutIcon, UserRoundX } from "lucide-react";
import Link from "next/link";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { deleteAccountAction } from "./actions";

function AccountDropdown() {
  const session = useSession();
  const [open, setOpen] = useState(false);
  // const isLoggedIn = !!session.data;

  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently remove your
              account and any data your have.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                await deleteAccountAction();
                signOut({ callbackUrl: "/" });
              }}
            >
              Yes, delete my account
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

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
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            <LogOutIcon className="mr-2" /> Sign Out
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              setOpen(true);
            }}
            className="cursor-pointer"
          >
            <UserRoundX className="mr-2" /> Delete Account
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export function Header() {
  const session = useSession();

  return (
    <header className="bg-gray-100 dark:bg-gray-900 py-3 px-5 z-10 relative">
      <div className="flex justify-between items-center">
        <Link href="/">CodeMate</Link>
        <div className="flex items-center gap-4">
          {!session.data ? (
            <Button
              variant={"ghost"}
              onClick={() => signIn("google")}
              className="flex gap-2"
            >
              <LogIn /> Sign In
            </Button>
          ) : (
            <div className="flex justify-center gap-2">
              <AccountDropdown />
              <Button variant={"outline"} asChild>
                <Link href="/browse">Browse</Link>
              </Button>
              <Button variant={"outline"} asChild>
                <Link href="/yourRooms">Your Rooms</Link>
              </Button>
            </div>
          )}
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
