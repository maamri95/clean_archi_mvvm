import { DateProvider } from "#contracts/DateProvider";

export class DefaultDateProvider implements DateProvider {
  now(): Date {
    return new Date();
  }

  addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(date.getDate() + days);
    return result;
  }

  isBefore(date1: Date, date2: Date): boolean {
    return date1 < date2;
  }

  differenceInDays(date1: Date, date2: Date): number {
    const diffInMilliseconds = date2.getTime() - date1.getTime();
    return diffInMilliseconds / (1000 * 60 * 60 * 24);
  }

  differenceInHours(date1: Date, date2: Date): number {
    const diffInMilliseconds = date2.getTime() - date1.getTime();
    return diffInMilliseconds / (1000 * 60 * 60);
  }
}
