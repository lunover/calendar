import {
  WEEK_NAME_ENG,
  WEEK_NAME_NEP,
  WEEK_NAME_ENG_SHORT,
  WEEK_NAME_NEP_SHORT,
} from "@/lib/constants";

export default function CalendarWeeks({ language }: { language: string }) {
  return (
    <>
      {Array.from({ length: 7 }, (_, index) => (
        <div
          key={index}
          className="py-4 px-2 sm:px-4 bg-background text-sm md:text-base lg:text-lg font-medium text-[#878787] font-mono uppercase"
        >
          <span className="hidden md:block">
            {language === "en" ? WEEK_NAME_ENG.get(index) : WEEK_NAME_NEP.get(index)}
          </span>
          <span className="block md:hidden">
            {language === "en" ? WEEK_NAME_ENG_SHORT.get(index) : WEEK_NAME_NEP_SHORT.get(index)}
          </span>
        </div>
      ))}
    </>
  );
}
