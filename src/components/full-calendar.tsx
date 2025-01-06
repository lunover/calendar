"use client";

import React from "react";
import CalendarHeader from "./calendar-header";
import CalendarWeeks from "./calendar-weeks";
import CalendarDates from "./calendar-dates";
import { getFullMonthDates } from "@/lib/nepali-date";

interface FullCalendarProps {
  bsYear?: number;
  bsMonth?: number;
  language: string;
}

function FullCalendar({
  bsYear,
  bsMonth,
  language,
}: FullCalendarProps) {
  const calendarData = getFullMonthDates(bsYear, bsMonth);

  return (
    <div className="p-4">
      <CalendarHeader
        bsYear={bsYear}
        bsMonth={bsMonth}
        language={language}
      />

      <div className="grid grid-cols-7 gap-px border border-border bg-border">
        <CalendarWeeks language={language} />

        {calendarData ? (
          <CalendarDates
            data={calendarData}
            language={language}
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
      </div>
    </div>
  );
}

export default FullCalendar;
