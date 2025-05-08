import Table from "@/components/Table";
import Text from "@/components/Text";
import { MainContext } from "@/contexts/MainContext";
import { format, isSameDay, subDays } from "date-fns";
import { truncate } from "@/helperFunctions/Strings/truncate";
import React, { useContext } from "react";
export default function MoneyTransfers({ navigation, transactions }) {
  // var route = { params: { formType: "create" } };
  const { getAccountTextColor } = useContext(MainContext);
  const {
    moneyTransfers,
    startLoadingIndicator,
    stopLoadingIndicator,
    handleError,
    notificationsSettings,
    stocks,
    expenses,
    invoices,
    bankAccounts,
    getAccountBalance,
  } = useContext(MainContext);
  //////////////////////////////////////////////////do LLL yyyy
  const columns = [
    {
      Header: "Date",
      accessor: "date",
      Cell: ({ value }) => {
        if (isSameDay(new Date(), value))
          return `${format(new Date(), "do")} - Today`;
        if (isSameDay(subDays(new Date(), 1), value))
          return `${format(subDays(new Date(), 1), "do")} - Yesterday`;
        return format(value, "do LLL yy'");
      },
    },
    {
      Header: "Description",
      accessor: "description",
      Cell: ({ value }) => {
        return (
          <Text
            style={{
              fontSize: value.length > 18 ? 7 : 10,
            }}
          >
            {value ? value : "Transfer"}
          </Text>
        );
      },
    },
    {
      Header: "From",
      accessor: "from",
      Cell: ({ value }) => {
        return (
          <Text
            style={{
              fontSize: value.name.length > 10 ? 7 : 10,
              color: value?.textColor,
            }}
          >
            {truncate(value.name, 40)}
          </Text>
        );
      },
    },
    {
      Header: "To",
      accessor: "to",
      Cell: ({ value }) => {
        return (
          <Text
            style={{
              color: value?.textColor,
              fontSize: value.name.length > 18 ? 7 : 10,
            }}
          >
            {truncate(value.name, 40)}
          </Text>
        );
      },
    },
    {
      Header: "Amount",
      accessor: "amount",
      Cell: ({ value }) => {
        return `$ ${value}`;
      },
    },
    // {
    //   Header: "Amount",
    //   accessor: "amount",
    //   Cell: ({ value }, i) => {
    //     return (
    //       <TouchableOpacity key={i.toString()}>
    //         <Text
    //           style={{
    //             paddingHorizontal: 5,
    //             paddingVertical: 2,
    //             backgroundColor: primary_color,
    //             fontSize: 10,
    //             borderRadius: 5,
    //             color: "white",
    //           }}
    //         >
    //           Actions
    //         </Text>
    //       </TouchableOpacity>
    //     );
    //   },
    // },
  ];

  return <Table columns={columns} data={transactions} />;
}
