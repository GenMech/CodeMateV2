"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Room } from "@/db/schema";
import { GithubIcon, TrashIcon } from "lucide-react";
import { TagsList } from "@/components/tagsList";
import { splitTags } from "@/lib/utils";
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
import { deleteRoomAction } from "@/app/yourRooms/actions";

export function RoomCard({ room, isUser }: { room: Room; isUser: boolean }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between">
          <div className="flex items-center">{room.name}</div>
          {isUser && (
            <div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    className="w-[52px] h-[34px]"
                    variant="ghost"
                    onClick={() => {}}
                  >
                    <TrashIcon color="#9A2A2A" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently remove
                      your room and any data associated with it.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => deleteRoomAction(room.id)}
                    >
                      Yes, Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
        </CardTitle>

        <CardDescription className="h-14 line-clamp-3">
          {room.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <TagsList tags={splitTags(room.tags)} />
        {room.githubRepo && (
          <Link
            href={room.githubRepo}
            className="flex items-center gap-2"
            target="_blank"
            rel="noopener noreferrer" // It makes sure that when you click a link, the new page cannot control the original page.
          >
            <GithubIcon />
            Github Project
          </Link>
        )}
      </CardContent>
      <CardFooter>
        <Button asChild>
          <Link href={`/rooms/${room.id}`}>Join Room</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
