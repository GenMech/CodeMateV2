import { getRoom } from "@/services/rooms";
import Link from "next/link";
import { GithubIcon } from "lucide-react";
import { TagsList } from "@/components/tagsList";
import { CodemateVideoPlayer } from "./videoPlayer";
import { splitTags } from "@/lib/utils";

export default async function RoomPage(props: { params: { roomId: string } }) {
  const roomId = props.params.roomId;
  const room = await getRoom(roomId);

  if (!room) {
    return <div>No room of this ID found</div>;
  }

  return (
    <div className="grid grid-cols-4 min-h-screen">
      <div className="col-span-3 p-4 pr-2">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 min-h-screen">
          <CodemateVideoPlayer room={room} />
        </div>
      </div>
      <div className="col-span-1 p-4 pl-2">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 flex flex-col gap-3">
          <div>
            <h1 className="text-base">{room?.name}</h1>
            <p className="text-sm text-gray-800 dark:text-gray-400 pl-[1px]">
              Language: {room?.language}
            </p>
          </div>
          <p className="text-base text-gray-600 dark:text-gray-400">
            {room?.description}
          </p>

          {room.githubRepo && (
            <Link
              href={room.githubRepo}
              className="flex items-center gap-2 text-center text-sm mt-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubIcon />
              Github Project
            </Link>
          )}

          <TagsList tags={splitTags(room.tags)} />
        </div>
      </div>
    </div>
  );
}
