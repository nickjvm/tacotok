import { format } from "date-fns";

export function yyyymmdd(date: Date): number {
  return parseInt(format(date, "yyyyMMdd"), 10);
}

export function yyyymmddToDate(date: number | string): Date {
  const year = parseInt(date.toString().slice(0, 4), 10);
  const month = parseInt(date.toString().slice(4, 6), 10);
  const day = parseInt(date.toString().slice(6, 8), 10);

  return new Date(year, month - 1, day);
}

export function formatDbDate(
  dbDate: number | string,
  dateFormat: string
): string {
  const date = yyyymmddToDate(dbDate);

  return format(date, dateFormat);
}

export function subtractFromDbDate(dbDate: number, days: number): number {
  const date = yyyymmddToDate(dbDate);
  date.setDate(date.getDate() - days);
  return yyyymmdd(date);
}
