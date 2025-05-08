import React, { useContext } from "react";
import BankAccounts from "./components/BankAccounts.js";
import { ScrollView, View } from "react-native";
import BasicStats from "./components/BasicStats/index.js";
import ExpensesPieChart from "./components/ExpensesPieChart.js";
import IncomeGraph from "./components/IncomeGraph.js";
import RecentTransactions from "./components/RecentTransactions/index.js";
import AppLoadingIndicator from "@/components/AppLoadingIndicator.js";
import ScreenHeading from "@/components/ScreenHeading.js";
import { StatsContext } from "@/contexts/StatsContext.js";
import DebtorsAndCreditors from "./components/DebtorsAndCreditors/index.js";
export default function AccountngStats({ navigation }) {
  const { transactions, statsPeriod } = useContext(StatsContext);
  ////////////////////////////////////////////////////
  return (
    <View style={{}}>
      {/* <AppLoadingIndicator /> */}
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 280,
          paddingHorizontal: 30,
        }}
      >
        <ScreenHeading title="Financial Overview" underline />
        <RecentTransactions
          navigation={navigation}
          transactions={transactions}
        />
        <BankAccounts navigation={navigation} />
        <BasicStats navigation={navigation} periodIdName={statsPeriod.value} />
        <ScreenHeading title="Graphical Overview" />
        <IncomeGraph period={statsPeriod.value} />
        {/* <ExpensesPieChart period={statsPeriod} navigation={navigation} /> */}
        <ScreenHeading title="Other Stats" />
        <DebtorsAndCreditors navigation={navigation} period={statsPeriod} />
      </ScrollView>
    </View>
  );
}
