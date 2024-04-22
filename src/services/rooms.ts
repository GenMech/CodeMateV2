import { db } from "@/db";
import { unstable_noStore as noStore } from "next/cache";

export async function getRooms() {
  noStore(); // It can be used to declaratively opt out of static rendering and indicate a particular component should not be cached.
  const rooms = await db.query.room.findMany();
  return rooms;
}
