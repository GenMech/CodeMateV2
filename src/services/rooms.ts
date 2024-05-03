import { db } from "@/db";
import { room } from "@/db/schema";
import { eq } from "drizzle-orm";
import { unstable_noStore as noStore } from "next/cache";
import { like } from "drizzle-orm";
import { getSession } from "@/lib/auth";

export async function getRooms(search: string | undefined) {
  noStore(); // It can be used to declaratively opt out of static rendering and indicate a particular component should not be cached.
  const where = search ? like(room.tags, `%${search}%`) : undefined;
  const rooms = await db.query.room.findMany({
    where,
  });
  return rooms;
}

export async function getUserRooms() {
  noStore(); // It can be used to declaratively opt out of static rendering and indicate a particular component should not be cached.
  const session = await getSession();

  if (!session) {
    throw new Error("User not Authenticated");
  }

  const rooms = await db.query.room.findMany({
    where: eq(room.userId, session.user.id),
  });

  return rooms;
}

export async function getRoom(roomId: string) {
  noStore();
  return await db.query.room.findFirst({
    where: eq(room.id, roomId),
  });
}
