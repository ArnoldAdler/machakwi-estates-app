import React, { useState, useContext, useRef, useEffect } from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  TextInput,
  Animated,
  StyleSheet,
  ActivityIndicator,
  Alert,
  ScrollView,
  FlatList,
  Image,
  BackgroundImage,
  Dimensions,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { MainContext } from "@/contexts/MainContext";
import {
  addDays,
  format,
  getDay,
  getISOWeek,
  getMonth,
  getYear,
  isSameDay,
  isSameISOWeek,
  isSameMonth,
  isSameYear,
  startOfWeek,
  sub,
  subDays,
  subMonths,
  subWeeks,
  subYears,
} from "date-fns";
import Card from "@/components/Card";
import StatsCardHeader from "./StatsCardHeader";
import { db } from "@/utils/ncodia-databases-dev";
import { supabaseDB } from "@/utils/ncodia-databases-dev/database";

export default function IncomeGraph({ period }) {
  //////////////////////////////////

  ///////////

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
  ///////////////
  ////////
  const weekNumber = getISOWeek(new Date());
  const yearWithoutCentury = getYear(new Date()) % 100;
  //
  const lastWeekNumber = getISOWeek(subWeeks(new Date(), 1));
  const lastYearWithoutCentury = getYear(subWeeks(new Date(), 1)) % 100;
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
  // var getTotal = (statName) => {
  //   if (periodIdName == "today")
  //     return getAccountingStats(statName, "daily", today_stat_id);
  //   if (periodIdName == "yesterday")
  //     return getAccountingStats(statName, "daily", yesterday_stat_id);
  //   if (periodIdName == "this_week")
  //     return getAccountingStats(statName, "weekly", this_week_stat_id);
  //   if (periodIdName == "last_week")
  //     return getAccountingStats(statName, "weekly", last_week_stat_id);
  //   if (periodIdName == "this_month")
  //     return getAccountingStats(statName, "monthly", this_month_stat_id);
  //   if (periodIdName == "last_month")
  //     return getAccountingStats(statName, "monthly", last_month_stat_id);
  //   if (periodIdName == "this_year")
  //     return getAccountingStats(statName, "yearly", this_year_stat_id);
  //   if (periodIdName == "last_year")
  //     return getAccountingStats(statName, "yearly", last_year_stat_id);
  // };
  /////////////////
  const [datasets, setdatasets] = useState([
    {
      data: [0, 0, 0, 0, 0, 0, 0],
      strokeWidth: 2,
      color: (opacity = 1) => `rgba(11, 91, 219, 1)`,
    },
  ]);
  const [graphShowInvoices, setgraphShowInvoices] = useState(true);
  const [graphShowExpenses, setgraphShowExpenses] = useState(true);

  //////////////////////////////////
  useEffect(() => {
    const invoiceDataSet = {
      data: getData("invoices"),
      strokeWidth: 2,
      color: (opacity = 1) => `rgba(11, 91, 219, 1)`,
    };
    const expenseDataSet = {
      data: getData("expenses"),
      strokeWidth: 2,
      color: () => "rgba(219, 49, 11, 0.3)", // optional
      strokeDashOffset: 5,
    };
    if (graphShowExpenses && graphShowInvoices) {
      setdatasets([invoiceDataSet, expenseDataSet]);
      return;
    }
    ///View Triggers
    if (graphShowExpenses) {
      setdatasets([expenseDataSet]);
      return;
    }
    if (graphShowInvoices) {
      setdatasets([invoiceDataSet]);
      return;
    }
    return () => {};
  }, [
    graphShowExpenses,
    graphShowInvoices,
    period,
    monthlyAccountingStats.data,
  ]);
  //////////////////////////////////
  const { width, height } = Dimensions.get("window");
  const getData = (type) => {
    var statId = type == "expenses" ? "totalExpenses" : "totalInvoices";

    var today = new Date();
    var data = [];
    /////////////////////////
    if (period == "yesterday") {
      var yesterday_stat_id = format(subDays(new Date(), 1), "dd_MM_yy");
      var two_days_ago_stat_id = format(subDays(new Date(), 2), "dd_MM_yy");
      var today_stat_id = format(new Date(), "dd_MM_yy");

      var twoDaysAgo = getAccountingStats(
        statId,
        "daily",
        two_days_ago_stat_id
      );
      var yesterday = getAccountingStats(statId, "daily", yesterday_stat_id);
      var today = getAccountingStats("totalExpenses", "daily", today_stat_id);
      ///
      data = [twoDaysAgo, yesterday, today];
    }
    if (period == "today") {
      var yesterday_stat_id = format(subDays(new Date(), 1), "dd_MM_yy");
      var today_stat_id = format(new Date(), "dd_MM_yy");
      var tomorrow_stat_id = format(addDays(new Date(), 1), "dd_MM_yy");
      var yesterday = getAccountingStats(statId, "daily", yesterday_stat_id);
      var today = getAccountingStats("totalExpenses", "daily", today_stat_id);
      var tomorrow = getAccountingStats(
        statId,

        "daily",
        tomorrow_stat_id
      );
      ///
      data = [yesterday, today, tomorrow];
    }
    ///////////////////////
    if (period == "this_week") {
      const start_of_last_week = startOfWeek(new Date(), { weekStartsOn: 1 });
      [0, 1, 2, 3, 4, 5, 6].map((item, i) => {
        var day = addDays(start_of_last_week, item);
        var dayId = format(day, "dd_MM_yy");
        ////
        var dayTotal = getAccountingStats(statId, "daily", dayId);
        data.push(dayTotal);
      });
    }
    ///////////////////////
    if (period == "last_week") {
      var lastWeek = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - 7
      );
      const start_of_last_week = startOfWeek(lastWeek, { weekStartsOn: 1 });
      [0, 1, 2, 3, 4, 5, 6].map((item, i) => {
        var day = addDays(start_of_last_week, item);
        var dayId = format(day, "dd_MM_yy");
        ////
        var dayTotal = getAccountingStats(statId, "daily", dayId);
        data.push(dayTotal);
      });
    }
    ///////////////////////
    if (period == "this_month") {
      var timeFrames = ["1-5", "6-12", "13-19", "20-25", "26-31"];
      ///
      timeFrames.map((timeFrame, i) => {
        var dates = timeFrame.split("-");
        var dayTotal = 0;

        for (var i = Number(dates[0]); i < Number(dates[1]) + 1; i++) {
          var date = new Date(today.getFullYear(), today.getMonth(), i);
          var dayId = format(date, "dd_MM_yy");
          ////
          var amount = getAccountingStats(statId, "daily", dayId);
          dayTotal = dayTotal + Number(amount);
          ////
        }
        data.push(dayTotal);
      });
    }
    ///////////////////////
    if (period == "last_month") {
      var timeFrames = ["1-5", "6-12", "13-19", "20-25", "26-31"];
      timeFrames.map((timeFrame, i) => {
        var dates = timeFrame.split("-");
        var dayTotal = 0;
        for (var i = Number(dates[0]); i < Number(dates[1]) + 1; i++) {
          var date = new Date(today.getFullYear(), today.getMonth() - 1, i);
          var dayId = format(date, "dd_MM_yy");
          ////
          var amount = getAccountingStats(statId, "daily", dayId);
          dayTotal = dayTotal + Number(amount);
          ////
        }
        data.push(dayTotal);
      });
    }
    ///////////////////////
    if (period == "last_3_months") {
      [subMonths(new Date(), 2), subMonths(new Date(), 1), new Date()].map(
        (date, i) => {
          var monthId = format(date, "MM_yy");
          var monthTotal = getAccountingStats(statId, "monthly", monthId);
          data.push(monthTotal);
        }
      );
    }
    ///////////////////////
    if (period == "this_year") {
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((month, i) => {
        var date = new Date(today.getFullYear(), month, today.getDate());

        var monthId = format(date, "MM_yy");
        var monthTotal = getAccountingStats(statId, "monthly", monthId);
        data.push(monthTotal);
      });
    }
    ///////////////////////
    if (period == "last_year") {
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((month, i) => {
        var date = new Date(today.getFullYear() - 1, month, today.getDate());
        var monthId = format(date, "MM_yy");
        var monthTotal = getAccountingStats(statId, "monthly", monthId);

        data.push(monthTotal);
      });
    }
    ///////////////////////

    // var totalInvoices = 0;
    // invoices_local.map((item, i) => {
    //   totalInvoices = totalInvoices + Number(item.amount);
    // });
    return data;
  };
  //////////////////////////////////
  const getLabels = () => {
    var days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    var months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    if (period == "yesterday")
      return [
        days[getDay(subDays(new Date(), 2))],
        days[getDay(subDays(new Date(), 1))],
        days[getDay(new Date())],
      ];
    if (period == "today")
      return [
        days[getDay(subDays(new Date(), 1))],
        days[getDay(new Date())],
        days[getDay(addDays(new Date(), 1))],
      ];

    if (period == "this_week")
      return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    if (period == "last_week")
      return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    if (period == "this_month")
      return ["1-5", "6-12", "13-19", "20-25", "26-31"];
    if (period == "last_month")
      return ["1-5", "6-12", "13-19", "20-25", "26-31"];
    if (period == "last_3_months")
      return [
        months[getMonth(subMonths(new Date(), 2))],
        months[getMonth(subMonths(new Date(), 1))],
        months[getMonth(new Date())],
      ];
    if (period == "this_year")
      return ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
    if (period == "last_year")
      return ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
    return [];
  };
  return (
    <Card>
      <StatsCardHeader
        title={
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setgraphShowInvoices(!graphShowInvoices);
              }}
              style={{
                marginRight: 5,
                borderRadius: 5,
                paddingVertical: 2,
                paddingHorizontal: 5,
                backgroundColor: graphShowInvoices ? "#0B79FC" : "#525252",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  color: graphShowInvoices ? "white" : "rgba(255,255,255, 0.7)",
                  fontSize: graphShowInvoices ? 13 : 8,
                }}
              >
                Invoices
              </Text>
            </TouchableOpacity>
            <Text style={{ marginRight: 5, fontWeight: "bold" }}>/</Text>
            <TouchableOpacity
              onPress={() => {
                setgraphShowExpenses(!graphShowExpenses);
              }}
              style={{
                marginRight: 5,
                borderRadius: 5,
                paddingVertical: 2,
                paddingHorizontal: 5,
                backgroundColor: graphShowExpenses ? "#D65454" : "#525252",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  color: graphShowExpenses ? "white" : "rgba(255,255,255, 0.7)",
                  fontSize: graphShowExpenses ? 13 : 8,
                }}
              >
                Expenses
              </Text>
            </TouchableOpacity>
            <View style={{}}>
              <Text style={{ fontWeight: "bold" }}>Graph</Text>
            </View>
          </View>
        }
      />

      <View style={{ paddingTop: 5, overflow: "hidden" }}>
        <LineChart
          data={{
            labels: getLabels(),
            datasets: datasets,
          }}
          fromZero
          width={width - 80} // from react-native
          height={220}
          chartConfig={{
            backgroundGradientFrom: "white",
            backgroundGradientTo: "white",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          bezier /* ={period == "today" ? true : false} */
          style={{
            right: 5,
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>
    </Card>
  );
}
