import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function deleteUser(userId: string) {
  await db.delete(users).where(eq(users.id, userId));
}

// As we have set onDelete" cascasde so on deleting account it will delete rooms, sessions also
