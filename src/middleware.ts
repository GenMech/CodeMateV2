export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/yourRooms", "/browse", "/editRoom", "/createRoom", "/rooms"],
};
