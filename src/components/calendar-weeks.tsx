const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const nepaliWeekdays = [
  "आइतबार",
  "सोमबार",
  "मंगलबार",
  "बुधबार",
  "बिहीबार",
  "शुक्रबार",
  "शनिबार",
];

export default function CalendarWeeks({ language }: { language: string }) {
  return (
    <>
      {weekdays.map((day, index) => (
        <div
          key={day}
          className="py-4 px-3 bg-background text-sm md:text-base lg:text-lg font-medium text-[#878787] font-mono uppercase"
        >
          {language === "en" ? day : nepaliWeekdays[index]}
        </div>
      ))}
    </>
  );
}
