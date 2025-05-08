import { MainContext } from "@/contexts/MainContext";
import React, { useContext, useEffect, useState } from "react";
import { Dimensions, ScrollView, TouchableOpacity, View } from "react-native";
import TransactionCard from "./components/TransactionCard";
import { db } from "@/utils/ncodia-databases-dev";
import { StatsContext } from "@/contexts/StatsContext";
import Card from "@/components/Card";
import AllRecentTransactions from "./components/AllRecentTransactions";
import StatsCardHeader from "../StatsCardHeader";
import { openModal } from "@/plugins/modal";
export default function RecentTransactions({ navigation }) {
  const { width, height } = Dimensions.get("window");
  const { transactions, settransactions } = useContext(StatsContext);
  ///////////
  //////////////
  const [pendingJobs, setpendingJobs] = useState([]);
  const [invoices, setinvoices] = useState([]);
  const [payments, setpayments] = useState([]);
  const [expenses, setexpenses] = useState([]);

  ///////////
  db.get(
    "sales",
    (v) => {
      var payments = [];
      var invoices = [];
      var pendingJobs = [];
      v.map((invoice) => {
        if (invoice.invoiceNumber)
          invoices.push({ ...invoice, type: "invoice" });
        else pendingJobs.push({ ...invoice, type: "job" });
        invoice.payments?.map((payment) => {
          if (payment.amount)
            payments.push({
              ...payment,
              date: payment.date.toDate(),
              client: invoice.client,
              invoiceId: invoice.invoiceId || invoice.invoiceNumber,
              saleId: invoice.id,
              invoiceAmount: invoice.amount,
              type: "payment",
            });
        });
      });
      setpendingJobs(pendingJobs);
      setinvoices(invoices);
      setpayments(payments);
    },
    null,
    {
      sortBy: "updatedAt",
      limit: 40,
    }
  );
  db.get(
    "expenses",
    (v) => {
      //     ////
      //     var expensePayments = [];
      //     expenses.slice(0, 50).map((expense) => {
      //       expense.payments?.map((payment) => {
      //         expensePayments.push({
      //           ...expense,
      //           ...payment,
      //           date: payment.date?.toDate() || expense.date,
      //           id: expense.id,
      //           documentAmount: expense.amount,
      //         });
      //       });
      //     });
      //     ////
      setexpenses(v);
    },
    null,
    {
      limit: 40,
    }
  );
  useEffect(() => {
    var transactions = []; /////
    transactions = [
      // ...payments,
      ...invoices,
      // ...pendingJobs,
      ...expenses.map((item) => {
        return { ...item, type: "expense" };
      }),
    ];
    transactions = transactions.sort((a, b) => {
      if (a.date && b.date) {
        return new Date(b.date) - new Date(a.date);
      } else if (a.createdAt && b.createdAt) {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else {
        return 0;
      }
    });
    settransactions(transactions);
  }, [payments, invoices, pendingJobs, expenses]);

  //////////
  return (
    <Card>
      <TouchableOpacity
        onPress={() => {
          // console.log("TransactionCard", transactions);

          openModal(
            <AllRecentTransactions
              navigation={navigation}
              transactions={transactions.slice(0, 50)}
            ></AllRecentTransactions>,
            "Recent Transactions"
          );
        }}
        style={{}}
      >
        <StatsCardHeader title="Recent Transactions" noHeader />

        <View style={{ height: 145, paddingTop: 5 }}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{}}
          >
            <View style={{}}>
              {transactions.slice(0, 3).map((item, i) => {
                return (
                  <View key={i.toString()}>
                    <TransactionCard data={item} navigation={navigation} />
                  </View>
                );
              })}
            </View>
          </ScrollView>
        </View>
      </TouchableOpacity>
    </Card>
  );
}
