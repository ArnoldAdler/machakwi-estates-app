import React, { useContext, useEffect, useState } from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";

import { MainContext } from "@/contexts/MainContext";
import { toMoney } from "@/helperFunctions/money";
import InvoicesNotPaid from "./components/InvoicesNotPaid";
import QuickViewCard from "@/components/visualizers/cards/QuickViewCard";
import {
  isSameDay,
  isSameISOWeek,
  isSameMonth,
  isSameYear,
  sub,
} from "date-fns";
import StatsCardHeader from "../StatsCardHeader";
import Card from "@/components/Card";
import { openModal } from "@/plugins/modal";
import { db } from "@/utils/ncodia-databases-dev";
export default function DebtorsAndCreditors({ navigation, period }) {
  ///////////
  var expenses = db.get("expenses", (v) => {}, null, {
    limit: 100,
  });
  var invoices = db.get("sales", (v) => {}, null, {
    limit: 100,
  });
  ////
  const [invoicesNotPaidValue, setinvoicesNotPaidValue] = useState(0);
  const [invoicesNotPaidArray, setinvoicesNotPaidArray] = useState(0);
  const [expensesNotPaidValue, setexpensesNotPaidValue] = useState(0);
  const [expensesNotPaidArray, setexpensesNotPaidArray] = useState(0);

  ///////////// / /
  const { width, height } = Dimensions.get("window");
  const getInvoicesNotPaid = () => {
    var totalNotPaidArray = [];
    var totalNotPaid = 0;
    invoices.data?.map((item, i) => {
      if (
        item.amountPaid != item.amount &&
        (item.invoiceNumber || item.invoiceId)
      ) {
        totalNotPaidArray.push({ ...item, type: "invoice" });
        totalNotPaid = totalNotPaid + Number(item.amount - item.amountPaid);
      }
    });
    return { totalNotPaidArray, totalNotPaid };
  };
  const getExpensesNotPaid = () => {
    var totalNotPaidArray = [];
    var totalNotPaid = 0;
    expenses.data?.map((item, i) => {
      if (item.amountPaid != item.amount) {
        totalNotPaidArray.push({ ...item, type: "expense" });
        totalNotPaid = totalNotPaid + Number(item.amount - item.amountPaid);
      }
    });
    return { totalNotPaidArray, totalNotPaid };
  };
  /////

  useEffect(() => {
    var invoicesNotPaid = getInvoicesNotPaid();
    var expensesNotPaid = getExpensesNotPaid();
    setinvoicesNotPaidValue(toMoney(invoicesNotPaid.totalNotPaid));
    setinvoicesNotPaidArray(invoicesNotPaid.totalNotPaidArray);
    setexpensesNotPaidValue(toMoney(expensesNotPaid.totalNotPaid));
    setexpensesNotPaidArray(expensesNotPaid.totalNotPaidArray);
  }, [invoices.data, expenses.data]);
  /////////////
  return (
    <Card>
      <StatsCardHeader title={"Debtors & Creditors"} noHeader={true} />
      <View style={{ paddingTop: 5 }}>
        <View>
          <View style={{}}>
            <QuickViewCard
              data={[
                {
                  name: "INVOICES Not Paid",
                  value: invoicesNotPaidValue,
                  onClick: () => {
                    openModal(
                      <InvoicesNotPaid
                        title="INVOICES Not Paid"
                        transactions={invoicesNotPaidArray}
                        navigation={navigation}
                      />,
                      "Invoices Not Paid"
                    );
                  },
                },
                {
                  name: "Expenses Not Paid",
                  value: expensesNotPaidValue,
                  onClick: () => {
                    openModal(
                      <InvoicesNotPaid
                        title="Expenses Not Paid"
                        transactions={expensesNotPaidArray}
                        navigation={navigation}
                      />,
                      "Expenses Not Paid"
                    );
                  },
                },
              ]}
            />
          </View>
        </View>
      </View>
    </Card>
  );
}
