"use client";

import { useRouter } from "next/navigation";
import { Badge } from "./ui/badge";

export function TagsList({ tags }: { tags: string[] }) {
  const router = useRouter();
  return (
    <div className="flex gap-2 flex-wrap pb-1">
      {tags?.map((tag) => (
        <Badge
          onClick={() => {
            router.push(`/?search=${tag}`);
          }}
          className="w-fit cursor-pointer"
          key={tag}
        >
          {tag}
        </Badge>
      ))}
    </div>
  );
}
