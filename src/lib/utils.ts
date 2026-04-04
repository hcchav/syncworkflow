import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function gradeColor(grade: string) {
  if (grade === "A" || grade === "B") return "text-score-green";
  if (grade === "C") return "text-score-amber";
  return "text-score-red";
}

export function gradeBg(grade: string) {
  if (grade === "A" || grade === "B") return "bg-score-green";
  if (grade === "C") return "bg-score-amber";
  return "bg-score-red";
}
