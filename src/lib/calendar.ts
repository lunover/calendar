import fs from "fs";
import path from "path";

export function getNepaliDate(date: string, convert: string) {
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
