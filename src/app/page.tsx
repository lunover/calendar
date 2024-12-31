import FullCalendar from "@/components/full-calendar";
import { getNepaliDate } from "@/lib/calendar";
import { cookies } from "next/headers";

export default async function Home() {
  const data = getNepaliDate(new Date().toISOString().split('T')[0], 'ad-bs');
  const bsDate = data?.bs || '2081-01-01';
  const year = bsDate.split('-')[0];
  const month = parseInt(bsDate.split('-')[1], 10);

  const cookieStore = await cookies();
  const language = cookieStore.get('language')?.value || 'en';

  return <FullCalendar year={parseInt(year, 10)} initialMonthIndex={month} language={language} />;
}
