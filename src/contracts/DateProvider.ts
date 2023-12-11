export interface DateProvider {
  /**
   * Returns the current date.
   */
  now(): Date;

  /**
   * Adds a certain number of days to a given date.
   * @param date The starting date.
   * @param days The number of days to add.
   */
  addDays(date: Date, days: number): Date;

  /**
   * Compares two dates and returns a boolean indicating if the first date is before the second.
   * @param date1 The first date.
   * @param date2 The second date.
   */
  isBefore(date1: Date, date2: Date): boolean;

  /**
   * Returns the difference in days between two dates.
   * @param date1 The first date.
   * @param date2 The second date.
   */
  differenceInDays(date1: Date, date2: Date): number;
  /**
   * Returns the difference in hours between two dates.
   * @param date1 The first date.
   * @param date2 The second date.
   */
  differenceInHours(date1: Date, date2: Date): number;

  /**
   * Returns the date in a given format.
   * @param date The date to format.
   * @param format The format to use.
   */
  format(date: Date, format?: string): string;
}
