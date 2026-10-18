import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** The shadcn/ui class merge helper: conditional classes, then conflict-free. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
