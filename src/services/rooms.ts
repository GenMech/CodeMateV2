import { db } from "@/db";
import { room } from "@/db/schema";
import { eq } from "drizzle-orm";
import { unstable_noStore as noStore } from "next/cache";

export async function getRooms() {
  noStore(); // It can be used to declaratively opt out of static rendering and indicate a particular component should not be cached.
  const rooms = await db.query.room.findMany();
  return rooms;
}

export async function getRoom(roomId: string) {
  noStore();
  return await db.query.room.findFirst({
    where: eq(room.id, roomId),
  });
}
