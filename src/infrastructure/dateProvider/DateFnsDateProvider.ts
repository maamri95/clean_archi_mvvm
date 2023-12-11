import {
  addDays,
  isBefore,
  differenceInDays,
  differenceInHours,
  format as formatDate,
} from "date-fns";
import { DateProvider } from "#contracts/DateProvider";
import { injectable } from "tsyringe";
import { enCA } from "date-fns/locale";
@injectable()
export class DateFnsDateProvider implements DateProvider {
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

  format(date: Date, format: string = "yyyy/MM/dd"): string {
    return formatDate(date, format, { locale: enCA });
  }
}
