import Text from "@/components/Text";
import CardHeader from "@/components/cards/CardHeader";
import InformationView from "@/components/forms/InformationView";
import Row from "@/components/layout/Row";
import { format } from "date-fns";
import React from "react";
import { ScrollView, View } from "react-native";
import { getUserImage } from "../../../employees/ViewEmployeesStatsScreen";
import AccountListCard from "../../../../GHPComponents/StatsCards/TransactionCards/AccountListCard";
import Table from "@/components/Table";
import { toMoney } from "@/helperFunctions/money";

export default function ViewExpenseInformation({ expense }) {
  const columns = [
    {
      Header: "Description",
      accessor: "description",
      width: "50%",
      // Cell: ({ value }) => {
      //   return (
      //     <Text
      //       style={{
      //         fontSize: value.length > 18 ? 7 : 10,
      //       }}
      //     >
      //       {value ? value : "Transfer"}
      //     </Text>
      //   );
      // },
    },
    {
      Header: "Qty",
      accessor: "qty",
      width: "10%",
    },
    {
      Header: "Price",
      accessor: "price",
      Cell: ({ value }) => {
        return toMoney(value);
      },
      width: "20%",
    },
    {
      Header: "Total",
      accessor: "total",
      width: "20%",
      Cell: ({ data }) => {
        return toMoney(data.qty * data.price);
      },
    },
  ];

  return (
    <ScrollView>
      <View>
        <CardHeader name={"Basic Info"} />
        <InformationView name={"Name"} value={expense.name} />

        <Row>
          <InformationView name={"Expense #"} value={expense.id} />
          <InformationView
            name={"Expense Date"}
            value={format(expense.date, "dd/MMM/yyyy")}
          />
        </Row>

        <CardHeader name={"Supplier Details"} />
        <Row>
          <InformationView name={"Name"} value={expense.supplier.name} />
          <InformationView
            name={"Account Id"}
            value={
              expense.supplier.id == "S0000"
                ? "Cash Supplier"
                : expense.supplier.id
            }
          />
        </Row>
        <InformationView name={"Type"} value={expense.supplier.type} />

        {expense.items && (
          <>
            <CardHeader name={"Expense Items"} />
            <Table columns={columns} data={expense.items} />
          </>
        )}
        <CardHeader name={"Expense Totals"} />
        <Row>
          <InformationView
            name={"Expense Total"}
            value={toMoney(expense.amount)}
          />
          <InformationView
            name={"Paid Total"}
            value={toMoney(expense.amountPaid)}
          />
        </Row>
      </View>
    </ScrollView>
  );
}
