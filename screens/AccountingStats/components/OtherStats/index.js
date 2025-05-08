import React, { useContext } from "react";
import { View } from "react-native";

import { MainContext } from "@/contexts/MainContext";
import { modal } from "@/helperFunctions/modal";
import {
  isSameDay,
  isSameISOWeek,
  isSameMonth,
  isSameYear,
  sub,
} from "date-fns";
import QuickViewCard from "@/components/visualizers/cards/QuickViewCard";
import BasicStatsTransactions from "../BasicStats/components/BasicStatsTransactions";
import MoneyTransfers from "./components/MoneyTransfers";
export default function OtherStats({ navigation, period }) {
  const { invoices, expenses, moneyTransfers, salesNotCollected } =
    useContext(MainContext);

  /////////////////////// ///////////

  const getTransfers = () => {
    //////////
    var today = new Date();
    var totaltransfers = 0;
    var transferArray = [];
    var transferAmount = 0;
    /////////////////////////

    moneyTransfers.map((transfer) => {
      // TODAY
      if (period.value == "today") {
        if (isSameDay(new Date(), transfer.date)) {
          transferArray.push(transfer);
          transferAmount++;
          return;
        }
      }
      // THIS WEEK

      if (period.value == "this_week") {
        if (isSameISOWeek(new Date(), transfer.date)) {
          transferArray.push(transfer);
          transferAmount++;
          return;
        }
      }
      // LAST WEEK

      if (period.value == "last_week") {
        var lastWeek = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() - 7
        );
        if (isSameISOWeek(lastWeek, transfer.date)) {
          transferArray.push(transfer);
          transferAmount++;
          return;
        }
      }
      // THIS MONTH

      if (period.value == "this_month") {
        if (isSameMonth(new Date(), transfer.date)) {
          transferArray.push(transfer);
          transferAmount++;
          return;
        }
      }
      // LAST MONTH
      if (period.value == "last_month") {
        var lastMonth = new Date(
          today.getFullYear(),
          today.getMonth() - 1,
          today.getDate()
        );
        if (isSameMonth(lastMonth, transfer.date)) {
          transferArray.push(transfer);
          transferAmount++;
          return;
        }
      }
      // LAST 3 MONTHS
      if (period.value == "last_3_months") {
        var lastThreeMonth = sub(new Date(), { months: 3 });
        if (lastThreeMonth <= transfer.date) {
          transferArray.push(transfer);
          transferAmount++;
          return;
        }
      }
      // THIS YEAR
      if (period.value == "this_year") {
        if (isSameYear(new Date(), transfer.date)) {
          transferArray.push(transfer);
          transferAmount++;
          return;
        }
      }
      // LAST YEAR
      if (period.value == "last_year") {
        var lastYearDate = new Date(
          today.getFullYear() - 1,
          today.getMonth(),
          today.getDate()
        );
        if (isSameYear(lastYearDate, transfer.date)) {
          transferArray.push(transfer);
          transferAmount++;
          return;
        }
      }
    });

    ///////////////////////

    return { transferArray, transferAmount };
  };
  const getJobsWaitingForCollection = () => {
    var array = [];
    var amount = 0;

    return { array, amount };
  };
  return (
    <View style={{ paddingTop: 5 }}>
      <View>
        <View style={{}}>
          <QuickViewCard
            data={[
              {
                name: "Money Transfers",
                value: getTransfers().transferAmount,
                onClick: () => {
                  modal.openBottomModal(
                    "Expenses Not Paid",
                    <MoneyTransfers
                      title={`Money Transfers ${period}`}
                      transactions={getTransfers().transferArray}
                      navigation={navigation}
                    />
                  );
                },
              },
              {
                name: "Jobs Waiting For Collection",
                value: salesNotCollected.length,
                onClick: () => {
                  modal.openBottomModal(
                    "Jobs Waiting For Collection",
                    <BasicStatsTransactions
                      transactions={salesNotCollected}
                      navigation={navigation}
                      // color={"#23AAF2"}
                    />
                  );
                },
              },
            ]}
          />
        </View>
      </View>
    </View>
  );
}
