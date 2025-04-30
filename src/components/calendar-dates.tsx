import { cn } from "@/lib/utils";
import type { CalendarDateType } from "@/lib/nepali-date";
import { __numbers } from "@/lib/translate";
import { MONTH_NAME_EN } from "@/lib/constants/nepali-texts";
import type { HolidayType } from "@/lib/holidays";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

type CalendarDatesProps = {
  data: CalendarDateType[][] | null;
  language: string;
  holidays: HolidayType[];
};

export default function CalendarDates({
  data,
  language,
  holidays,
}: CalendarDatesProps) {
  const [selectedDate, setSelectedDate] = useState<CalendarDateType | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const isPublicHoliday = (date: CalendarDateType) => {
    return holidays.find(
      (holiday) =>
        holiday.date ===
        `${date.bs.year}-${date.bs.month
          .toString()
          .padStart(2, "0")}-${date.bs.day.toString().padStart(2, "0")}`
    );
  };

  const getPublicHolidayName = (date: CalendarDateType) => {
    const holiday = isPublicHoliday(date);
    const holidayName = holiday
      ? language === "en"
        ? holiday.enName
        : holiday.name
      : null;
    return holidayName ? holidayName.split("/") : [];
  };

  const isSaturday = (day: number) => {
    return day === 6;
  };

  const getMonthName = (monthNumber: number): string => {
    const date = new Date(2025, monthNumber - 1, 1);
    const monthName = new Intl.DateTimeFormat(language, {
      month: "short",
    }).format(date);

    if (language === "en") {
      return monthName;
    }

    return MONTH_NAME_EN[monthName as keyof typeof MONTH_NAME_EN];
  };

  const handleDateClick = (date: CalendarDateType) => {
    setSelectedDate(date);
    setIsDialogOpen(true);
  };

  return (
    <>
      {data?.map((week) =>
        week?.map((date, weekNumber) => (
          <div
            key={`${weekNumber}-${date.bs.day}`}
            className={cn(
              "py-1 sm:py-2 px-2 sm:px-4 font-mono relative transition-all duration-100 text-left flex flex-col justify-between space-y-2 select-none bg-background h-full text-2xl sm:text-4xl md:text-4xl lg:text-5xl 2xl:text-6xl overflow-hidden min-h-[60px] md:min-h-[100px] 2xl:min-h-[124px]",
              !date?.isCurrentMonth &&
                "bg-[repeating-linear-gradient(-60deg,#dbdbdb,#dbdbdb_1px,transparent_1px,transparent_5px)] dark:bg-[repeating-linear-gradient(-60deg,#2C2C2C,#2C2C2C_1px,transparent_1px,transparent_5px)] opacity-40",
              date.isToday &&
                "text-green-600 ring-inset ring-2 sm:ring-4 ring-green-600",
              (isPublicHoliday(date) || isSaturday(weekNumber)) && "text-destructive"
            )}
            onClick={() => handleDateClick(date)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleDateClick(date);
              }
            }}
          >
            <div className="flex flex-col md:flex-row justify-between">
              <div
                className={cn(
                  "flex items-center space-x-2",
                  isPublicHoliday(date) && "text-destructive"
                )}
              >
                <span>
                  {__numbers(date.bs.day.toString(), language)}
                </span>
              </div>
              <div
                className={cn(
                  "text-sm lg:text-base 2xl:text-2xl text-muted-foreground font-sans",
                  isPublicHoliday(date) && "text-destructive"
                )}
              >
                <span className="">
                  {getMonthName(date.ad.month)}
                </span>{" "}
                <span className="">
                  {__numbers(date.ad.day.toString(), language)}
                </span>
              </div>
            </div>
            {isPublicHoliday(date) && getPublicHolidayName(date).length > 0 && (
              <div className="hidden md:block">
                <p className="text-sm text-muted-foreground font-medium line-clamp-2 font-sans">
                  {getPublicHolidayName(date).join(", ")}
                </p>
              </div>
            )}
          </div>
        ))
      )}

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl">
              {selectedDate && (
                <>
                  {selectedDate.bs.year}-{selectedDate.bs.month}-{selectedDate.bs.day} BS
                </>
              )}
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-4">
              {selectedDate && (
                <>
                  <div className="mt-4">
                    <h3 className="font-semibold mb-2">Nepali Date (BS)</h3>
                    <p>
                      {__numbers(selectedDate.bs.year.toString(), language)}-
                      {__numbers(selectedDate.bs.month.toString(), language)}-
                      {__numbers(selectedDate.bs.day.toString(), language)}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">English Date (AD)</h3>
                    <p>
                      {selectedDate.ad.year}-{getMonthName(selectedDate.ad.month)}-
                      {selectedDate.ad.day}
                    </p>
                  </div>
                  {selectedDate?.isToday && (
                    <div className="mt-2">
                      <span className="text-green-600 font-semibold">Today</span>
                    </div>
                  )}
                  {selectedDate && isPublicHoliday(selectedDate) && (
                    <div>
                      <h3 className="font-semibold mb-2">Holidays/Events</h3>
                      <ul className="list-disc pl-4">
                        {getPublicHolidayName(selectedDate).map((name) => (
                          <li key={`holiday-${selectedDate.bs.year}-${selectedDate.bs.month}-${selectedDate.bs.day}-${name}`} className="">
                            {name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="sm:justify-start">
            <AlertDialogCancel>Close</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
