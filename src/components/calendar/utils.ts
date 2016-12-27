import {zeroFill, isString, isFunction} from "../common/utils";

const datesOfMonth = [31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export function getFirstDateInMonth (y: number, m: number): Date {
  return new Date(y, m - 1, 1);
};

//是否为闰年
export function isLeapYear (y: number): boolean {
  return !(y % 4) && !!(y % 100) || !(y % 400);
};

export function getDatesInPrevMonth (y: number, m: number, firstDay = 0): number {
  let firstDayInMonth = getFirstDateInMonth(y, m).getDay();
  let dates = 0;
  if (~firstDayInMonth) {
    if (firstDayInMonth > firstDay) {
      dates = firstDayInMonth - firstDay
    } else if (firstDayInMonth === firstDay) {
      dates = 0;
    } else {
      dates = 6 - firstDay + 1 + firstDayInMonth;
    }
  }
  return dates;
};

export function getDatesInNextMonth (y: number, m: number, firstDay?: number, weekMode?: boolean): number {
  return weekMode ? 6 : getWeeksInMonth(y, m, firstDay) * 7 - getDatesInPrevMonth(y, m, firstDay) - getDatesInMonth(y, m);
};

export function getDatesInMonth (y: number, m: number): number {
  --m;
  return m === 1 ? isLeapYear(y) ? 29 : 28 : datesOfMonth[m];
};

export function getWeeksInMonth (y: number, m: number, firstDay?: number): number {
  var datesInMonth = getDatesInMonth(y, m) - 7 + getDatesInPrevMonth(y, m, firstDay);
  return Math.ceil(datesInMonth / 7) + 1 || 0;
};

export function getDatesInYear (y: number, m: number, d: number): number {
  let _d = 0;
  let i = 1;
  while (i < m) {
    _d = _d + (i === 2 ? isLeapYear(y) ? 29 : 28 : datesOfMonth[m - 1]);
    i++;
  }
  _d += d;
  return _d;
};

export function getWeeksInYear (y: number, m: number, d: number): number {
  let _d = getDatesInYear(y, m, d);
  return Math.round(_d / 7);
};

export function cloneDate (date: Date): Date {
  return new Date(date.getTime());
};

export function cloneAsDate (date: Date): Date {
  let _clonedDate = cloneDate(date);
  _clonedDate.setHours(0, 0, 0, 0);
  return _clonedDate;
};

export function addDays (date: Date, d: number): Date {
  const newDate = cloneDate(date);
  newDate.setDate(date.getDate() + d);
  return newDate;
};

