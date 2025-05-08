import {
  endOfWeek,
  isLastMonth,
  isLastYear,
  isThisMonth,
  isThisWeek,
  isThisYear,
  isToday,
  isYesterday,
  startOfWeek,
  subWeeks,
} from "date-fns";

export function checkDateCategory(dateToCheck) {
  const now = new Date();

  if (isToday(dateToCheck)) {
    return "today";
  }

  if (isYesterday(dateToCheck)) {
    return "yesterday";
  }

  if (isThisWeek(dateToCheck, { weekStartsOn: 1 })) {
    // Assuming week starts on Monday (common in many parts of the world)
    return "this_week";
  }

  const lastWeekStart = startOfWeek(subWeeks(now, 1), { weekStartsOn: 1 });
  const lastWeekEnd = endOfWeek(subWeeks(now, 1), { weekStartsOn: 1 });
  if (dateToCheck >= lastWeekStart && dateToCheck <= lastWeekEnd) {
    return "last_week";
  }

  if (isThisMonth(dateToCheck)) {
    return "this_month";
  }

  if (isLastMonth(dateToCheck)) {
    return "last_month";
  }

  if (isThisYear(dateToCheck)) {
    return "this_year";
  }

  if (isLastYear(dateToCheck)) {
    return "last_year";
  }

  return "allTime";
}
