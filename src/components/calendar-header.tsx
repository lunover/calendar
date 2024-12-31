import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ThemeSwitcher } from "./theme-switcher";
import { CalendarData, Month } from "@/types/calendar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import LanguageSwitcher from "./language-switcher";

type CalendarHeaderProps = {
  initialYear: number;
  calendarData: CalendarData | null;
  language: string;
  selectedMonthIndex: number;
  selectedMonth: Month | null;
};

const monthsNep = new Map([
  [1, "वैशाख"],
  [2, "जेष्ठ"],
  [3, "असार"],
  [4, "श्रावण"],
  [5, "भाद्र"],
  [6, "असोज"],
  [7, "कार्तिक"],
  [8, "मंसिर"],
  [9, "पुष"],
  [10, "माघ"],
  [11, "फाल्गुन"],
  [12, "चैत्र"],
]);

const monthsEn = new Map([
  [1, "Baisakh"],
  [2, "Jestha"],
  [3, "Ashad"],
  [4, "Shrawan"],
  [5, "Bhadra"],
  [6, "Ashwin"],
  [7, "Kartik"],
  [8, "Mangsir"],
  [9, "Poush"],
  [10, "Magh"],
  [11, "Falgun"],
  [12, "Chaitra"],
]);

const ENG_NEP_NUMBERS = new Map([
  [0, "०"],
  [1, "१"],
  [2, "२"],
  [3, "३"],
  [4, "४"],
  [5, "५"],
  [6, "६"],
  [7, "७"],
  [8, "८"],
  [9, "९"],
]);

const enToNep = (year: string, language: string) => {
  if (language === "np") {
    return year
      .split("")
      .map((digit) => ENG_NEP_NUMBERS.get(parseInt(digit, 10)))
      .join("");
  }

  return year;
};

export default function CalendarHeader({
  initialYear,
  calendarData,
  language,
  selectedMonthIndex,
  selectedMonth,
}: CalendarHeaderProps) {
  const initialMonthIndex = selectedMonthIndex;
  const [currentMonthIndex, setCurrentMonthIndex] = useState<number>(selectedMonthIndex);
  const [year, setYear] = useState<number>(initialYear);
  const [displayYear, setDisplayYear] = useState<string>(
    enToNep(initialYear.toString(), language)
  );

  const [showGoToToday, setShowGoToToday] = useState(true);
  const router = useRouter();

  const handleMonthChange = (value: string) => {
    setCurrentMonthIndex(parseInt(value, 10));
  };

  const navigateMonth = (offset: number) => {
    let newMonthIndex = selectedMonthIndex + offset;
    let newYear = year;

    if (newMonthIndex == 0) {
      newMonthIndex = 12; // Chaitra
      newYear -= 1;
    } else if (newMonthIndex > 12) {
      newMonthIndex = 1; // Baisakh
      newYear += 1;
    }

    setCurrentMonthIndex(newMonthIndex);
    setYear(newYear);
  };

  const getFormattedMonthYear = (month: Month) => {
    const firstDay = new Date(month.days[0].enDate);
    const lastDay = new Date(month.days[month.days.length - 1].enDate);

    const firstMonth = firstDay.toLocaleString("en-US", { month: "short" });
    const lastMonth = lastDay.toLocaleString("en-US", { month: "short" });

    const firstYear = firstDay.getFullYear();
    const lastYear = lastDay.getFullYear();

    if (firstYear === lastYear) {
      return `${firstYear} ${firstMonth} / ${lastMonth}`;
    }

    return `${firstYear} / ${lastYear} ${firstMonth} / ${lastMonth}`;
  };

  useEffect(() => {
    if (calendarData) {
      const today = new Date();
      const isTodayInMonth = calendarData[selectedMonthIndex - 1].days.some(
        (day) => {
          const dayDate = new Date(day.enDate);
          return today.toDateString() === dayDate.toDateString();
        }
      );
      setShowGoToToday(!isTodayInMonth);
    }
  }, [calendarData, selectedMonth]);

  useEffect(() => {
    setDisplayYear(enToNep(year.toString(), language));
  }, [year, language]);

  useEffect(() => {
    const month = currentMonthIndex;
    const newUrl = `/${year}/${month.toString().padStart(2, "0")}`;
    const url = new URL(window.location.href);

    if (url.pathname !== newUrl && currentMonthIndex !== initialMonthIndex) {
      url.pathname = newUrl;
      router.push(url.toString());
    }
  }, [currentMonthIndex, year]);

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="space-y-2 select-text">
        <div className="flex items-center space-x-2">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-mono font-semibold uppercase">
            {displayYear}{" "}
            {language === "en"
              ? monthsEn.get(currentMonthIndex)
              : monthsNep.get(currentMonthIndex)}
          </h1>
        </div>
        {selectedMonth ? <p className="text-muted-foreground uppercase flex items-center space-x-2 text-base md:text-xl">
            {getFormattedMonthYear(selectedMonth)}
          </p>
          :
          <div className="bg-muted h-6"></div>
          }
      </div>
      <div className="flex space-x-4 items-center">
        {showGoToToday && (
          <Link className="text-xs" href="/">
            {language === "en" ? "Go to Today" : "आजको दिन"}
          </Link>
        )}

        <ThemeSwitcher />

        <LanguageSwitcher language={language} />

        <div className="flex items-center border h-9">
          <button
            className="inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground p-0 w-6 h-6 hover:bg-transparent mr-4 ml-2"
            onClick={() => navigateMonth(-1)}
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              className="w-6 h-6"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path>
            </svg>
          </button>
          <Select
            value={(selectedMonthIndex).toString()}
            onValueChange={handleMonthChange}
          >
            <SelectTrigger className="w-[80px] text-center px-0 text-base rounded-none border-none [&>svg]:hidden justify-center focus:ring-0">
              <SelectValue
                placeholder={
                  language === "en"
                    ? monthsEn.get(selectedMonthIndex)
                    : monthsNep.get(selectedMonthIndex)
                }
              />
            </SelectTrigger>
            <SelectContent className="rounded-none min-w-[178px] -left-[37px]">
              {Array.from(language === "en" ? monthsEn : monthsNep).map(
                ([index, monthName]) => (
                  <SelectItem
                    className="rounded-none"
                    key={index}
                    value={index.toString()}
                  >
                    {monthName}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
          <button
            className="inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground p-0 w-6 h-6 hover:bg-transparent ml-4 mr-2"
            onClick={() => navigateMonth(1)}
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              className="w-6 h-6"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path d="M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
