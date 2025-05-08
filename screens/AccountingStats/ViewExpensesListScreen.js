import { MaterialIcons } from "@expo/vector-icons";
import pdf_blue from "Assets/images/placeholders/pdf_blue.jpg";
import TMPTextInput from "@/components/TMPTextInput";
import Text from "@/components/Text";
import Screen from "@/components/screens/Screen";
import ScreenHeader2 from "@/components/screens/ScreenHeader2";
import { MainContext } from "@/contexts/MainContext";
import { modal } from "@/helperFunctions/modal";
import { toMoney } from "@/helperFunctions/money";
import { checkTimeLapse } from "plugins/time";
import React, { useContext, useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import AccountListCard from "../../../../GHPComponents/StatsCards/TransactionCards/AccountListCard";
import ViewExpenseInformation from "./ViewExpenseInformation";
export default function ViewExpensesListScreen({ navigation }) {
  //////////

  const { expenses, mainNavigation_ref } = useContext(MainContext);

  const [expensesLocal, setexpensesLocal] = useState([]);

  useEffect(() => {
    setexpensesLocal(expenses);
    return () => {};
  }, [expenses]);

  const searchText = (e) => {
    let text = e.toLowerCase();
    let data = expenses;
    let filteredName = data.filter((item) => {
      return item.supplier?.name.toLowerCase().match(text);
    });
    if (!text || text === "") {
      setexpensesLocal(expenses);
    } else if (!Array.isArray(filteredName) && !filteredName.length) {
      // set no data flag to true so as to render flatlist conditionally
      // setnoDataFlag(true);
    } else if (Array.isArray(filteredName)) {
      setexpensesLocal(filteredName);
    }
  };

  ////////////

  return (
    <Screen>
      <ScreenHeader2
        backAction={() => {
          navigation.goBack();
        }}
        title="All Expenses"
      />
      <View style={{ paddingHorizontal: 30 }}>
        <TMPTextInput
          placeholder="Search Expense"
          noLabel
          icon={<MaterialIcons name="search" size={24} color="black" />}
          onChangeText={(value) => searchText(value)}
          style={{
            marginBottom: 15,
          }}
        />
        <View
          style={{
            backgroundColor: "rgba(0,0,0,0.2)",
            height: 1,
            width: "100%",
            marginBottom: 18,
          }}
        ></View>
      </View>

      {/* <ScreenHeading name={"Expenses List"} /> */}
      <FlatList
        data={expensesLocal}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          marginHorizontal: 30,
        }}
        renderItem={({ item }) => {
          return (
            <AccountListCard
              onClick={() => {
                modal.openBottomModal(
                  `Expense Info`,
                  <ViewExpenseInformation expense={item} />
                );
              }}
              name={`${item.supplier.name} - ${item.name}`}
              imageBorderRadius={5}
              image={pdf_blue}
              subText={
                <Text
                  style={{
                    color: "black",
                  }}
                >
                  <Text
                    fontWeight="600"
                    style={{
                      fontSize: 16,
                      // width: "50%",
                    }}
                  >
                    {toMoney(item.amount)}
                  </Text>
                  {"   /   "}
                  <Text
                    fontWeight="600"
                    style={{
                      fontSize: 10,
                    }}
                  >
                    {item.amount - item.amountPaid == 0 ? (
                      <Text
                        style={{
                          color: "green",
                        }}
                      >
                        Paid
                      </Text>
                    ) : item.amountPaid != 0 ? (
                      <Text
                        style={{
                          color: "#DE9E00",
                        }}
                      >
                        {`Half Paid Bal: $${item.amount - item.amountPaid}`}
                      </Text>
                    ) : (
                      <Text
                        style={{
                          color: "red",
                        }}
                      >
                        Not Paid
                      </Text>
                    )}
                    <Text
                      style={{
                        color: "red",
                      }}
                    >
                      {!item.hasReciept && "  (No Reciept)"}
                    </Text>
                  </Text>
                  {"\n"}#{item.expenseId} ({item.id}) , Created{" "}
                  {`${checkTimeLapse(item.createdAt)} ago`}
                </Text>
              }
            />
          );
        }}
      />
    </Screen>
  );
}
