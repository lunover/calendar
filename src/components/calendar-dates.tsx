import { cn } from "@/lib/utils";
import { CalendarDateType } from "@/lib/nepali-date";
import { __numbers } from "@/lib/translate";
import { MONTH_NAME_EN } from "@/lib/constants/nepali-texts";

type CalendarDatesProps = {
  data: CalendarDateType[][] | null;
  language: string;
};

export default function CalendarDates({ data, language }: CalendarDatesProps) {
  const isHoliday = (day: number) => {
    return isSaturday(day);
  };

  const isSaturday = (day: number) => {
    return day === 6;
  };

  const getMonthName = (monthNumber: number): string => {
    const date = new Date(2025, monthNumber - 1, 1); // Year is arbitrary, month is zero-based
    const monthName = new Intl.DateTimeFormat(language, {
      month: "short",
    }).format(date);

    if (language === "en") {
      return monthName;
    }

    return MONTH_NAME_EN[monthName as keyof typeof MONTH_NAME_EN];
  };

  return (
    <>
      {data?.map((week) =>
        week?.map((date, weekNumber) => (
          <div
            key={`${weekNumber}-${date.bs.day}`}
            className={cn(
              "aspect-square md:aspect-[4/2] pt-1 sm:pt-2 pb-10 px-2 sm:px-4 font-mono relative transition-all duration-100 text-left flex flex-col space-y-2 select-none bg-background h-full overflow-hidden text-2xl sm:text-4xl md:text-4xl lg:text-5xl 2xl:text-6xl",
              !date?.isCurrentMonth &&
                "bg-[repeating-linear-gradient(-60deg,#dbdbdb,#dbdbdb_1px,transparent_1px,transparent_5px)] dark:bg-[repeating-linear-gradient(-60deg,#2C2C2C,#2C2C2C_1px,transparent_1px,transparent_5px)] opacity-40",
              date.isToday &&
                "text-green-600 ring-inset ring-2 sm:ring-4 ring-green-600",
              isHoliday(weekNumber) && "text-destructive"
            )}
          >
            <div className="flex justify-between lg:items-center flex-col lg:flex-row">
              <div
                className={cn(
                  "flex items-center space-x-2",
                  isHoliday(weekNumber) && "text-destructive"
                )}
              >
                <span>{__numbers(date.bs.day.toString(), language)}</span>
              </div>
              <div
                className={cn(
                  "text-sm lg:text-lg xl:text-xl 2xl:text-2xl text-gray-500",
                  isHoliday(weekNumber) && "text-destructive"
                )}
              >
                <span className="hidden md:inline">
                  {getMonthName(date.ad.month)}
                </span>{" "}
                <span className="">
                  {__numbers(date.ad.day.toString(), language)}
                </span>
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
}
