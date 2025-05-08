import React, { useState, useContext, useRef, useEffect } from "react";
import {
  View,
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
import Text from "@/components/Text";
import { MainContext } from "@/contexts/MainContext";
import StatsCardHeader from "./StatsCardHeader";
import Card from "@/components/Card";
import { db } from "@/utils/ncodia-databases-dev";
import { openModal } from "@/plugins/modal";
import ViewAccount from "@/screens/AccountingStats/components/ViewAccount";
import { toMoney } from "@/helperFunctions/money";
export default function BankAccounts({ navigation }) {
  const { bankAccounts, getAccountBalance, oneUsdToRtgsRate, setbankAccounts } =
    useContext(MainContext);

  const { width, height } = Dimensions.get("window");
  ////
  const getTotalBankAccountsBalance = () => {
    var total = 0;
    bankAccounts.map((acc) => {
      var balance = acc.balance || 0;
      total = total + Number(balance);
    });
    return total;
  };
  //////////
  db.get(
    "bankAccounts",
    (v) => {
      setbankAccounts(v);
    },
    undefined,
    {
      addDocumentId: true,
      sortById: true,
    }
  );
  /////////
  return (
    <>
      <Card>
        <StatsCardHeader title={"Cash Accounts"} noHeader />
        <View style={{ paddingTop: 5 }}>
          <View>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ height: 47 * bankAccounts.length }}
            >
              {bankAccounts
                .sort((a, b) => {
                  if (a.name < b.name) {
                    return -1;
                  }
                  if (a.name > b.name) {
                    return 1;
                  }
                  return 0;
                })
                .map((item, i) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        // navigation.navigate("view_account", {
                        //   id: item.idName,
                        //   isRtgs: item.isRtgs,
                        // });
                        openModal(
                          <ViewAccount id={item.idName} isRtgs={item.isRtgs} />,
                          `${item.name} Statement \n(Bal : ${toMoney(
                            item.balance
                          )})`
                        );
                      }}
                      key={i.toString()}
                      style={{
                        height: 40,
                        backgroundColor: item.color || "#F0F2F5",
                        width: width - 80,
                        flex: 1,
                        alignItems: "center",
                        marginRight: 30,
                        marginBottom: 7,
                        borderRadius: 5,
                        flexDirection: "row",
                        paddingHorizontal: 10,
                      }}
                    >
                      <View
                        style={{
                          flex: 1,
                        }}
                      >
                        <Text
                          numberOfLines={1}
                          style={{
                            color: "white",
                            fontSize: 16,
                            textTransform: "uppercase",
                          }}
                        >
                          {item.name}
                        </Text>
                      </View>
                      <View
                        style={{
                          paddingRight: 15,
                        }}
                      >
                        <Text
                          fontWeight="600"
                          style={{
                            color: "white",
                            fontSize: 16,
                            textAlign: "right",
                          }}
                        >
                          {toMoney(item.balance || 0)}
                          {item.isRtgs
                            ? ((
                                <Text
                                  style={{
                                    fontSize: 11,
                                  }}
                                >
                                  {`\nRTGS ${toMoney(
                                    (
                                      getAccountBalance(item.idName) *
                                      oneUsdToRtgsRate
                                    ).toFixed(2)
                                  )}`}
                                </Text>
                              ),
                              false)
                            : ``}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              {/* <Text
            fontWeight="600"
            style={{
              fontWeight: "600",
            }}
          >
            <Text>RATE -></Text> $1.00 = RTGS {oneUsdToRtgsRate}
          </Text> */}
            </ScrollView>
          </View>
        </View>
      </Card>
      {/* BANK ACCOUNTS TOTAL */}
      <View style={{ paddingTop: 10 }}>
        <View
          // onPress={() => navigation.navigate("view_account", item.id)}
          style={{
            backgroundColor: "rgba(46, 54, 44, 0.57)",
            width: width - 60,
            flex: 1,
            alignItems: "center",
            justifyContent: "space-between",
            marginRight: 30,
            borderRadius: 5,
            flexDirection: "row",
            paddingVertical: 10,
            paddingHorizontal: 20,
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              color: "white",
              fontSize: 20,
              width: "60%",
            }}
          >
            Total Cash
          </Text>
          <Text
            style={{
              fontWeight: "bold",
              color: "white",
              fontSize: 20,
            }}
          >
            {toMoney(getTotalBankAccountsBalance())}
          </Text>
        </View>
      </View>
      <View
        style={{
          backgroundColor: "rgba(0,0,0,0.2)",
          height: 2,
          width: "100%",
          marginTop: 20,
          marginBottom: 5,
        }}
      ></View>
    </>
  );
}
