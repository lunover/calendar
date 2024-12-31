export interface Event {
  name: string;
  description: string;
}

export interface Day {
  holiday: boolean;
  tithi: {
    np: string;
    en: string;
  };
  events: Event[];
  day: {
    np: string;
    en: string;
  };
  date: {
    en: string;
    np: string;
  };
  enDate: string;
}

export interface Month {
  month: {
    en: number;
    np: string;
  };
  monthName: {
    en: string;
    np: string;
  };
  days: Day[];
}

export type CalendarData = Month[];
