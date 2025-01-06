import { NEPALI_NUMBERS } from "@/lib/constants/nepali-numbers";
import {
  MONTH_NAME,
  MONTH_NAME_LONG,
  WEEK_NAME,
  WEEK_NAME_LONG,
  WEEK_NAME_SHORT,
} from "./constants/nepali-texts";

export function __numbers(text: string, language: string): string {
  if (language === "en") {
    return text;
  }

  const numbers = text.split(" ");
  const translatedNumbers = numbers.map((number) => {
    return number.replace(/0|1|2|3|4|5|6|7|8|9/g, (match) => {
      return NEPALI_NUMBERS[parseInt(match)];
    });
  });

  return translatedNumbers.join(" ");
}

export function __month(text: string, language: string): string {
  const maybeMonthNumber = parseInt(text, 10);

  if (!isNaN(maybeMonthNumber)) {
    let monthName = "";

    if (language === "en") {
      monthName = Object.keys(MONTH_NAME_LONG)[maybeMonthNumber - 1];
    } else {
      monthName = Object.values(MONTH_NAME_LONG)[maybeMonthNumber - 1];
    }

    return monthName;
  }

  if (language === "en") {
    return text;
  }

  return MONTH_NAME[text as keyof typeof MONTH_NAME];
}

export function __week(
  text: string,
  language: string,
  short: boolean = false
): string {
  const maybeWeekNumber = parseInt(text, 10);

  if (!isNaN(maybeWeekNumber)) {
    let weekName = "";

    if (language === "en") {
      weekName = short
        ? Object.keys(WEEK_NAME_SHORT)[maybeWeekNumber]
        : Object.keys(WEEK_NAME_LONG)[maybeWeekNumber];
    } else {
      weekName = short
        ? Object.values(WEEK_NAME_SHORT)[maybeWeekNumber]
        : Object.values(WEEK_NAME_LONG)[maybeWeekNumber];
    }

    return weekName;
  }

  if (language === "en") {
    return text;
  }

  return WEEK_NAME[text as keyof typeof WEEK_NAME];
}
