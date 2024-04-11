import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/db";
import GoogleProvider from "next-auth/providers/google";
import type { Adapter } from "next-auth/adapters";

const handler = NextAuth({
  adapter: DrizzleAdapter(db) as Adapter, // This is telling next auth how to connect to database
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
});

export { handler as GET, handler as POST };
