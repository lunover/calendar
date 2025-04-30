import { getToday } from "@/lib/nepali-date";
import { redirect } from "next/navigation";

export default function DateLayout() {
  const today = getToday();

  redirect(`/date/${today.bs.year}/${today.bs.month.toString().padStart(2, "0")}`);
}
