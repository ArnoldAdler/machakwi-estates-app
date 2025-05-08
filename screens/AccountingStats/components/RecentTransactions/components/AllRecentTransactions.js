import React from "react";
import { Dimensions, View, Text } from "react-native";
import TransactionCard from "./TransactionCard";

export default function AllRecentTransactions({
  transactions,
  navigation,
  onTranasctionViewBackPress,
}) {
  return (
    <View
      style={{
        marginBottom: 50,
      }}
    >
      {transactions.map((item, i) => {
        return (
          <View
            key={i.toString()}
            style={{
              width: "100%",
            }}
          >
            <TransactionCard
              onTranasctionViewBackPress={onTranasctionViewBackPress}
              data={item}
              navigation={navigation}
            />
          </View>
        );
      })}
    </View>
  );
}
