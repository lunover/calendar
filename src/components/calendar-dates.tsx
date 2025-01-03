import { cn } from "@/lib/utils";
import { CalendarData, Month, Day } from "@/types/calendar";

type CalendarDatesProps = {
  selectedMonth: Month;
  calendarData: CalendarData | null;
  language: string;
};

function generateCalendar(
  currentMonth: Month,
  calendarData: CalendarData
): ({ day: Day; belongsToCurrentMonth: boolean } | null)[] {
  const daysArray: ({ day: Day; belongsToCurrentMonth: boolean } | null)[] = [];
  const firstDayOfMonth = new Date(currentMonth.days[0].enDate).getDay();
  const lastDayOfMonth = new Date(
    currentMonth.days[currentMonth.days.length - 1].enDate
  ).getDay();

  // Fill in days from the previous month
  if (firstDayOfMonth > 0) {
    const prevMonthIndex = (currentMonth.month.en - 2 + 12) % 12;
    const prevMonth = calendarData[prevMonthIndex];
    const prevMonthDays = prevMonth.days.slice(-firstDayOfMonth);
    daysArray.push(
      ...prevMonthDays.map((day) => ({ day, belongsToCurrentMonth: false }))
    );
  }

  // Fill in current month days
  daysArray.push(
    ...currentMonth.days.map((day) => ({ day, belongsToCurrentMonth: true }))
  );

  // Fill in days from the next month
  if (lastDayOfMonth < 6) {
    const nextMonthIndex = currentMonth.month.en % 12;
    const nextMonth = calendarData[nextMonthIndex];
    const daysToFill = 6 - lastDayOfMonth;
    const nextMonthDays = nextMonth.days.slice(0, daysToFill);
    daysArray.push(
      ...nextMonthDays.map((day) => ({ day, belongsToCurrentMonth: false }))
    );
  }

  // Ensure the array length is a multiple of 7
  while (daysArray.length % 7 !== 0) {
    daysArray.push(null);
  }

  return daysArray;
}

function getEnglishDateArray(enDate: string): string[] {
  const date = new Date(enDate);
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric"
  };
  return date.toLocaleDateString("en-US", options).split(" ");
}

export default function CalendarDates({
  selectedMonth,
  calendarData,
  language
}: CalendarDatesProps) {
  const isToday = (day: Day | null) => {
    if (!day) return false;

    const today = new Date();
    const dayDate = new Date(day.enDate);
    return today.toDateString() === dayDate.toDateString();
  };

  const showEventsAndTithi = false;

  const isSaturday = (day: Day | null) => {
    if (!day) return false;
    const dayDate = new Date(day.enDate);
    return dayDate.getDay() === 6;
  };

  if (!calendarData) return null;

  return (
    <>
      {generateCalendar(selectedMonth, calendarData).map((dayObj, index) => (
        <div
          key={index}
          className={cn(
            "aspect-square md:aspect-[4/2] pt-1 sm:pt-2 pb-10 px-2 sm:px-4 font-mono relative transition-all duration-100 text-left flex flex-col space-y-2 select-none bg-background h-full overflow-hidden text-2xl sm:text-4xl md:text-4xl lg:text-5xl 2xl:text-6xl",
            !dayObj?.belongsToCurrentMonth &&
              "bg-[repeating-linear-gradient(-60deg,#dbdbdb,#dbdbdb_1px,transparent_1px,transparent_5px)] dark:bg-[repeating-linear-gradient(-60deg,#2C2C2C,#2C2C2C_1px,transparent_1px,transparent_5px)] opacity-40",
            isToday(dayObj?.day || null) && "text-green-600 ring-inset ring-2 sm:ring-4 ring-green-600",
            showEventsAndTithi && "text-lg",
            isSaturday(dayObj?.day || null) && "text-destructive"
          )}
        >
          {dayObj ? (
            <>
              <div className="flex justify-between lg:items-center flex-col lg:flex-row">
                <div
                  className={cn(
                    "flex items-center space-x-2",
                    dayObj?.day?.holiday && "text-destructive"
                  )}
                >
                  <span>
                    {language === "en" ? dayObj.day.day.en : dayObj.day.day.np}
                  </span>
                </div>
                <div className={cn("text-sm lg:text-lg xl:text-xl 2xl:text-2xl text-gray-500", showEventsAndTithi && "text-sm", ((!dayObj?.belongsToCurrentMonth && dayObj?.day?.holiday) || isSaturday(dayObj?.day || null)) && "text-destructive")}>
                  <span className="hidden md:inline">{getEnglishDateArray(dayObj.day.enDate)[0]}</span>
                  {" "}
                  <span className="">{getEnglishDateArray(dayObj.day.enDate)[1]}</span>
                </div>
              </div>

              {showEventsAndTithi && (
                <div className="flex flex-col font-sans w-full">
                  {dayObj?.belongsToCurrentMonth && dayObj.day.tithi.en && (
                    <div className="inline-flex items-center border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground/50 mb-2">
                      {language === "en"
                        ? dayObj.day.tithi.en
                        : dayObj.day.tithi.np}
                    </div>
                  )}
                  {dayObj?.belongsToCurrentMonth &&
                    dayObj.day.events.length > 0 && (
                      <>
                        <div className="text-xs bg-muted text-muted-foreground py-1 px-2 w-full text-left min-h-[23px] truncate">
                          &mdash;{" "}
                          {language === "en"
                            ? dayObj.day.events[0].name
                            : dayObj.day.events[0].name}
                        </div>
                        {dayObj.day.events.length > 1 && (
                          <div className="text-xs bg-muted text-muted-foreground py-1 px-2 w-full text-left min-h-[23px] truncate">
                            + {dayObj.day.events.length - 1} more events
                          </div>
                        )}
                      </>
                    )}
                </div>
              )}
            </>
          ) : null}
        </div>
      ))}
    </>
  );
}
