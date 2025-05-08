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
  getDay,
  getMonth,
  isSameDay,
  isSameISOWeek,
  isSameMonth,
  isSameYear,
  startOfWeek,
  sub,
  subDays,
  subMonths,
} from "date-fns";
export default function IncomeGraph({ period }) {
  const { invoices, expenses } = useContext(MainContext);

  const { width, height } = Dimensions.get("window");
  const getData = (type) => {
    var transactions = type == "expenses" ? expenses : invoices;
    var today = new Date();
    var data = [];
    var invoices_local = [];
    /////////////////////////
    if (period == "today") {
      [subDays(new Date(), 1), new Date(), addDays(new Date(), 1)].map(
        (date, i) => {
          var dayTotal = 0;
          transactions.map((transaction) => {
            var is_same_day = isSameDay(date, transaction.date.toDate());

            if (is_same_day) {
              var amount =
                type == "expenses"
                  ? transaction.amount
                  : transaction.amountPaid;
              dayTotal = dayTotal + Number(amount);
            }
          });
          data.push(dayTotal);
        }
      );
    }
    ///////////////////////
    if (period == "this_week") {
      const start_of_last_week = startOfWeek(new Date(), { weekStartsOn: 1 });
      [0, 1, 2, 3, 4, 5, 6].map((item, i) => {
        var day = addDays(start_of_last_week, item);
        var dayTotal = 0;
        transactions.map((transaction) => {
          var is_same_day = isSameDay(day, transaction.date.toDate());
          if (is_same_day) {
            var amount =
              type == "expenses" ? transaction.amount : transaction.amountPaid;
            dayTotal = dayTotal + Number(amount);
          }
        });
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
        var dayTotal = 0;
        transactions.map((transaction) => {
          var is_same_day = isSameDay(day, transaction.date.toDate());
          if (is_same_day) {
            var amount =
              type == "expenses" ? transaction.amount : transaction.amountPaid;
            dayTotal = dayTotal + Number(amount);
          }
        });
        data.push(dayTotal);
      });
    }
    ///////////////////////
    if (period == "this_month") {
      var timeFrames = ["1-5", "6-10", "11-15", "16-20", "21-25", "26-31"];
      timeFrames.map((timeFrame, i) => {
        var dates = timeFrame.split("-");
        var dayTotal = 0;
        for (var i = Number(dates[0]); i < Number(dates[1]) + 1; i++) {
          var date = new Date(today.getFullYear(), today.getMonth(), i);
          transactions.map((transaction) => {
            var is_same_day = isSameDay(date, transaction.date.toDate());
            if (is_same_day) {
              var amount =
                type == "expenses"
                  ? transaction.amount
                  : transaction.amountPaid;
              dayTotal = dayTotal + Number(amount);
            }
          });
        }
        data.push(dayTotal);
      });
    }
    ///////////////////////
    if (period == "last_month") {
      var timeFrames = ["1-5", "6-10", "11-15", "16-20", "21-25", "26-31"];
      timeFrames.map((timeFrame, i) => {
        var dates = timeFrame.split("-");
        var dayTotal = 0;
        for (var i = Number(dates[0]); i < Number(dates[1]) + 1; i++) {
          var date = new Date(today.getFullYear(), today.getMonth() - 1, i);
          transactions.map((transaction) => {
            var is_same_day = isSameDay(date, transaction.date.toDate());
            if (is_same_day) {
              var amount =
                type == "expenses"
                  ? transaction.amount
                  : transaction.amountPaid;
              dayTotal = dayTotal + Number(amount);
            }
          });
        }
        data.push(dayTotal);
      });
    }
    ///////////////////////
    if (period == "last_3_months") {
      [subMonths(new Date(), 2), subMonths(new Date(), 1), new Date()].map(
        (date, i) => {
          var monthTotal = 0;
          transactions.map((transaction) => {
            var is_same_month = isSameMonth(date, transaction.date.toDate());
            if (is_same_month) {
              var amount =
                type == "expenses"
                  ? transaction.amount
                  : transaction.amountPaid;
              monthTotal = monthTotal + Number(amount);
            }
          });
          data.push(monthTotal);
        }
      );
    }

    ///////////////////////
    if (period == "this_year") {
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((month, i) => {
        var date = new Date(today.getFullYear(), month, today.getDate());
        var monthTotal = 0;
        transactions.map((transaction) => {
          var is_same_month = isSameMonth(date, transaction.date.toDate());
          if (is_same_month) {
            var amount =
              type == "expenses" ? transaction.amount : transaction.amountPaid;
            monthTotal = monthTotal + Number(amount);
          }
        });
        data.push(monthTotal);
      });
    }
    ///////////////////////
    if (period == "last_year") {
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((month, i) => {
        var date = new Date(today.getFullYear() - 1, month, today.getDate());
        var monthTotal = 0;
        transactions.map((transaction) => {
          var is_same_month = isSameMonth(date, transaction.date.toDate());
          if (is_same_month) {
            var amount =
              type == "expenses" ? transaction.amount : transaction.amountPaid;
            monthTotal = monthTotal + Number(amount);
          }
        });
        data.push(monthTotal);
      });
    }
    ///////////////////////

    var totalInvoices = 0;
    invoices_local.map((item, i) => {
      totalInvoices = totalInvoices + Number(item.amountPaid);
    });
    return [];
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
      return ["1-5", "6-10", "11-15", "16-20", "21-25", "26-31"];
    if (period == "last_month")
      return ["1-5", "6-10", "11-15", "16-20", "21-25", "26-31"];
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
    <View style={{ paddingTop: 5, overflow: "hidden" }}>
      <LineChart
        data={{
          labels: getLabels(),
          datasets: [
            {
              data: getData(expenses),
            },
            // {
            //   data: getData(expenses),
            // },
          ],
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
  );
}
