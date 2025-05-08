import {
  endOfWeek,
  isThisMonth,
  isThisWeek,
  isThisYear,
  isToday,
  isYesterday,
  startOfWeek,
  subWeeks,
} from "date-fns";

export function checkAcceptedTimeFrames(dateToCheck) {
  if (!dateToCheck) return [];
  var acceptedTimeFramesArray = ["all_time"];
  const now = new Date();

  if (isToday(dateToCheck)) {
    acceptedTimeFramesArray.push("today");
  }

  if (isYesterday(dateToCheck)) {
    acceptedTimeFramesArray.push("yesterday");
  }

  if (isThisWeek(dateToCheck, { weekStartsOn: 1 })) {
    acceptedTimeFramesArray.push("this_week");
  }

  const lastWeekStart = startOfWeek(subWeeks(now, 1), { weekStartsOn: 1 });
  const lastWeekEnd = endOfWeek(subWeeks(now, 1), { weekStartsOn: 1 });
  if (dateToCheck >= lastWeekStart && dateToCheck <= lastWeekEnd) {
    acceptedTimeFramesArray.push("last_week");
  }

  if (isThisMonth(dateToCheck)) {
    acceptedTimeFramesArray.push("this_month");
  }
  const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);
  if (dateToCheck >= lastMonthStart && dateToCheck <= lastMonthEnd) {
    acceptedTimeFramesArray.push("last_month");
  }
  const last3MonthsStart = new Date(now.getFullYear(), now.getMonth() - 2, 1);
  const last3MonthsEnd = new Date(now.getFullYear(), now.getMonth(), 0);
  if (dateToCheck >= last3MonthsStart && dateToCheck <= last3MonthsEnd) {
    acceptedTimeFramesArray.push("last_3_months");
  }

  if (isThisYear(dateToCheck)) {
    acceptedTimeFramesArray.push("this_year");
  }

  const lastYearStart = new Date(now.getFullYear() - 1, 0, 1);
  const lastYearEnd = new Date(now.getFullYear() - 1, 11, 31);
  if (dateToCheck >= lastYearStart && dateToCheck <= lastYearEnd) {
    acceptedTimeFramesArray.push("last_year");
  }

  const last5YearsStart = new Date(now.getFullYear() - 5, 0, 1);
  const last5YearsEnd = new Date(now.getFullYear() - 1, 11, 31);
  if (dateToCheck >= last5YearsStart && dateToCheck <= last5YearsEnd) {
    acceptedTimeFramesArray.push("last_5_years");
  }

  const last10YearsStart = new Date(now.getFullYear() - 10, 0, 1);
  const last10YearsEnd = new Date(now.getFullYear() - 1, 11, 31);
  if (dateToCheck >= last10YearsStart && dateToCheck <= last10YearsEnd) {
    acceptedTimeFramesArray.push("last_10_years");
  }

  const last30YearsStart = new Date(now.getFullYear() - 30, 0, 1);
  const last30YearsEnd = new Date(now.getFullYear() - 1, 11, 31);
  if (dateToCheck >= last30YearsStart && dateToCheck <= last30YearsEnd) {
    acceptedTimeFramesArray.push("last_30_years");
  }

  return acceptedTimeFramesArray;
}
