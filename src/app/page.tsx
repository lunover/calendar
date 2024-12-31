import FullCalendar from "@/components/full-calendar";
import { getMonthEnglishName, getNepaliDate } from "@/lib/calendar";
import { Metadata } from "next";
import { cookies } from "next/headers";

export async function generateMetadata(): Promise<Metadata> {
  const data = getNepaliDate(new Date().toISOString().split('T')[0], 'ad-bs');
  const bsDate = data?.bs || '2081-01-01';
  const year = bsDate.split('-')[0];
  const month = parseInt(bsDate.split('-')[1], 10);
  const day = parseInt(bsDate.split('-')[2], 10).toString().padStart(2, '0');

  // title format: Nepali Calendar - 2080 Baishakh
  const monthName = month ? getMonthEnglishName(month) : "";

  return {
    title: `Nepali Calendar - Today is ${year} ${monthName} ${day}`,
  };
}

export default async function Home() {
  const data = getNepaliDate(new Date().toISOString().split('T')[0], 'ad-bs');
  const bsDate = data?.bs || '2081-01-01';
  const year = bsDate.split('-')[0];
  const month = parseInt(bsDate.split('-')[1], 10);

  const cookieStore = await cookies();
  const language = cookieStore.get('language')?.value || 'en';

  return <FullCalendar year={parseInt(year, 10)} initialMonthIndex={month} language={language} />;
}
