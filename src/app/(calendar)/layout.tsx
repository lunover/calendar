import CalendarHeader from "@/components/calendar-header";
import CalendarWeeks from "@/components/calendar-weeks";
import { cookies } from "next/headers";

export default async function CalendarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const language = cookieStore.get("language")?.value || "en";

  return (
    <div className="p-4">
      <CalendarHeader language={language} />

      <div className="grid grid-cols-7 gap-px border border-border bg-border">
        <CalendarWeeks language={language} />

        {children}
      </div>
    </div>
  );
}
