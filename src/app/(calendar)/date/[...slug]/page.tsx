import FullCalendar from "@/components/full-calendar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { __month } from "@/lib/translate";
import { getHolidays } from "@/lib/holidays";
import { getToday } from "@/lib/nepali-date";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const slug = (await params).slug;

  const year = slug[0];
  const month = slug[1] ? Number.parseInt(slug[1], 10) : null;

  // title format: Nepali Calendar - 2080 Baishakh
  const monthName = month ? __month(month.toString(), "en") : "";

  return {
    title: `Nepali Calendar - ${year} ${monthName}`,
  };
}

// Return a list of `params` to populate the [slug] dynamic segment
export function generateStaticParams() {
  const today = getToday();
  const year = today.bs.year;
  const years = Array.from({ length: 2 }, (_, i) => year + i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  const items = years.flatMap((year) =>
    months.map((month) => ({ year, month }))
  );

  const params = items.map((item) => ({
    slug: [item.year.toString(), item.month.toString().padStart(2, "0")],
  }));

  return params;
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const year = Number.parseInt(slug[0], 10);
  const month = slug[1] ? Number.parseInt(slug[1], 10) : null;

  if (!month) {
    return redirect(`/date/${year}/01`);
  }

  const cookieStore = await cookies();
  const language = cookieStore.get("language")?.value || "en";
  const holidays = await getHolidays(year);

  return (
    <FullCalendar
      bsYear={year}
      bsMonth={month}
      language={language}
      holidays={holidays}
    />
  );
}
