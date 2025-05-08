export const checkTimeLapse = (v) => {
  function mydiff(date1, date2, interval) {
    var second = 1000,
      minute = second * 60,
      hour = minute * 60,
      day = hour * 24,
      week = day * 7;
    date1 = new Date(date1);
    date2 = new Date(date2);
    var timediff = date2 - date1;
    if (isNaN(timediff)) return NaN;
    switch (interval) {
      case "years":
        return date2.getFullYear() - date1.getFullYear();
      case "months":
        return (
          date2.getFullYear() * 12 +
          date2.getMonth() -
          (date1.getFullYear() * 12 + date1.getMonth())
        );
      case "weeks":
        return Math.floor(timediff / week);
      case "days":
        return Math.floor(timediff / day);
      case "hours":
        return Math.floor(timediff / hour);
      case "minutes":
        return Math.floor(timediff / minute);
      case "seconds":
        return Math.floor(timediff / second);
      default:
        return undefined;
    }
  }
  try {
    var seconds = mydiff(v, new Date(), "seconds");
    var minutes = mydiff(v, new Date(), "minutes");
    var hours = mydiff(v, new Date(), "hours");
    var days = mydiff(v, new Date(), "days");
    var weeks = mydiff(v, new Date(), "weeks");
    var months = mydiff(v, new Date(), "months");
    var years = mydiff(v, new Date(), "years");

    if (seconds < 60) {
      return `${seconds} sec${seconds === 1 ? "" : "s"}`;
    }
    if (minutes < 60) {
      return `${minutes} min${minutes === 1 ? "" : "s"}`;
    }
    if (hours < 24) {
      return `${hours} hr${hours === 1 ? "" : "'s"}`;
    }
    if (days < 7) {
      return `${days} day${days === 1 ? "" : "'s"}`;
    }
    if (weeks < 4) {
      return `${weeks} week${weeks === 1 ? "" : "'s"}`;
    }

    if (months < 12) {
      return `${months} month${months === 1 ? "" : "'s"}`;
    }

    if (years) {
      return `${years} year${years === 1 ? "" : "'s"}`;
    }

    return "";
  } catch (e) {
    return "";
  }
};
