import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import TMPButton from "@/components/TMPButton";
import TMPTextInput from "@/components/TMPTextInput";
import { secondary_color } from "theme/colors";

export default function SelectClient({
  navigation,
  clients,
  onChange,
  closeModal,
  value,
}) {
  const [clientsLocal, setclientsLocal] = useState([]);
  const icon_color = "white";
  const { width, height } = Dimensions.get("window");

  const icon_size = 30;

  useEffect(() => {
    /*  var data = clients.map((item) => {
      var stockBalance = getStockAmontsAllLocations(item);
      console.log(stockBalance);
      return { ...item, stockBalance };
    }); */
    console.log("value", value);
    setclientsLocal(clients);
    searchText(value);
    return () => {};
  }, [value]);
  /////////////////////////////////////
  function getStockAmontsAllLocations(stockItem) {
    var amounts_warehouse = stockItem.amounts.warehouse;
    var amounts_workshop = stockItem.amounts.workshop;

    var all_locations = amounts_warehouse.concat(amounts_workshop);
    var all_locations_without_transfers = all_locations.filter((item, i) => {
      return item.type != "transfer";
    });

    const sortedAmounts = all_locations_without_transfers.sort(function (a, b) {
      return a.date - b.date;
    });
    var balance = 0;
    var allAmounts = sortedAmounts.map((item, i) => {
      balance = balance + Number(item.amount);

      return { ...item, balance };
    });
    return balance;
    //  setstockAmountsAllLocations(allAmounts);
    //  setallLocationsBal(balance);
  }

  ////////////////////////////////////
  const searchText = (e) => {
    let text = e.toLowerCase();
    let data = clients;
    let filteredName = data.filter((item) => {
      return item.name.toLowerCase().match(text);
    });
    if (!text || text === "") {
      setclientsLocal(clients);
    } else if (!Array.isArray(filteredName) && !filteredName.length) {
      // set no data flag to true so as to render flatlist conditionally
      // setnoDataFlag(true);
    } else if (Array.isArray(filteredName)) {
      setclientsLocal(filteredName);
    }
  };
  const [clientName, setclientName] = useState("");
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            paddingTop: 10,
            marginBottom: 15,
          }}
        >
          <TMPTextInput
            value={value}
            placeholder="Client Name"
            label="Search Client"
            leftIcon={<MaterialIcons name="search" size={24} color="black" />}
            onChangeText={(value) => {
              onChange(value);
              searchText(value);
            }}
            style={{
              marginBottom: 10,
            }}
          />
          <TMPButton
            small
            disabled={
              clientName.length > 3 && clientsLocal.length == 0 ? false : true
            }
            title="Use Unregistered Customer"
            onPress={() => {
              if (onChange) {
                onChange(clientName);
                //closeModal();
              }
            }}
          />
          <TMPButton
            small
            color={secondary_color}
            title="Register New Customer"
            onPress={() => {
              closeModal();
              navigation.navigate("clients", {
                redirect: "clientform",
              });
            }}
          />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingVertical: 0,
          }}
        >
          <View style={{}}>
            {clientsLocal.map((item, i) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    if (onChange) onChange(item);
                  }}
                  key={i.toString()}
                  style={{
                    height: 50,
                    backgroundColor: "#F1F3F4",

                    width: width - 60,
                    flex: 1,
                    alignItems: "center",
                    marginRight: 30,
                    marginBottom: 10,
                    borderRadius: 5,
                    flexDirection: "row",
                    paddingHorizontal: 15,
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        color: "black",
                        fontSize: 16,
                      }}
                    >
                      {item.name}
                    </Text>
                    <Text
                      style={{
                        color: "black",
                        fontSize: 12,
                      }}
                    >
                      {item.type}
                    </Text>
                  </View>
                  <View style={{}}>
                    <Text
                      style={{
                        fontWeight: "bold",
                        color: "black",
                        fontSize: 16,
                      }}
                    ></Text>

                    <Text
                      style={{
                        fontSize: 12,
                        color: "#33AD7A",
                        textAlign: "right",
                      }}
                    ></Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
