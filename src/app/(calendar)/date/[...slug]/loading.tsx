import { cn } from "@/lib/utils";

export default function CalendarLoading() {
  const days = Array.from({ length: 35 });
  return (
    <>
      {days.map((_, index) => (
        <div
          // biome-ignore lint/suspicious/noArrayIndexKey: Its fine here
          key={index}
          className={cn(
            "py-1 sm:py-2 px-2 sm:px-4 font-mono relative transition-all duration-100 text-left flex flex-col justify-between space-y-2 select-none bg-background h-full text-2xl sm:text-4xl md:text-4xl lg:text-5xl 2xl:text-6xl overflow-hidden min-h-[60px] md:min-h-[100px] 2xl:min-h-[124px]",
            (index < 3 || index > days.length - 2) &&
              "bg-[repeating-linear-gradient(-60deg,#dbdbdb,#dbdbdb_1px,transparent_1px,transparent_5px)] dark:bg-[repeating-linear-gradient(-60deg,#2C2C2C,#2C2C2C_1px,transparent_1px,transparent_5px)] opacity-40"
          )}
        >
          <div className="flex flex-col md:flex-row justify-between">
            <div
              className={cn(
                "w-8 h-10 bg-muted-foreground animate-pulse opacity-50 rounded-md",
                index % 7 === 6 && "bg-destructive"
              )}
            />
            <div className="bg-muted-foreground animate-pulse opacity-30 w-20 h-4 rounded-md" />
          </div>
        </div>
      ))}
    </>
  );
}
