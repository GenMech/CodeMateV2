"use server";

import { Room } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { createRoom } from "@/services/rooms";
import { revalidatePath } from "next/cache";

export async function createRoomAction(roomData: Omit<Room, "userId" | "id">) {
  // I have to omit id and userId because form schema does not contains it

  const session = await getSession();

  if (!session) {
    throw new Error("You must be logged in to create this room!");
  }

  await createRoom(roomData, session.user.id);

  revalidatePath("/"); // To purge cache data, it will refetch the data on route
}
