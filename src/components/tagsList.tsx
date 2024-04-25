import { Badge } from "./ui/badge";

// To split tags that will be shown on UI
export function splitTags(tags: string) {
  return tags?.split(",").map((tag) => tag.trim());
}

export function TagsList({ tags }: { tags: string[] }) {
  return (
    <div className="flex gap-2 flex-wrap pb-1">
      {tags?.map((tag) => (
        <Badge className="w-fit" key={tag}>
          {tag}
        </Badge>
      ))}
    </div>
  );
}
