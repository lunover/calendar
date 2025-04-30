"use client";

import CalendarDates from "./calendar-dates";
import { getFullMonthDates } from "@/lib/nepali-date";
import type { HolidayType } from "@/lib/holidays";
interface FullCalendarProps {
  bsYear?: number;
  bsMonth?: number;
  language: string;
  holidays: HolidayType[];
}

function FullCalendar({
  bsYear,
  bsMonth,
  language,
  holidays,
}: FullCalendarProps) {
  const calendarData = getFullMonthDates(bsYear, bsMonth);

  return (
    <>
      {calendarData ? (
        <CalendarDates
          data={calendarData}
          language={language}
          holidays={holidays}
        />
      ) : (
        <div className="col-span-7 text-center py-10">
          <p className="text-muted-foreground">
            {language === "en"
              ? "No data available for this month."
              : "यो महिनाको लागि कुनै डाटा उपलब्ध छैन।"}
          </p>
        </div>
      )}
    </>
  );
}

export default FullCalendar;
