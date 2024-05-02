import { Button } from "@/components/ui/button";
import { db } from "@/db";
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
import { GithubIcon } from "lucide-react";
import { getRooms } from "@/services/rooms";
import { TagsList } from "@/components/tagsList";
import { SearchBar } from "./searchBar";
import { splitTags } from "@/lib/utils";

function RoomCard({ room }: { room: Room }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{room.name}</CardTitle>
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

export default async function Home({
  searchParams,
}: {
  searchParams: { search: string };
}) {
  const rooms = await getRooms(searchParams.search);

  return (
    <main className="min-h-screen p-14 ">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl">Find Coding Rooms</h1>
        <Button asChild>
          {/* // asChild means, Create this as DOM node but apply all the styles of the button would be on this (Link component) */}
          <Link href="/createRoom">Create Room</Link>
        </Button>
      </div>
      <div className="mb-8">
        <SearchBar />
      </div>
      <div className="grid lg:grid-cols-4 gap-4 md:grid-cols-2 sm:grid-cols-1">
        {rooms.map((room) => {
          return <RoomCard key={room.id} room={room} />;
        })}
      </div>
    </main>
  );
}
