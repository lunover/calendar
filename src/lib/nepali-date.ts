import { KNOWN_DATE, NEPALI_MONTH_DATA } from '@/lib/constants/nepali-date-data';

// Define a type for the return format
export type ReturnDateFormatType = {
    bs: { year: number, month: number, day: number },
    ad: { year: number, month: number, day: number }
};

// Define a type for the return format specific to getFullMonthDates
export type CalendarDateType = {
    bs: { year: number, month: number, day: number },
    ad: { year: number, month: number, day: number },
    isCurrentMonth: boolean,
    isToday: boolean
};

export function getToday(): ReturnDateFormatType {
    const today = new Date();
    const knownAdDate = new Date(KNOWN_DATE.ad);
    const [knownBsYear, knownBsMonth, knownBsDay] = KNOWN_DATE.bs.split('-').map(Number); // Use KNOWN_DATE for BS

    // Calculate the day difference from the known AD date to today
    const dayDifference = Math.floor((today.getTime() - knownAdDate.getTime()) / (1000 * 60 * 60 * 24));

    // Start from the known BS date
    let year = knownBsYear;
    let month = knownBsMonth;
    let day = knownBsDay;

    // Add the day difference to the BS date
    let remainingDays = dayDifference;
    while (remainingDays > 0) {
        const daysInCurrentMonth = NEPALI_MONTH_DATA[year][month - 1][1];
        if (day + remainingDays <= daysInCurrentMonth) {
            day += remainingDays;
            remainingDays = 0;
        } else {
            remainingDays -= (daysInCurrentMonth - day + 1);
            day = 1;
            month += 1;
            if (month > 12) {
                month = 1;
                year += 1;
            }
        }
    }

    return {
        bs: { year, month, day },
        ad: { year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate() }
    };
}

export function convertDate(bsDateString: string): ReturnDateFormatType {
    // Parse the BS date string
    const [bsYear, bsMonth, bsDay] = bsDateString.split('-').map(Number);
    const knownAdDate = new Date(KNOWN_DATE.ad);
    const [knownBsYear, knownBsMonth, knownBsDay] = KNOWN_DATE.bs.split('-').map(Number); // Use KNOWN_DATE for BS

    // Calculate the AD date from the given BS date
    const adDate = calculateAdDateFromBs(bsYear, bsMonth, bsDay, { year: knownBsYear, month: knownBsMonth, day: knownBsDay }, knownAdDate);

    return {
        bs: { year: bsYear, month: bsMonth, day: bsDay },
        ad: { year: adDate.getFullYear(), month: adDate.getMonth() + 1, day: adDate.getDate() }
    };
}

function calculateAdDateFromBs(bsYear: number, bsMonth: number, bsDay: number, referenceBs: { year: number, month: number, day: number }, referenceAd: Date): Date {
    let dayDifference = 0;
    let currentYear = referenceBs.year;
    let currentMonth = referenceBs.month;
    let currentDay = referenceBs.day;

    while (currentYear !== bsYear || currentMonth !== bsMonth || currentDay !== bsDay) {
        if (currentYear < bsYear || (currentYear === bsYear && currentMonth < bsMonth) || (currentYear === bsYear && currentMonth === bsMonth && currentDay < bsDay)) {
            // Move forward in time
            const daysInCurrentMonth = NEPALI_MONTH_DATA[currentYear][currentMonth - 1][1];
            if (currentDay < daysInCurrentMonth) {
                currentDay++;
            } else {
                currentDay = 1;
                currentMonth++;
                if (currentMonth > 12) {
                    currentMonth = 1;
                    currentYear++;
                }
            }
            dayDifference++;
        } else {
            // Move backward in time
            if (currentDay > 1) {
                currentDay--;
            } else {
                currentMonth--;
                if (currentMonth < 1) {
                    currentMonth = 12;
                    currentYear--;
                }
                currentDay = NEPALI_MONTH_DATA[currentYear][currentMonth - 1][1];
            }
            dayDifference--;
        }
    }

    return new Date(referenceAd.getTime() + dayDifference * 24 * 60 * 60 * 1000);
}

export function getFullMonthDates(bsYear?: number, bsMonth?: number): CalendarDateType[][] {
    if (!bsYear || !bsMonth) {
        const today = getToday();
        bsYear = today.bs.year;
        bsMonth = today.bs.month;
    }

    const monthData = NEPALI_MONTH_DATA[bsYear][bsMonth - 1];
    const startWeekDay = monthData[0];
    const totalDaysInMonth = monthData[1];

    const datesByWeek: CalendarDateType[][] = [];
    let currentWeek: CalendarDateType[] = [];

    // Determine the previous month and year
    let prevMonth = bsMonth - 1;
    let prevYear = bsYear;
    if (prevMonth < 1) {
        prevMonth = 12;
        prevYear -= 1;
    }

    // Get the total days in the previous month
    const prevMonthDays = NEPALI_MONTH_DATA[prevYear][prevMonth - 1][1];

    // Add the last few days of the previous month to the first week
    for (let i = startWeekDay - 1; i >= 0; i--) {
        const bsDateString = `${prevYear}-${prevMonth}-${prevMonthDays - i}`;
        const date = convertDate(bsDateString);
        currentWeek.push({
            ...date,
            isCurrentMonth: false,
            isToday: false
        });
    }

    for (let day = 1; day <= totalDaysInMonth; day++) {
        const bsDateString = `${bsYear}-${bsMonth}-${day}`;
        const date = convertDate(bsDateString);
        const today = getToday();
        const isToday = today.bs.year === bsYear && today.bs.month === bsMonth && today.bs.day === day;

        currentWeek.push({
            ...date,
            isCurrentMonth: true,
            isToday
        });

        // If the week is complete, push the week to the result
        if (currentWeek.length === 7) {
            datesByWeek.push(currentWeek);
            currentWeek = [];
        }
    }

    // Determine the next month and year
    let nextMonth = bsMonth + 1;
    let nextYear = bsYear;
    if (nextMonth > 12) {
        nextMonth = 1;
        nextYear += 1;
    }

    // Fill the remaining slots of the last week with the first days of the next month
    let nextDay = 1;
    while (currentWeek.length < 7) {
        const bsDateString = `${nextYear}-${nextMonth}-${nextDay}`;
        const date = convertDate(bsDateString);
        currentWeek.push({
            ...date,
            isCurrentMonth: false,
            isToday: false
        });
        nextDay++;
    }

    // Push the last week to the result
    if (currentWeek.length > 0) {
        datesByWeek.push(currentWeek);
    }

    return datesByWeek;
}

export function getFullYearData(year: number): { month: number, weeks: CalendarDateType[][] }[] {
    const yearData = [];

    for (let month = 1; month <= 12; month++) {
        const datesByWeek = getFullMonthDates(year, month);

        yearData.push({month: month, weeks: datesByWeek});
    }

    return yearData;
}

export function getAllBsYears(): number[] {
    return Object.keys(NEPALI_MONTH_DATA).map(Number);
}
