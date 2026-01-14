import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// date
export const todayISO = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"
