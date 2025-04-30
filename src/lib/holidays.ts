import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";

export type HolidayType = {
  date: string;
  name: string;
  type: string;
  enDate: string;
  enName: string;
  description?: string;
};

export async function getHolidays(year: number): Promise<HolidayType[]> {
  try {
    const filePath = path.join(
      process.cwd(),
      "data",
      "holidays",
      `${year}.json`
    );
    // check if file exists
    if (!existsSync(filePath)) {
      return [];
    }
    const fileContent = await readFile(filePath, "utf-8");
    const holidays: HolidayType[] = JSON.parse(fileContent);
    return holidays;
  } catch (error) {
    console.warn("Error reading holidays:", error);
    return [];
  }
}
