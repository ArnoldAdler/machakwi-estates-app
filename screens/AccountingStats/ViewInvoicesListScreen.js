import { MaterialIcons } from "@expo/vector-icons";
import pdf_blue from "Assets/images/placeholders/pdf_blue.jpg";
import TMPTextInput from "@/components/TMPTextInput";
import Text from "@/components/Text";
import Screen from "@/components/screens/Screen";
import ScreenHeader2 from "@/components/screens/ScreenHeader2";
import ScreenScrollView from "@/components/screens/ScreenScrollView";
import { MainContext } from "@/contexts/MainContext";
import { modal } from "@/helperFunctions/modal";
import { checkTimeLapse } from "plugins/time";
import React, { useContext, useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { capitalizeFirstLetter } from "../../../../../../plugins/helperFunctions";
import AccountListCard from "../../../../GHPComponents/StatsCards/TransactionCards/AccountListCard";
import ViewInvoiceInformation from "./ViewInvoiceInformation";
import { toMoney } from "@/helperFunctions/money";
export default function ViewInvoicesListScreen({ navigation }) {
  //////////

  const { invoices, mainNavigation_ref } = useContext(MainContext);

  const [invoicesLocal, setinvoicesLocal] = useState([]);

  useEffect(() => {
    setinvoicesLocal(invoices);
    return () => {};
  }, [invoices]);

  const searchText = (e) => {
    let text = e.toLowerCase();
    let data = invoices;
    let filteredName = data.filter((item) => {
      return item.client?.name.toLowerCase().match(text);
    });
    if (!text || text === "") {
      setinvoicesLocal(invoices);
    } else if (!Array.isArray(filteredName) && !filteredName.length) {
      // set no data flag to true so as to render flatlist conditionally
      // setnoDataFlag(true);
    } else if (Array.isArray(filteredName)) {
      setinvoicesLocal(filteredName);
    }
  };

  ////////////

  return (
    <Screen>
      <ScreenHeader2
        backAction={() => {
          navigation.goBack();
        }}
        title="All Invoices"
      />
      <View style={{ paddingHorizontal: 30 }}>
        <TMPTextInput
          placeholder="Search Invoice"
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

      {/* <ScreenHeading name={"Invoices List"} /> */}
      <FlatList
        data={invoicesLocal}
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
                  `Invoice Info`,
                  <ViewInvoiceInformation invoice={item} />
                );
              }}
              name={item.client.name}
              imageBorderRadius={5}
              image={pdf_blue}
              // getUserImage(invoice.assignedTo?.id)
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
                  </Text>
                  {"\n"}#{item.invoiceId} ({item.id}) , Created{" "}
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
