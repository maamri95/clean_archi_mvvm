import {
  addDays,
  isBefore,
  differenceInDays,
  differenceInHours,
} from "date-fns";
import { DateProvider } from "#contracts/DateProvider";

export class DateFnsDateProvider implements DateProvider {
  constructor() {}
  now(): Date {
    return new Date();
  }

  addDays(date: Date, days: number): Date {
    return addDays(date, days);
  }

  isBefore(date1: Date, date2: Date): boolean {
    return isBefore(date1, date2);
  }

  differenceInDays(date1: Date, date2: Date): number {
    return differenceInDays(date2, date1);
  }

  differenceInHours(date1: Date, date2: Date): number {
    return differenceInHours(date2, date1);
  }
}
