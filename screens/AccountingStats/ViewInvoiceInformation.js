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

export default function ViewInvoiceInformation({ invoice }) {
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

        <Row>
          <InformationView name={"Invoice #"} value={invoice.invoiceId} />
          <InformationView name={"Sale #"} value={invoice.id} />
        </Row>
        <Row>
          <InformationView
            name={"Invoice Date"}
            value={format(
              invoice.invoiceDate?.toDate() || invoice.date,
              "dd/MMM/yyyy"
            )}
          />
          <InformationView
            name={"Sale Date"}
            value={format(invoice.date, "dd/MMM/yyyy")}
          />
        </Row>

        <CardHeader name={"Client Details"} />
        <Row>
          <InformationView name={"Name"} value={invoice.client.name} />
          <InformationView
            name={"Account Id"}
            value={
              invoice.client.id == "A0000" ? "Cash Client" : invoice.client.id
            }
          />
        </Row>
        <InformationView name={"Type"} value={invoice.client.type} />

        <CardHeader name={"Invoice Items"} />
        <Table columns={columns} data={invoice.items} />
        <CardHeader name={"Invoice Totals"} />
        <Row>
          <InformationView
            name={"Invoice Total"}
            value={toMoney(invoice.amount)}
          />
          <InformationView
            name={"Paid Total"}
            value={toMoney(invoice.amountPaid)}
          />
        </Row>

        <CardHeader name={"Staff Support"} />
        <View>
          <Text
            fontWeight="500"
            style={{
              fontSize: 12,
              marginBottom: 10,
            }}
          >
            Client Attended By
          </Text>
          <AccountListCard
            name={invoice.clientAttendedBy?.name}
            small
            image={getUserImage(invoice.clientAttendedBy?.id)}
            style={{
              marginBottom: 20,
            }}
          />
        </View>
        {invoice.jobDoneBy?.id && (
          <View>
            <Text
              fontWeight="500"
              style={{
                fontSize: 12,
                marginBottom: 10,
              }}
            >
              Job Done By
            </Text>
            <AccountListCard
              name={invoice.jobDoneBy?.name}
              small
              image={getUserImage(invoice.jobDoneBy?.id)}
              style={{
                marginBottom: 20,
              }}
            />
          </View>
        )}
        <View>
          <Text
            fontWeight="500"
            style={{
              fontSize: 12,
              marginBottom: 10,
            }}
          >
            Manager On-site
          </Text>
          <AccountListCard
            name={invoice.managerOnsite?.name}
            small
            image={getUserImage(invoice.managerOnsite?.id)}
            style={{
              marginBottom: 20,
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
}
