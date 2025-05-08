import { MainContext } from "@/contexts/MainContext";
import React, { useContext, useEffect, useState } from "react";
import { Button, Dimensions, Text, TouchableOpacity, View } from "react-native";

import { StatsContext } from "@/contexts/StatsContext";
import { modal } from "@/helperFunctions/modal";
import { toMoney } from "@/helperFunctions/money";
import {
  format,
  getISOWeek,
  getYear,
  isSameDay,
  isSameISOWeek,
  isSameMonth,
  isSameYear,
  sub,
  subDays,
  subMonths,
  subWeeks,
  subYears,
} from "date-fns";
import BasicStatsTransactions from "./components/BasicStatsTransactions";
import { db } from "@/utils/ncodia-databases-dev";
import { openMenuModal, openModal } from "@/plugins/modal";
import StatsCardHeader from "../StatsCardHeader";
import Card from "@/components/Card";

export const isSamePeriodTransaction = (periodIdName, transaction, date) => {
  if (periodIdName == "today" && isSameDay(new Date(), date))
    return transaction;
  if (periodIdName == "yesterday" && isSameDay(subDays(new Date(), 1), date))
    return transaction;
  if (periodIdName == "this_week" && isSameISOWeek(new Date(), date))
    return transaction;
  if (
    periodIdName == "last_week" &&
    isSameISOWeek(subWeeks(new Date(), 1), date)
  )
    return transaction;
  if (periodIdName == "this_month" && isSameMonth(new Date(), date))
    return transaction;
  if (
    periodIdName == "last_month" &&
    isSameMonth(subMonths(new Date(), 1), date)
  )
    return transaction;
  ///
  ///////////////////////

  var last3monthsDate = sub(new Date(), { months: 3 });

  if (periodIdName == "last_3_months" && last3monthsDate <= date)
    return transaction;
  if (periodIdName == "this_year" && isSameYear(new Date(), date))
    return transaction;
  if (periodIdName == "last_year" && isSameYear(subYears(new Date(), 1), date))
    return transaction;

  return false;
};

export default function BasicStats({ periodIdName, navigation }) {
  //STATS MONTHLY
  var weeklyAccountingStats = db.get(
    "stats.accountingStats.weeklyStats",
    (v) => {},
    undefined,
    {
      addDocumentId: true,
      sortById: true,
    }
  );
  //STATS WEEKLY
  //STATS DAILY
  var dailyAccountingStats = db.get(
    "stats.accountingStats.dailyStats",
    (v) => {},
    undefined,
    {
      addDocumentId: true,
      sortById: true,
    }
  );
  var yearlyAccountingStats = db.get(
    "stats.accountingStats.yearlyStats",
    (v) => {},
    undefined,
    {
      addDocumentId: true,
      sortById: true,
    }
  );
  var monthlyAccountingStats = db.get(
    "stats.accountingStats.monthlyStats",
    (v) => {},
    undefined,
    {
      addDocumentId: true,
      sortById: true,
    }
  );
  //STATS YEARLY

  /////////////
  const weekNumber = getISOWeek(new Date());
  const yearWithoutCentury = getYear(new Date()) % 100;
  //
  const lastWeekNumber = getISOWeek(subWeeks(new Date(), 1));
  const lastYearWithoutCentury = getYear(subWeeks(new Date(), 1)) % 100;
  ///
  var today_stat_id = format(new Date(), "dd_MM_yy");
  var yesterday_stat_id = format(subDays(new Date(), 1), "dd_MM_yy");
  var this_week_stat_id = `week_${weekNumber}_${yearWithoutCentury}`;
  var last_week_stat_id = `week_${lastWeekNumber}_${lastYearWithoutCentury}`;
  var this_month_stat_id = format(new Date(), "MM_yy");
  var last_month_stat_id = format(subMonths(new Date(), 1), "MM_yy");
  var this_year_stat_id = format(new Date(), "yyyy");
  var last_year_stat_id = format(subYears(new Date(), 1), "yyyy");
  //////
  var getAccountingStats = (statsName, periodName, periodId) => {
    // periodName = "yearly";
    // periodId = last_year_stat_id;
    // console.log("getting", statsName, periodName, periodId);
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
        `getAccountingStats(), "${periodName}" period does not match existing timelines `
      );
    }

    if (periodName == "daily") {
      var statsObject = dailyAccountingStats.data?.find((stat) => {
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
      var statsObject = weeklyAccountingStats.data?.find((stat) => {
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
      var statsObject = monthlyAccountingStats.data?.find((stat) => {
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
      var statsObject = yearlyAccountingStats.data?.find((stat) => {
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
  //////
  var getTotal = (statName) => {
    if (periodIdName == "today")
      return getAccountingStats(statName, "daily", today_stat_id);
    if (periodIdName == "yesterday")
      return getAccountingStats(statName, "daily", yesterday_stat_id);
    if (periodIdName == "this_week")
      return getAccountingStats(statName, "weekly", this_week_stat_id);
    if (periodIdName == "last_week")
      return getAccountingStats(statName, "weekly", last_week_stat_id);
    if (periodIdName == "this_month")
      return getAccountingStats(statName, "monthly", this_month_stat_id);
    if (periodIdName == "last_month")
      return getAccountingStats(statName, "monthly", last_month_stat_id);
    if (periodIdName == "this_year")
      return getAccountingStats(statName, "yearly", this_year_stat_id);
    if (periodIdName == "last_year")
      return getAccountingStats(statName, "yearly", last_year_stat_id);
    ///
    if (periodIdName == "last_3_months") {
      var twoMonthsAgo = sub(new Date(), { months: 2 });
      var oneMonthAgo = sub(new Date(), { months: 1 });
      var thisMonth = new Date();
      ////
      var last3Months = [
        format(twoMonthsAgo, "MM_yy"),
        format(oneMonthAgo, "MM_yy"),
        format(thisMonth, "MM_yy"),
      ];
      var total = 0;
      last3Months.map((month) => {
        var stat = getAccountingStats(statName, "monthly", month);
        total = total + Number(stat);
      });
      return total;
    }
  };

  /////////
  // const getRevenueTransactions = () => {
  //   var invoices_ = [];
  //   var payments_ = [];
  //   invoices.map((invoice) => {
  //     var payments = invoice.payments;
  //     var invoiceDate = invoice.invoiceDate?.toDate() || invoice.date;
  //     /////////
  //     var isSamePeriodTransaction_ = isSamePeriodTransaction(
  //       periodIdName,
  //       invoice,
  //       invoiceDate
  //     );
  //     if (isSamePeriodTransaction_) {
  //       invoices_.push(invoice);
  //     }
  //     ///////////////////
  //     if (payments) {
  //       payments.map((payment) => {
  //         var date = payment.date?.toDate();
  //         var isSamePeriodTransaction_ = isSamePeriodTransaction(
  //           periodIdName,
  //           payment,
  //           date
  //         );
  //         if (isSamePeriodTransaction_) {
  //           payments_.push({
  //             ...invoice,
  //             ...payment,
  //             date: invoiceDate,
  //             id: invoice.invoiceId,
  //           });
  //         }
  //       });
  //     }
  //   });
  //   return { invoices: invoices_, payments: payments_ };
  // };
  // const getExpenditureTransactions = () => {
  //   var expenses_ = [];
  //   var payments_ = [];
  //   expenses.map((expense) => {
  //     var payments = expense.payments;
  //     var expenseDate = expense.date;
  //     /////////
  //     var isSamePeriodTransaction_ = isSamePeriodTransaction(
  //       periodIdName,
  //       expense,
  //       expenseDate
  //     );
  //     if (isSamePeriodTransaction_) {
  //       expenses_.push(expense);
  //     }
  //     ///////////////////
  //     if (payments) {
  //       payments.map((payment) => {
  //         var date = payment.date?.toDate();
  //         var isSamePeriodTransaction_ = isSamePeriodTransaction(
  //           periodIdName,
  //           payment,
  //           date
  //         );
  //         if (isSamePeriodTransaction_) {
  //           payments_.push({
  //             ...expense,
  //             ...payment,
  //             date: date,
  //             id: expense.id,
  //           });
  //         }
  //       });
  //     }
  //   });
  //   return { expenses: expenses_, payments: payments_ };
  // };
  ///////
  const { width, height } = Dimensions.get("window");
  const [totalInvoices, settotalInvoices] = useState(0);
  const [totalInvoicePayments, settotalInvoicePayments] = useState(0);
  const [totalExpensePayments, settotalExpensePayments] = useState(0);
  useEffect(() => {
    var totalInvoices = getTotal("totalInvoices");
    var totalInvoices = getTotal("totalInvoices");
    settotalInvoices(totalInvoices);
    ///
    var totalInvoicePayments = getTotal("totalInvoicePayments");
    settotalInvoicePayments(totalInvoicePayments);
    ///
    var totalExpensePayments = getTotal("totalExpensePayments");
    settotalExpensePayments(totalExpensePayments);
    ///
    return () => {};
  }, [periodIdName, monthlyAccountingStats.data]);
  ////

  // const getTotalExpenses = () => {
  //   var today = new Date();

  //   var expenses_local = [];
  //   /////////////////////// //
  //   if (statsPeriod.value == "today") {
  //     expenses_local = expenses.filter((item) => {
  //       var result = isSameDay(new Date(), item.date);
  //       return result;
  //     });
  //   }
  //   ///////////////////////
  //   if (statsPeriod.value == "this_week") {
  //     expenses_local = expenses.filter((item) => {
  //       var result = isSameISOWeek(new Date(), item.date);
  //       return result;
  //     });
  //   }
  //   ///////////////////////
  //   if (statsPeriod.value == "last_week") {
  //     var lastWeek = new Date(
  //       today.getFullYear(),
  //       today.getMonth(),
  //       today.getDate() - 7
  //     );

  //     expenses_local = expenses.filter((item) => {
  //       var result = isSameISOWeek(lastWeek, item.date);
  //       return result;
  //     });
  //   }
  //   ///////////////////////
  //   if (statsPeriod.value == "this_month") {
  //     expenses_local = expenses.filter((item) => {
  //       var result = isSameMonth(new Date(), item.date);
  //       return result;
  //     });
  //   }
  //   ///////////////////////
  //   if (statsPeriod.value == "last_month") {
  //     var lastWeek = new Date(
  //       today.getFullYear(),
  //       today.getMonth() - 1,
  //       today.getDate()
  //     );

  //     expenses_local = expenses.filter((item) => {
  //       var result = isSameMonth(lastWeek, item.date);
  //       return result;
  //     });
  //   }
  //   ///////////////////////
  //   if (statsPeriod.value == "last_3_months") {
  //     var date = sub(new Date(), { months: 3 });
  //     expenses.filter((item) => {
  //       if (date <= item.date) expenses_local.push(item);
  //       return;
  //     });
  //   }

  //   ///////////////////////
  //   if (statsPeriod.value == "this_year") {
  //     expenses_local = expenses.filter((item) => {
  //       var result = isSameYear(new Date(), item.date);
  //       return result;
  //     });
  //   }
  //   ///////////////////////
  //   if (statsPeriod.value == "last_year") {
  //     var date = new Date(
  //       today.getFullYear() - 1,
  //       today.getMonth(),
  //       today.getDate()
  //     );

  //     expenses_local = expenses.filter((item) => {
  //       var result = isSameYear(date, item.date);
  //       return result;
  //     });
  //   }
  //   ///////////////////////

  //   var totalexpenses = 0;
  //   expenses_local.map((item, i) => {
  //     totalexpenses = totalexpenses + Number(item.amount);
  //   });

  //   return totalexpenses;
  // };

  ///////////////////////////////////////////
  return (
    <Card>
      <StatsCardHeader title={"Grand Totals"} />
      <View style={{ paddingTop: 5 }}>
        <View>
          <View style={{}}>
            {[
              // { name: "Total Invoices", value: totalIncome, color: "#23AAF2" },
              {
                name: "Total Invoices",
                value: totalInvoices,
                // onClick: () => {
                //   openModal(
                //     <BasicStatsTransactions
                //       transactions={getRevenueTransactions().invoices}
                //       navigation={navigation}
                //       color={"#23AAF2"}
                //     />,
                //     `Invoices ${periodIdName} ($${toMoney(
                //       totalInvoices,
                //       false
                //     )})`
                //   );
                // },
                color: "#23AAF2",
              },
              {
                name: "Total Payments",
                value: totalInvoicePayments,
                // onClick: () => {
                //   openModal(
                //     <BasicStatsTransactions
                //       transactions={getRevenueTransactions().payments}
                //       navigation={navigation}
                //     />,
                //     `Payments ${periodIdName} ($${toMoney(
                //       totalInvoicePayments,
                //       false
                //     )})`
                //   );
                // },
                color: "#33AD7A",
              },
              {
                name: "Total Expenses Paid",
                value: totalExpensePayments,
                // onClick: () => {
                //   openModal(
                //     <BasicStatsTransactions
                //       transactions={getExpenditureTransactions().payments}
                //       navigation={navigation}
                //     />,
                //     `Expenses Paid ${periodIdName} ($${toMoney(
                //       totalExpensePayments,
                //       false
                //     )})`
                //   );
                // },
                color: "#F44336",
              },
            ].map((item, i) => {
              return (
                <TouchableOpacity
                  // onPress={item.onClick}
                  key={i.toString()}
                  style={{
                    height: 40,
                    backgroundColor: "#F0F2F5",

                    width: width - 80,
                    flex: 1,
                    alignItems: "center",
                    marginRight: 30,
                    marginBottom: 7,
                    borderRadius: 5,
                    flexDirection: "row",
                    paddingHorizontal: 10,
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        color: "black",
                        fontSize: 16,
                        textTransform: "uppercase",
                      }}
                    >
                      {item.name}
                    </Text>
                  </View>
                  <View
                    style={{
                      paddingRight: 15,
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        color: item.color,

                        fontSize: 16,
                      }}
                    >
                      {`$ ${toMoney(item.value, false)}`}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>
    </Card>
  );
}
