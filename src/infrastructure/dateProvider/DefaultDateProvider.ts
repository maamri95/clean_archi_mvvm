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

  format(date: Date, format: string): string {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const milliseconds = date.getMilliseconds();
    return format
      .replace("yyyy", year.toString())
      .replace("MM", month.toString().padStart(2, "0"))
      .replace("dd", day.toString().padStart(2, "0"))
      .replace("hh", hours.toString().padStart(2, "0"))
      .replace("mm", minutes.toString().padStart(2, "0"))
      .replace("ss", seconds.toString().padStart(2, "0"))
      .replace("SSS", milliseconds.toString().padStart(3, "0"));
  }
}
