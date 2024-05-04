"use server";

import { getSession } from "@/lib/auth";
import { deleteRoom, getRoom } from "@/services/rooms";
import { revalidatePath } from "next/cache";

// Steps that should be in this action
// - Auhentication (to check whether user is authenticated or not)
// - Authorization (to check if the room user going to delete actually belongs to him)
// - After above steps call delete room
export async function deleteRoomAction(roomId: string) {
  const session = await getSession();
  if (!session) {
    throw new Error("User not Authenticated");
  }

  const room = await getRoom(roomId);

  if (room?.userId !== session.user.id) {
    throw new Error("User not Authorized!");
  }

  await deleteRoom(roomId);
  revalidatePath("/yourRooms"); //To purge cache data, it will refetch the data on route
}
