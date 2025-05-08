import { View, Text } from "react-native";
import React from "react";
import TransactionCard from "../../RecentTransactions/components/TransactionCard";

export default function BasicStatsTransactions({
  transactions,
  navigation,
  color,
}) {
  return (
    <View>
      <View
        style={{
          marginBottom: 100,
        }}
      >
        {transactions?.map((item, i) => {
          return (
            <View key={i.toString()}>
              <TransactionCard
                color={color}
                data={item}
                navigation={navigation}
              />
            </View>
          );
        })}
      </View>
    </View>
  );
}
