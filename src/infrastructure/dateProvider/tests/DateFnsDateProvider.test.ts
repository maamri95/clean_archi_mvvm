import { DateFnsDateProvider } from "#infrastructure/dateProvider/DateFnsDateProvider";
import { expect, it, describe, beforeEach } from "vitest";

describe("DateFnsProvider", () => {
  let dateProvider: DateFnsDateProvider;

  beforeEach(() => {
    dateProvider = new DateFnsDateProvider();
  });

  it("should return the current date", () => {
    const current = new Date();
    const result = dateProvider.now();
    expect(result.getTime()).toBeCloseTo(current.getTime(), 4);
  });

  it("should add days to a date", () => {
    const date = new Date(2023, 8, 3);
    const result = dateProvider.addDays(date, 2);
    expect(result.getDate()).toBe(5);
  });

  it("should check if a date is before another", () => {
    const date1 = new Date(2023, 8, 3);
    const date2 = new Date(2023, 8, 4);
    const result = dateProvider.isBefore(date1, date2);
    expect(result).toBe(true);
  });

  it("should get the difference in days between two dates", () => {
    const date1 = new Date(2023, 8, 3);
    const date2 = new Date(2023, 8, 6);
    const result = dateProvider.differenceInDays(date1, date2);
    expect(result).toBeCloseTo(3, 0.1);
  });

  it("should get the difference in hours between two dates", () => {
    const date1 = new Date(2023, 8, 3, 10, 0);
    const date2 = new Date(2023, 8, 3, 14, 0);
    const result = dateProvider.differenceInHours(date1, date2);
    expect(result).toBeCloseTo(4, 0.1);
  });
});
