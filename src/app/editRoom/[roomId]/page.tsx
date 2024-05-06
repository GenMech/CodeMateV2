import { getRoom } from "@/services/rooms";
import { EditRoomForm } from "./editRoomForm";
import { unstable_noStore as noStore } from "next/cache";

export default async function EditRoom({
  params,
}: {
  params: { roomId: string };
}) {
  noStore(); // It can be used to declaratively opt out of static rendering and indicate a particular component should not be cached.
  const room = await getRoom(params.roomId);

  if (!room) {
    return <div>Room not Found</div>;
  }

  return (
    <div className="container flex flex-col gap-7 pt-12 pb-12">
      <h1 className="text-4xl font-bold">Edit Room</h1>
      <EditRoomForm room={room} />
    </div>
  );
}
