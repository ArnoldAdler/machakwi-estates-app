import Text from "@/components/Text";
import { modal } from "@/helperFunctions/modal";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { capitalizeFirstLetter } from "@/helperFunctions/Strings/capitalizeFirstLetter";
import { checkTimeLapse } from "@/helperFunctions/Time/checkTimeLapse";
import { toMoney } from "@/helperFunctions/Money/toMoney";
import React from "react";
import { Dimensions, View } from "react-native";
export default function TransactionCard({ data, navigation, style, color }) {
  // const { getAccountColor } = useContext(MainContext);
  const { width, height } = Dimensions.get("window");

  const getAccountColor = (idName) => {
    if (idName == "allan") return "#0088DC";
    if (idName == "arnold") return "#0FB703";
    if (idName == "ashley") return "#8E6137";
    if (idName == "dad") return "#581E83";
    if (idName == "mum") return "#F60000";
    if (idName == "shamiso") return "#E30088";
    if (idName == "stanbic_bank") return "#449692";
    if (idName == "stanbic_card") return "#9C6641";

    return "black";
  };
  const getColor = (data) => {
    return getAccountColor(data.paymentAccount || data.paymentAccountId);
  };

  const getIcon = (type) => {
    if (type == "expense") {
      return <AntDesign name="minuscircle" size={19} color="#F8917B" />;
    }
    if (type == "invoice") {
      return (
        <Ionicons
          style={{}}
          name="add-circle"
          size={25}
          color={color ? color : "#33AD7A"}
        />
      );
    }
    if (type == "money_transfer") {
      return (
        <View
          style={{
            height: 20,
            width: 20,
            borderRadius: 25,
            backgroundColor: "#348CEB",
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: 1,
          }}
        >
          <FontAwesome name="exchange" size={10} color="white" />
        </View>
      );
    }
  };

  const getData1 = (data) => {
    if (data.type == "money_transfer") {
      return `${capitalizeFirstLetter(
        data.from.idName
      )} to ${capitalizeFirstLetter(data.to.name)}`;
    }

    return data.type == "invoice"
      ? data.client?.name || "No Client"
      : data.supplier?.name || "No Supplier";
  };
  const getData4 = (data) => {
    if (data.type == "money_transfer") {
      return "";
    }
    if (data.type == "invoice") {
    }
    var lastPayment;
    return data.bankAccount || "";
  };
  //////////
  function truncateWithEllipsis(text, maxLength = 20) {
    if (text.length <= maxLength) {
      return text;
    } else {
      return `${text.slice(0, maxLength)}...`;
    }
  }
  /////
  return (
    <View
      onPress={() => {
        // if (data.type == "invoice") {
        //   navigation.navigate("invoice_form", {
        //     formType: "view",
        //     data: data,
        //     onBackPress: onTranasctionViewBackPress,
        //   });
        // }
        // if (data.type == "expense") {
        //   navigation.navigate("expense_form", {
        //     formType: "view",
        //     data: data,
        //     onBackPress: onTranasctionViewBackPress,
        //   });
        // }
        if (data.type == "moneyTransfer") {
          navigation.navigate("money_transfer_form", {
            formType: "view",
            data: data,
          });
        }
        modal.close();
      }}
      style={{
        height: 45,
        width: "100%",
        ...style,
      }}
    >
      <View
        style={{
          backgroundColor: "#F0F2F5",
          flex: 1,
          alignItems: "center",
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
          {getIcon(data.type)}
        </View>
        <View
          style={{
            flex: 1,
          }}
        >
          <Text>
            <Text
              style={{
                fontWeight: "bold",
                color: "black",
                fontSize: getData1(data).length > 15 ? 12 : 15,
              }}
            >
              {getData1(data)}
              {""}
            </Text>

            {!data.hasReciept && data.type == "expense" ? (
              <Text
                style={{
                  color: "#F8917B",
                  marginLeft: 10,
                  fontSize: 10,
                }}
              >
                No Receipt
              </Text>
            ) : (
              ""
            )}
          </Text>
          <Text
            style={{
              color: "black",
              fontSize: getData1(data).length > 18 ? 9 : 10,
            }}
          >
            {data.invoiceId || data.id} - {checkTimeLapse(data.date)} Ago
          </Text>
        </View>
        <View
          style={{
            paddingRight: 15,
            alignItems: "flex-end",
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              color: "black",
              fontSize: 16,
              marginTop: data.type == "expense" ? 0 : 15,
              color: color
                ? color
                : data.type == "expense"
                ? "#F8917B"
                : data.type == "invoice"
                ? "#33AD7A"
                : "#348CEB",
            }}
          >
            <Text
              style={{
                color: "#F8917B",
                fontSize: 10,
              }}
            >
              {data.invoiceId || data.supplier
                ? (data.documentAmount || data.amount) - data.amountPaid == 0
                  ? ""
                  : data.amountPaid != 0
                  ? `Half Paid Bal: $${
                      (data.documentAmount || data.amount) - data.amountPaid
                    }`
                  : `Not Paid`
                : null}
            </Text>{" "}
            {`$${toMoney(data.amount)}`}
          </Text>

          <Text
            style={{
              fontSize: 10,
              textAlign: "right",
            }}
          >
            <Text
              style={{
                width: 10,
                overflow: "hidden",
              }}
            >
              {data.type == "expense" ? truncateWithEllipsis(data.name) : ""}
            </Text>
          </Text>
          {/* <Text
            style={{
              fontSize: 10,
              textAlign: "right",
            }}
          >
            <Text style={{}}>
              {data.type == "invoice"
                ? `Recieved by: `
                : data.type == "expense"
                ? `Payed by: `
                : null}
            </Text>
            <Text
              fontWeight={500}
              style={{
                color: getColor(data),
              }}
            >
              {getData4(data)}
            </Text>
          </Text> */}
        </View>
      </View>
    </View>
  );
}
