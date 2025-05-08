import Table from "@/components/Table";
// import Header from "@/components/Header";
import Text from "@/components/Text";
import { MainContext } from "@/contexts/MainContext";
import React, { useContext, useState } from "react";
import { View } from "react-native";
import { bg_color_primary, danger_color, primary_color } from "@/config/theme";
import { toMoney } from "@/helperFunctions/money";
import { capitalizeFirstLetter } from "@/helperFunctions/Strings/capitalizeFirstLetter";
import { format } from "date-fns";
import { db } from "@/utils/ncodia-databases-dev";
//
export default function ViewAccount({ id, isRtgs }) {
  //////
  const [oneUsdToRtgsRate, setoneUsdToRtgsRate] = useState(850);
  ///////

  const [accBal, setaccBal] = useState(0);

  // const id = route.params.id;
  // const isRtgs = route.params.isRtgs;
  //////////////////////////////////////////////////
  var bankAccounts = db.get(`bankAccounts`);
  /////////////////////////////////////////////////////////////
  var bankAccount =
    bankAccounts?.data?.find((item) => {
      return item.idName == id;
    }) || {};

  //////////////////////////////////////////// ////// ////////////
  // function getAccountTransactions() {
  //   var bankAccount = bankAccounts.find((item) => {
  //     return item.idName == id;
  //   });

  //   var invoicesLocal = invoices.filter((item) => {
  //     return item.paymentAccount === id || item.paymentAccountId === id;
  //   });
  //   var expensesLocal = expenses.filter((item) => {
  //     return item.paymentAccount === id || item.paymentAccountId === id;
  //   });
  //   var moneyTransfersOutFiltered = moneyTransfers.filter((item) => {
  //     return item.from.idName === id;
  //   });
  //   var moneyTransfersInFiltered = moneyTransfers.filter((item) => {
  //     return item.to.idName === id;
  //   });
  //   var moneyTransfersOut = moneyTransfersOutFiltered.map((item) => {
  //     return {
  //       ...item,
  //       type: "money_transfer_out",
  //     };
  //   });
  //   var moneyTransfersIn = moneyTransfersInFiltered.map((item) => {
  //     return {
  //       ...item,
  //       type: "money_transfer_in",
  //     };
  //   });

  //   var all_Transactions = [
  //     ...invoicesLocal,
  //     ...expensesLocal,
  //     ...moneyTransfersOut,
  //     ...moneyTransfersIn,
  //   ];

  //   // sort all transactions based on date
  //   const sorted_transactions = all_Transactions.sort(function (a, b) {
  //     var dateA = formatFirebaseDate(a.date);
  //     var dateB = formatFirebaseDate(b.date);
  //     var aa = dateA.split("/").reverse().join();
  //     var bb = dateB.split("/").reverse().join();
  //     return aa < bb ? -1 : aa > bb ? 1 : 0;
  //   });

  //   var openingBalance = bankAccount.openingBalance
  //     ? Number(bankAccount.openingBalance)
  //     : 0;
  //   // add line totals for statemnts
  //   var lineTotal = openingBalance;

  //   var AllTransactions = [
  //     {
  //       type: "opening_balance",
  //       amount: openingBalance,
  //       id: "Balance BF",
  //     },
  //     ...sorted_transactions,
  //   ].map((item, i) => {
  //     var type = item.type;
  //     var amount = Number(item.amount);
  //     var amountPaid = Number(item.amountPaid);

  //     if (!type) {
  //       alert("A record is missing type. Contact developer.");
  //     }

  //     if (type == "invoice") {
  //       lineTotal = lineTotal + amountPaid;
  //     }
  //     if (type == "expense") {
  //       lineTotal = lineTotal - amount;
  //     }
  //     if (type == "money_transfer_in") {
  //       lineTotal = lineTotal + amount;
  //     }
  //     if (type == "money_transfer_out") {
  //       lineTotal = lineTotal - amount;
  //     }
  //     if (type == "credit") {
  //       lineTotal = lineTotal - amount;
  //     }

  //     return { ...item, lineTotal };
  //   });

  //   return AllTransactions.reverse();

  //   /*    settransactions(AllTransactions);
  //   var totalInvoices = 0;
  //   var totalexpenses = 0;

  //   invoices.map((item, i) => {
  //     totalInvoices = totalInvoices + Number(item.amount);
  //     return;
  //   });
  //   expenses.map((item, i) => {
  //     totalexpenses = totalexpenses + Number(item.amount);
  //     return;
  //   });

  //   var accBalanceLocal = (totalInvoices - totalexpenses).toFixed(2); */
  // }
  //////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////
  var amountsWidth = `7%`;
  var amountsFontSize = 8;
  const columns = [
    {
      Header: "Ref #",
      accessor: "id",
      fontSize: 9,
      Cell: (v, index) => {
        var type = v.cell.row.original.type;

        if (type == "invoice") {
          return <Text style={{ color: primary_color }}>{v.value}</Text>;
        }
        if (type == "expense") {
          return <Text style={{ color: danger_color }}>{v.value}</Text>;
        }
        if (type == "money_transfer_in" || type == "money_transfer_out") {
          return <Text style={{ color: "green" }}>{v.value}</Text>;
        }
        return <Text style={{ color: "black" }}>{v.value}</Text>;
      },
    },
    {
      Header: "Date",
      accessor: "date",
      fontSize: 8,
      Cell: ({ value }) => {
        return format(value.toDate(), "d MMM yyyy");
      },
    },
    {
      Header: "Description",
      accessor: "description",
      width: 50,
      Cell: ({ value, data }) => {
        return (
          <Text
            style={{
              fontSize: 7,
            }}
          >
            {`${
              data.supplierName || data.clientName
                ? `${data.supplierName || data.clientName} - `
                : ""
            }`}
            {value}
          </Text>
        );
      },
    },
    {
      Header: "IN",
      accessor: "amount", //
      width: amountsWidth,
      Cell: (v) => {
        var type = v.cell.row.original.type;
        if (type == "invoice_payment" || type == "money_transfer_in") {
          return (
            <Text style={{ color: primary_color, fontSize: amountsFontSize }}>
              {`${toMoney(Number(v.value))}`}
              {isRtgs && (
                <Text
                  style={{
                    fontSize: 4,
                  }}
                >
                  {"\nRTGS"} {toMoney((v.value * oneUsdToRtgsRate).toFixed(2))}
                </Text>
              )}
            </Text>
          );
        } else {
          return "";
        }
      },
    },
    {
      Header: "OUT",
      accessor: "amount",
      width: amountsWidth,
      Cell: (v) => {
        var type = v.cell.row.original.type;
        if (type == "expense_payment" || type == "money_transfer_out") {
          return (
            <Text style={{ color: danger_color, fontSize: amountsFontSize }}>
              {`${toMoney(Number(v.value))}`}
              {isRtgs && (
                <Text
                  style={{
                    fontSize: 4,
                  }}
                >
                  {"\nRTGS"} {toMoney((v.value * oneUsdToRtgsRate).toFixed(2))}
                </Text>
              )}
            </Text>
          );
        } else {
          return "";
        }
      },
    },
    {
      Header: "Balance",
      accessor: "newBalance",
      width: amountsWidth,
      Cell: ({ value }, index) => {
        return (
          <Text
            fontWeight={index == 0 ? 600 : 400}
            style={{ fontSize: amountsFontSize }}
          >
            {`${toMoney(Number(value).toFixed(2))}`}
            {isRtgs && (
              <Text
                style={{
                  fontSize: 4,
                }}
              >
                {"\nRTGS"} {toMoney((value * oneUsdToRtgsRate).toFixed(2))}
              </Text>
            )}
          </Text>
        );
      },
    },
  ];
  return (
    <View style={{ flex: 1 }}>
      {/* <Header
        backAction={() => {
          navigation.goBack();
        }}
        title={"Acc Statement"}
        menuOptions={[]}
      /> */}
      {/* <View
        style={{
          height: 100,
          width: "100%",
          backgroundColor: "#78D6AF",
          alignItems: "center",
          justifyContent: "center",
          bordertopWidth: 1,
          borderTopColor: "black",
          paddingTop: 10,
        }}
      >
        <Text
          style={{
            fontWeight: "normal",
            color: bg_color_primary,
            fontSize: 15,
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          {/* {capitalizeFirstLetter(id)}'s Account Balance 
        </Text>

        <Text
          fontWeight={300}
          style={{
            fontWeight: "normal",
            color: bg_color_primary,
            fontSize: 50,
            textAlign: "center",
          }}
          numberOfLines={1}
        >
          {toMoney(bankAccount?.balance)}
        </Text>
        {bankAccount?.balance < 0 ? (
          <Text
            style={{
              marginTop: -10,
              marginBottom: 10,
              fontSize: 25,
              color: "white",
            }}
          >
            (Credit)
          </Text>
        ) : null}
      </View> */}

      <View
        style={{
          height: "65%",
          width: "100%",
          paddingBottom: 10,
          paddingHorizontal: 0,
        }}
      >
        <Table
          columns={columns}
          data={[...bankAccount?.transactionsHistory].reverse()}
        />
      </View>
    </View>
  );
}
