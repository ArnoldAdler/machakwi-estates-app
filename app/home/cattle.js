import React, { useContext } from "react";
import { View } from "react-native";

// import { MainContext } from "@/context/MainContext";
// import TransactionCard from "../../Home/components/AccountingStats/components/RecentTransactions/components/TransactionCard";
// import { db } from "@/utils/ncodia-databases-dev";
import { MainContext } from "@/contexts/MainContext";
import { FlatList } from "react-native";
import CattleCard from "../../components/CattleCard";

export default function cattles({}) {
  //////////////////////////
  const { cattles } = useContext(MainContext);
  ///////////////////
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 20,
      }}
    >
      <FlatList
        data={cattles}
        renderItem={({ item }) => {
          return (
            <CattleCard
              data={item}
              style={{
                backgroundColor: "white",
              }}
            />
          );
        }}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 22,
          paddingBottom: 300,
        }}
      ></FlatList>
    </View>
  );
}
