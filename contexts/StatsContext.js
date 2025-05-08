import React, { createContext, useState } from "react";
export const StatsContext = createContext();

const StatsContextProvider = (props) => {
  ////
  const [dailyAccountingStats, setdailyAccountingStats] = useState([]);
  const [weeklyAccountingStats, setweeklyAccountingStats] = useState([]);
  const [monthlyAccountingStats, setmonthlyAccountingStats] = useState([]);
  const [yearlyAccountingStats, setyearlyAccountingStats] = useState([]);
  ///

  ////
  var getAccountingStats = (statsName, periodName, periodId) => {
    if (!statsName) {
      alert("getAccountingStats() missing statsName param");
    }
    if (!periodName) {
      alert("getAccountingStats() missing periodName param");
    }
    if (!periodId) {
      alert("getAccountingStats() missing periodId param");
    }
    if (
      periodName !== "daily" &&
      periodName !== "weekly" &&
      periodName !== "monthly" &&
      periodName !== "yearly" &&
      periodName !== "allTime"
    ) {
      alert(
        `getAccountingStats(), "${periodName}" period does not match existing timelines`
      );
    }

    if (periodName == "daily") {
      var statsObject = dailyAccountingStats?.find((stat) => {
        return stat.id == periodId;
      });
      if (statsObject) {
        var stat = statsObject[statsName];
        if (stat) return stat;
        else return 0;
      }
      return 0;
    }
    if (periodName == "weekly") {
      var statsObject = weeklyAccountingStats?.find((stat) => {
        return stat.id == periodId;
      });
      if (statsObject) {
        var stat = statsObject[statsName];
        if (stat) return stat;
        else return 0;
      }
      return 0;
    }
    if (periodName == "monthly") {
      var statsObject = monthlyAccountingStats?.find((stat) => {
        return stat.id == periodId;
      });
      if (statsObject) {
        var stat = statsObject[statsName];
        if (stat) return stat;
        else return 0;
      }
      return 0;
    }
    if (periodName == "yearly") {
      var statsObject = yearlyAccountingStats?.find((stat) => {
        return stat.id == periodId;
      });
      if (statsObject) {
        var stat = statsObject[statsName];
        if (stat) return stat;
        else return 0;
      }
      return 0;
    }
  };
  // /
  const [transactions, settransactions] = useState([]);
  const [statsPeriod, setstatsPeriod] = useState({
    // value: "this_week",
    // title: "This Week",
    // name: "This Week",
    value: "this_month",
    id: "this_month",
    title: "This Month",
    name: "This Month",
  });
  return (
    <StatsContext.Provider
      value={{
        //Accounting Stats
        dailyAccountingStats,
        setdailyAccountingStats,
        weeklyAccountingStats,
        setweeklyAccountingStats,
        monthlyAccountingStats,
        setmonthlyAccountingStats,
        yearlyAccountingStats,
        setyearlyAccountingStats,
        getAccountingStats,
        ///
        transactions,
        settransactions,
        statsPeriod,
        setstatsPeriod,
      }}
    >
      {props.children}
    </StatsContext.Provider>
  );
};

export default StatsContextProvider;
