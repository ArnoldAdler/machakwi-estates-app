import Text from "@/components/Text";
import { toMoney } from "@/helperFunctions/Money/toMoney";
import { checkTimeLapse } from "@/helperFunctions/Time/checkTimeLapse";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import React from "react";
import { Dimensions, TouchableOpacity, View } from "react-native";
export default function InvoicesNotPaid({ transactions, navigation }) {
  const { width, height } = Dimensions.get("window");
  return (
    <View
      style={{
        marginBottom: 50,
        // paddingHorizontal: 10,
        paddingTop: 10,
      }}
    >
      {transactions.map((item, i) => {
        return (
          <TouchableOpacity
            onPress={() => {
              // console.log(item);
              // navigation.navigate("invoice_form", {
              //   formType: "view",
              //   data: data,
              // });
            }}
            key={i.toString()}
            style={{
              height: 40,
              backgroundColor: "#F0F2F5",
              width: width - 60,
              flex: 1,
              alignItems: "center",
              marginRight: 30,
              marginBottom: 7,
              borderRadius: 5,
              flexDirection: "row",
            }}
          >
            <View
              style={{
                width: 50,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {item.type == "invoice" ? (
                <Ionicons
                  style={{}}
                  name="add-circle"
                  size={25}
                  color="#33AD7A"
                />
              ) : (
                <AntDesign name="minuscircle" size={19} color="#F8917B" />
              )}
            </View>
            <View
              style={{
                flex: 1,
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  color: "black",
                  fontSize:
                    (item.type == "invoice"
                      ? item.client?.name
                      : item.supplier?.name
                    )?.length > 18
                      ? 12
                      : 16,
                }}
              >
                {item.type == "invoice"
                  ? item.client?.name
                  : item.supplier?.name}
              </Text>
              <Text
                style={{
                  color: "black",
                  fontSize: 10,
                }}
              >
                {item.id} - {checkTimeLapse(item.date)} Ago
              </Text>
            </View>
            <View
              style={{
                paddingRight: 15,
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  color: "#F8917B",
                  fontSize: 16,
                }}
              >
                Bal : {`$${toMoney(item.amount - item.amountPaid)}`}
              </Text>
              <Text
                style={{
                  fontSize: 9,
                  textAlign: "right",
                }}
              >
                Total :{" "}
                <Text fontWeight={600}>{`$${toMoney(item.amount)}`}</Text> Paid:{" "}
                <Text
                  fontWeight={600}
                  style={{ color: item.amountPaid > 0 ? "#33AD7A" : "black" }}
                >{`$${toMoney(item.amountPaid)}`}</Text>
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
