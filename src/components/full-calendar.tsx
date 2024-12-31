"use client";

import React, { useState, useEffect } from "react";
import { CalendarData, Month } from "../types/calendar";
import FullCalendarSkeleton from "./full-calendar-skeleton";
import CalendarHeader from "./calendar-header";
import CalendarWeeks from "./calendar-weeks";
import CalendarDates from "./calendar-dates";

interface FullCalendarProps {
  year: number;
  initialMonthIndex: number;
  language: string;
}

async function fetchCalendarData(year: number): Promise<CalendarData | null> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/calendar/${year}`
  );

  if (!response.ok) {
    // throw new Error("Failed to fetch calendar data");
    return null;
  }

  return response.json();
}

function FullCalendar({
  year: initialYear,
  initialMonthIndex,
  language,
}: FullCalendarProps) {
  const selectedMonthIndex = initialMonthIndex;
  const [lastSelectedMonthIndex, setLastSelectedMonthIndex] =
    useState<number>(initialMonthIndex);
  const year = initialYear;
  const [calendarData, setCalendarData] = useState<CalendarData | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<Month | null>(null);

  const [dataFetched, setDataFetched] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCalendarData(year);

        if (data) {
          setCalendarData(data);
          setSelectedMonth(data[selectedMonthIndex - 1]);
        }

        if (selectedMonthIndex !== lastSelectedMonthIndex) {
          setLastSelectedMonthIndex(selectedMonthIndex);
        }

        setDataFetched(true);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching calendar data:", error);
      }
    };

    if (!dataFetched || lastSelectedMonthIndex !== selectedMonthIndex) {
      fetchData();
    }
  }, [year, selectedMonthIndex, lastSelectedMonthIndex]);

  return (
    <div className="p-4">
      <CalendarHeader
        initialYear={initialYear}
        calendarData={calendarData}
        language={language}
        selectedMonthIndex={selectedMonthIndex}
        selectedMonth={selectedMonth}
      />

      <div className="grid grid-cols-7 gap-px border border-border bg-border">
        <CalendarWeeks language={language}   />

        {isLoading ? (
          <FullCalendarSkeleton />
        ) : selectedMonth ? (
          <CalendarDates
            selectedMonth={selectedMonth}
            calendarData={calendarData}
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
