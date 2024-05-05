import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getRooms } from "@/services/rooms";
import { SearchBar } from "./searchBar";
import { RoomCard } from "@/components/roomCard";
import { unstable_noStore as noStore } from "next/cache";

export default async function Home({
  searchParams,
}: {
  searchParams: { search: string };
}) {
  noStore(); // It can be used to declaratively opt out of static rendering and indicate a particular component should not be cached.
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
          return <RoomCard key={room.id} room={room} isUser={false} />;
        })}
      </div>
    </main>
  );
}
