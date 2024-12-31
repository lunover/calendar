"use server";

import fs from "fs";
import path from "path";
import { CalendarData } from "@/types/calendar";
import { ENGLISH_MONTHS_NAME, NEPALI_MONTHS_NAME } from "@/lib/constants";

function getNepaliDate(date: string, convert: string) {
  const yearString = date.split("-")[0];

  const filePath = path.join(
    process.cwd(),
    "data",
    "mapping",
    convert,
    `${yearString}.json`
  );

  const fileContents = fs.readFileSync(filePath, "utf8");
  const dateMapping = JSON.parse(fileContents);

  const nepaliDate = dateMapping[date];

  const key = convert === "ad-bs" ? "bs" : "ad";

  return {
    [key]: nepaliDate,
  };
}

function getCalendarData(year: string): CalendarData | { error: string } {
  try {
    const filePath = path.join(process.cwd(), "data", "years", `${year}.json`);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const data: CalendarData = JSON.parse(fileContents);
    return data;
  } catch (error) {
    return { error: `Data not found. Error: ${error}` };
  }
}

function getMonthName(month: number): string {
  return NEPALI_MONTHS_NAME.get(month) || "";
}

function getMonthEnglishName(month: number): string {
  return ENGLISH_MONTHS_NAME.get(month) || "";
}

export { getNepaliDate, getCalendarData, getMonthName, getMonthEnglishName };
