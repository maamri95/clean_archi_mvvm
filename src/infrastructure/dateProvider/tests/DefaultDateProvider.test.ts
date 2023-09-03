import { DefaultDateProvider } from "#infrastructure/dateProvider/DefaultDateProvider";
import { expect, it, describe, beforeEach } from "vitest";

describe("DefaultDateProvider", () => {
  let dateProvider: DefaultDateProvider;

  beforeEach(() => {
    dateProvider = new DefaultDateProvider();
  });

  it("should return the current date", () => {
    const current = new Date();
    const result = dateProvider.now();
    console.dir({ current: current.getTime(), result: result.getTime() });
    expect(result.getTime()).toBeCloseTo(current.getTime(), 0);
  });

  it("should add days to a date", () => {
    const date = new Date(2023, 8, 3); // Sept 3, 2023
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
    expect(result).toBeCloseTo(3, 0.1); // give a small window for fractional days
  });

  it("should get the difference in hours between two dates", () => {
    const date1 = new Date(2023, 8, 3, 10, 0); // Sept 3, 2023, 10am
    const date2 = new Date(2023, 8, 3, 14, 0); // Sept 3, 2023, 2pm
    const result = dateProvider.differenceInHours(date1, date2);
    expect(result).toBeCloseTo(4, 0.1); // give a small window for fractional hours
  });
  it("should check if a date is before another", () => {
    const date1 = new Date(2023, 8, 3);
    const date2 = new Date(2023, 8, 4);
    const result1 = dateProvider.isBefore(date1, date2);
    expect(result1).toBe(true);

    // Negative test case
    const result2 = dateProvider.isBefore(date2, date1);
    expect(result2).toBe(false);
  });

  it("should subtract days from a date when given a negative number", () => {
    const date = new Date(2023, 8, 3); // Sept 3, 2023
    const result = dateProvider.addDays(date, -2);
    expect(result.getDate()).toBe(1); // Sept 1, 2023
  });
});
