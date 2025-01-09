import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ThemeSwitcher } from "./theme-switcher";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import LanguageSwitcher from "./language-switcher";
import {
  CalendarDateType,
  getAllBsYears,
  getFullMonthDates,
  getToday,
} from "@/lib/nepali-date";
import { __month, __numbers } from "@/lib/translate";
import { MONTH_NAME_LONG } from "@/lib/constants/nepali-texts";

type CalendarHeaderProps = {
  bsYear?: number;
  bsMonth?: number;
  language: string;
};

const getFormattedMonthYear = (data: CalendarDateType[][]) => {
  const firstDate = data[0][0].ad;
  const lastDate = data[data.length - 1][data[data.length - 1].length - 1].ad;

  const firstDay = new Date(firstDate.year, firstDate.month - 1, firstDate.day);
  const lastDay = new Date(lastDate.year, lastDate.month - 1, lastDate.day);

  const firstMonth = firstDay.toLocaleString("en-US", { month: "short" });
  const lastMonth = lastDay.toLocaleString("en-US", { month: "short" });

  const firstYear = firstDay.getFullYear();
  const lastYear = lastDay.getFullYear();

  if (firstYear === lastYear) {
    return `${firstYear} ${firstMonth} / ${lastMonth}`;
  }

  return `${firstYear} / ${lastYear} ${firstMonth} / ${lastMonth}`;
};

export default function CalendarHeader({
  bsYear,
  bsMonth,
  language,
}: CalendarHeaderProps) {
  const today = getToday();

  if (!bsYear || !bsMonth) {
    bsYear = today.bs.year;
    bsMonth = today.bs.month;
  }
  const calendarData = getFullMonthDates(bsYear, bsMonth);
  const displayYear = __numbers(bsYear.toString(), language);
  const displayMonth = __month(bsMonth.toString(), language);

  const [nextMonth, setNextMonth] = useState(bsMonth);
  const [nextYear, setNextYear] = useState(bsYear);

  const showGoToToday = !(today.bs.year === bsYear && today.bs.month === bsMonth);
  const formattedMonthYearText = getFormattedMonthYear(calendarData);
  const years = getAllBsYears();
  const router = useRouter();

  const handleMonthChange = (value: string) => {
    setNextMonth(parseInt(value, 10));
  };

  const handleYearChange = (value: string) => {
    setNextYear(parseInt(value, 10));
  };

  const navigateMonth = (offset: number) => {
    let newMonthIndex = nextMonth + offset;
    let newYear = nextYear;

    if (newMonthIndex == 0) {
      newMonthIndex = 12; // Chaitra
      newYear -= 1;
    } else if (newMonthIndex > 12) {
      newMonthIndex = 1; // Baisakh
      newYear += 1;
    }

    setNextMonth(newMonthIndex);
    setNextYear(newYear);
  };

  useEffect(() => {
    const newUrl = `/date/${nextYear}/${nextMonth.toString().padStart(2, "0")}`;
    const url = new URL(window.location.href);

    if (url.pathname !== newUrl && `${nextYear}/${nextMonth}` !== `${bsYear}/${bsMonth}`) {
      url.pathname = newUrl;
      router.push(url.toString());
    }
  }, [nextMonth, nextYear, bsYear, bsMonth, router]);

  return (
    <div className="flex items-center justify-between mb-6 md:flex-row flex-col gap-4">
      <div className="space-y-2 select-text">
        <div className="flex items-center space-x-2">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-mono font-semibold uppercase">
            {`${displayYear} ${displayMonth}`}
          </h1>
        </div>
        <p className="text-muted-foreground uppercase flex items-center space-x-2 text-base md:text-xl">
          {formattedMonthYearText}
        </p>
      </div>
      <div className="flex gap-4 items-center flex-wrap justify-center">
        {showGoToToday && (
          <Link className="text-xs" href="/">
            {language === "en" ? "Go to Today" : "आजको दिन"}
          </Link>
        )}

        <ThemeSwitcher />

        <LanguageSwitcher language={language} />

        <div className="flex items-center border h-9">
          <button
            className="inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground p-0 w-10 h-6 hover:bg-transparent"
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

          <Select value={nextYear.toString()} onValueChange={handleYearChange}>
            <SelectTrigger className="w-[60px] text-center px-0 text-base rounded-none border-none [&>svg]:hidden justify-center focus:ring-0 shadow-none">
              <SelectValue
                placeholder={__numbers(nextYear.toString(), language)}
              />
            </SelectTrigger>
            <SelectContent className="rounded-none min-w-[120px] -left-[40px]">
              {years.map((year) => (
                <SelectItem
                  className="rounded-none"
                  key={year}
                  value={year.toString()}
                >
                  {__numbers(year.toString(), language)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={nextMonth.toString()} onValueChange={handleMonthChange}>
            <SelectTrigger className="w-[80px] text-center px-0 text-base rounded-none border-none [&>svg]:hidden justify-center focus:ring-0 shadow-none">
              <SelectValue
                placeholder={__month(nextMonth.toString(), language)}
              />
            </SelectTrigger>
            <SelectContent className="rounded-none min-w-[120px] -left-[20px]">
              {Object.keys(MONTH_NAME_LONG).map((name, index) => (
                <SelectItem
                  className="rounded-none"
                  key={index}
                  value={(index + 1).toString()}
                >
                  {__month(name, language)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <button
            className="inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground p-0 w-10 h-6 hover:bg-transparent"
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
