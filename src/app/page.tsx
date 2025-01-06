import FullCalendar from "@/components/full-calendar";
import { getToday } from "@/lib/nepali-date";
import { __month } from "@/lib/translate";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const today = getToday();
  const year = today.bs.year;
  const month = today.bs.month;
  const day = today.bs.day.toString().padStart(2, "0");

  // title format: Nepali Calendar - 2080 Baishakh
  const monthName = __month(month.toString(), "en");

  return {
    title: `Nepali Date - Today is ${year} ${monthName} ${day}`,
    description: `Today is ${year} ${monthName} ${day} in Nepali calendar.`,
  };
}

export default async function Home() {
  const cookieStore = await cookies();
  const language = cookieStore.get("language")?.value || "en";

  return <FullCalendar language={language} />;
}
