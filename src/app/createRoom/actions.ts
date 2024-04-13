"use server";

import { db } from "@/db";
import { Room, room } from "@/db/schema";
import { getSession } from "@/lib/auth";

export async function createRoomAction(roomData: Omit<Room, "userId" | "id">) {
  // I have to omit id and userId because form schema does not contains it

  const session = await getSession();

  if (!session) {
    throw new Error("You must be logged in to create this room!");
  }

  await db.insert(room).values({ ...roomData, userId: session.user.id });
}
