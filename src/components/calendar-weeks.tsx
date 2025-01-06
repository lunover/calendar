import { __week } from "@/lib/translate";

export default function CalendarWeeks({ language }: { language: string }) {
  return (
    <>
      {Array.from({ length: 7 }, (_, index) => (
        <div
          key={index}
          className="py-4 px-2 sm:px-4 bg-background text-sm md:text-base lg:text-lg font-medium text-[#878787] font-mono uppercase"
        >
          <span className="hidden md:block">
            {__week(index.toString(), language, false)}
          </span>
          <span className="block md:hidden">
            {__week(index.toString(), language, true)}
          </span>
        </div>
      ))}
    </>
  );
}
