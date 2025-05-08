import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import collar_img from "Assets/images/hose_collar.jpg";
import hose_img from "Assets/images/hydraulic_hose.jpg";
import img from "Assets/images/placeholders/stock_item_plc.jpg";
import TMPTextInput from "@/components/TMPTextInput";
import { toMoney } from "plugins/valueConvetors";

export default function SelectStockItem({ navigation, stocks, onChange }) {
  // const { stocks, mainNavigation_ref } = useContext(MainContext);
  const [stocksLocal, setstocksLocal] = useState([]);
  const icon_color = "white";
  const { width, height } = Dimensions.get("window");

  const icon_size = 30;

  useEffect(() => {
    var data = stocks.map((item) => {
      var stockBalance = getStockAmontsAllLocations(item);
      console.log(stockBalance);
      // CHANGE NAME TO BALANCE
      return { ...item, stockBalance };
    });
    setstocksLocal(data);

    return () => {};
  }, []);
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
    let data = stocks;
    let filteredName = data.filter((item) => {
      return item.name.toLowerCase().match(text);
    });
    if (!text || text === "") {
      setstocksLocal(stocks);
    } else if (!Array.isArray(filteredName) && !filteredName.length) {
      // set no data flag to true so as to render flatlist conditionally
      // setnoDataFlag(true);
    } else if (Array.isArray(filteredName)) {
      setstocksLocal(filteredName);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
        }}
      >
        <View style={{ paddingTop: 10, marginBottom: 15 }}>
          <TMPTextInput
            placeholder="Search"
            label="Search"
            leftIcon={<MaterialIcons name="search" size={24} color="black" />}
            onChangeText={(value) => searchText(value)}
          />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingVertical: 0,
          }}
        >
          <View style={{}}>
            {stocksLocal.map((item, i) => {
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
                  }}
                >
                  <View
                    style={{
                      width: 50,
                      height: 50,
                      marginRight: 1,
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 5,
                    }}
                  >
                    <Image
                      style={{
                        width: "100%",
                        height: "100%",
                        resizeMode: "contain",
                      }}
                      source={
                        item.category == "hydraulic_hose"
                          ? hose_img
                          : item.category == "hose_collars"
                          ? collar_img
                          : img
                      }
                    ></Image>
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
                      {item.code}
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
                        color: "black",
                        fontSize: 16,
                      }}
                    >
                      {item.stockBalance}
                      {item.category == "hydraulic_hose"
                        ? "m"
                        : item.category == "hose_collars"
                        ? ""
                        : "ea"}
                    </Text>

                    <Text
                      style={{
                        fontSize: 12,
                        color: "#33AD7A",
                        textAlign: "right",
                      }}
                    >
                      {`$${toMoney(item.price)}`}
                    </Text>
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
