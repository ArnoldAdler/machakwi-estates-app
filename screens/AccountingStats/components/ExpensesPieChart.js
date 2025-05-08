import { MainContext } from "@/contexts/MainContext";
import {
  isSameDay,
  isSameISOWeek,
  isSameMonth,
  isSameYear,
  sub,
} from "date-fns";
import React, { useContext, useEffect, useState } from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import { PieChart } from "react-native-chart-kit";
import AllRecentTransactions from "./RecentTransactions/components/AllRecentTransactions.js";
import { isSamePeriodTransaction } from "./BasicStats/index.js.js";
import { toMoney } from "@/helperFunctions/Money/toMoney.js";
import StatsCardHeader from "./StatsCardHeader.js";
import Card from "@/components/Card.js";
import { db } from "@/utils/ncodia-databases-dev/database.js";
import { openModal } from "@/plugins/modal.js";
export default function ExpensesPieChart({ period, navigation }) {
  const { expensesCategories } = useContext(MainContext);
  //////////////////////////////////
  ///////////
  var expenses = db.get("expenses", (v) => {}, null, {
    limit: 100,
  });

  //////////////////

  const { width, height } = Dimensions.get("window");

  const getData = (category) => {
    var today = new Date();

    var expenses_local = [];
    var totalexpenses = 0;

    //////////////////
    expenses.data?.map((expense) => {
      var payments = expense.payments;
      var expenseDate = expense.date;
      /////////
      // var isSamePeriodTransaction_ = isSamePeriodTransaction(
      //   periodIdName,
      //   expense,
      //   expenseDate
      // );
      // if (isSamePeriodTransaction_) {
      //   expenses_.push(expense);
      // }
      ///////////////////
      if (payments) {
        payments.map((payment) => {
          var date = payment.date?.toDate();
          var isSamePeriodTransaction_ = isSamePeriodTransaction(
            period.value,
            payment,
            date
          );
          if (isSamePeriodTransaction_ && category == expense.category) {
            expenses_local.push({
              ...expense,
              ...payment,
              date: date,
              id: expense.id,
              type: "expense",
            });
            totalexpenses = totalexpenses + Number(payment.amount);
          }
        });
      }
    });

    return { totalexpenses, transactions: expenses_local };
  };
  const [dataLocal, setdataLocal] = useState([]);
  useEffect(() => {
    var data = expensesCategories.map((category, i) => {
      return {
        ...category,
        name: `${category.name}`,
        amount: getData(category.value).totalexpenses,
      };
    });
    setdataLocal(data);
    return () => {};
  }, [expenses.data, period]);
  return (
    <Card>
      <StatsCardHeader title={"Expenses Graph"} />
      <View style={{ overflow: "hidden" }}>
        <PieChart
          data={dataLocal}
          width={width - 80}
          height={200}
          hasLegend={false}
          chartConfig={{
            backgroundGradientFrom: "white",
            backgroundGradientTo: "white",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          accessor="amount"
          backgroundColor="transparent"
          center={[70, 0]}
        />
        <View style={{ paddingRight: 10, paddingTop: 10 }}>
          {dataLocal.map((item, i) => {
            const dot_size = 15;
            const font_color = "#7F7F7F";
            const getPercentage = () => {
              var amount = 0;
              dataLocal.map((item, i) => {
                amount = amount + item.amount;
              });

              var percentage = (item.amount / amount) * 100;

              return `${percentage.toFixed()}%`;
            };
            return (
              <TouchableOpacity
                onPress={() => {
                  console.log("TransactionCard", getData(item.value));
                  openModal(
                    <AllRecentTransactions
                      navigation={navigation}
                      transactions={getData(item.value).transactions}
                      onTranasctionViewBackPress={() => {
                        openModal(
                          <AllRecentTransactions
                            navigation={navigation}
                            transactions={getData(item.value).transactions}
                          ></AllRecentTransactions>,
                          `${item.name} Expenses : ${period.title} ($${toMoney(
                            item.amount
                          )})`
                        );
                      }}
                    ></AllRecentTransactions>,
                    `${item.name} Expenses : ${period.title} ($${toMoney(
                      item.amount
                    )})`
                  );
                }}
                key={i.toString()}
                style={{
                  flexDirection: "row",
                  marginBottom: 8,
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  style={{
                    marginHorizontal: 10,
                    height: dot_size,
                    width: dot_size,
                    borderRadius: dot_size,
                    backgroundColor: item.color,
                  }}
                ></TouchableOpacity>
                <Text style={{ width: 35, color: font_color }}>
                  {getPercentage()}
                </Text>

                <View
                  style={{
                    flex: 1,
                    color: font_color,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ marginRight: 5 }}>{item.name}</Text>
                  <View
                    style={{
                      marginRight: 5,
                      borderRadius: 2,
                      paddingVertical: 2,
                      paddingHorizontal: 5,
                      // backgroundColor: graphShowInvoices ? "#0B79FC" : "#525252",
                      backgroundColor: "#38394D",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 6,
                      }}
                    >
                      View
                    </Text>
                  </View>
                </View>

                <Text style={{ fontWeight: "bold", color: font_color }}>
                  $ {toMoney(item.amount)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </Card>
  );
}
