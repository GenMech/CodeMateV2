import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// To split tags that will be shown on UI
export function splitTags(tags: string) {
  return tags?.split(",").map((tag) => tag.trim());
}
