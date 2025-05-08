import { EvilIcons } from "@expo/vector-icons";
import TMPButton from "@/components/TMPButton";
import Caption from "@/components/typography/Caption";
import { MainContext } from "@/contexts/MainContext";
import { createID } from "plugins/createRandomString";
import React, { useContext, useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { in_active, primary_color_blur } from "theme/colors";
import { modal } from "@/helperFunctions/modal";
import SelectStockItem from "./SelectStockItem";
export default function InvoiceItems({
  items,
  setitems,
  setopenItemModal,
  openItemModal,
  setamount,
  amount,
  total,
  disabled,
  type,
  invoiceNumber,
  formTypeLocal,
}) {
  const {
    stocks,
    getStockAmontsAllLocations,
    startLoadingIndicator,
    stopLoadingIndicator,
  } = useContext(MainContext);
  //////////////////////////////
  const [update, setupdate] = useState(0);

  function newItem(newItem) {
    //return
    try {
      if (items[items.length - 1].description == "") {
        Alert.alert(`Please first fill in item number ${items.length}`);
        return;
      }
    } catch (e) {
      console.log("ERROR", e);
    }
    newItems.push(newItem);
    setitems(newItems);
    setupdate(Math.random());
  }
  function updateItem(value, index) {
    // 1. Make a shallow copy of the items
    let newItems = items;
    let newItem = { ...newItems[index] };
    newItem.name = value;
    newItems[index] = newItem;
    setitems(newItems);
    // console.log("items", materials);
    setupdate(Math.random());
  }
  function updateQty(value, index) {
    let newItems = items;
    let newItem = { ...newItems[index] };
    newItem.qty = value;
    newItems[index] = newItem;
    setitems(newItems);
    setupdate(Math.random());
  }
  function updatePrice(value, index) {
    let newItems = items;
    let newItem = { ...newItems[index] };
    newItem.price = value;
    newItems[index] = newItem;
    setitems(newItems);
    setupdate(Math.random());
  }
  function deleteItem(index) {
    let newArray = items.filter((item, id) => {
      return id != index;
    });
    setitems(newArray);
  }
  return (
    <View style={{}}>
      <Caption
        style={{
          marginBottom: 6,
          color: type == "view" ? primary_color_blur : "black",
        }}
      >
        Stocks Used
      </Caption>
      <View
        style={{
          flexDirection: "row",
          marginBottom: 10,
          marginTop: 10,
          marginRight: 5,
        }}
      >
        <Text style={{ width: "5%", fontWeight: "bold", textAlign: "center" }}>
          #
        </Text>

        <Text style={{ flex: 1, fontWeight: "bold", marginLeft: 5 }}>
          Stock Item
        </Text>
        <Text
          style={{
            width: "15%",
            fontWeight: "bold",
            textAlign: "center",
            marginLeft: 5,
          }}
        >
          Qty
        </Text>
        {/*   <Text
          style={{
            width: "25%",

            fontWeight: "bold",
            textAlign: "center",
            marginLeft: 5,
          }}
        >
          Price
        </Text> */}
        {type == "view" ? null : (
          <Text
            style={{
              marginLeft: 5,
              width: "10%",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Del
          </Text>
        )}
      </View>
      {items.map((item, i) => {
        return (
          <View
            key={i.toString()}
            style={{ flexDirection: "row", marginBottom: 10 }}
          >
            <View
              style={{
                width: "5%",

                height: 35,

                justifyContent: "center",
                alignItems: "center",

                marginRight: 5,
              }}
            >
              <Text style={{}}>{i + 1}</Text>
            </View>
            <View
              style={{
                flex: 1,

                //
                justifyContent: "center",

                marginRight: 5,
              }}
            >
              <View
                style={{
                  borderWidth: type == "view" ? 0 : 1,
                  borderRadius: 3,
                  height: 35,
                  marginBottom: 5,
                  justifyContent: "center",
                  paddingHorizontal: 7,
                }}
              >
                <View
                  onPress={() => {}}
                  style={{
                    height: "100%",
                    width: "100%",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{}}>{item.description}</Text>
                </View>
              </View>
            </View>

            <View
              style={{
                width: "15%",
                borderWidth: type == "view" ? 0 : 1,

                height: 35,
                justifyContent: "center",
                paddingHorizontal: 7,
                borderRadius: 3,
                marginRight: 5,
              }}
            >
              {type == "view" || type == "edit" ? (
                <View
                  onPress={() => {}}
                  style={{
                    height: "100%",
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={{}}>{item.qty}</Text>
                </View>
              ) : (
                <TextInput
                  editable={!disabled}
                  keyboardType="numeric"
                  value={item.qty}
                  onBlur={() => {
                    if (!item.qty) updateQty("1", i);
                  }}
                  onChangeText={(v) => {
                    if (item.currentStockBalance < v) {
                      Alert.alert(
                        "Exceeded Available stocks",
                        `Cannot add stock item. You have ${item.currentStockBalance} left in stock.`
                      );
                      return;
                    }

                    updateQty(v, i);
                  }}
                  style={{ textAlign: "center" }}
                ></TextInput>
              )}
            </View>
            {/*       <View
              style={{
                width: "25%",
                borderWidth: 1,
                height: 35,
                justifyContent: "center",
                paddingHorizontal: 7,
                borderRadius: 3,
                marginRight: 5,
              }}
            >
              <TextInput
                editable={!disabled}
                keyboardType="numeric"
                value={item.price}
                onChangeText={(v) => {
                  updatePrice(v, i);
                }}
                style={{ textAlign: "center" }}
              ></TextInput>
            </View> */}
            {type != "view" ? (
              <TouchableOpacity
                disabled={disabled}
                onPress={() => {
                  if (type == "create") deleteItem(i);
                  if (type == "edit") {
                    Alert.alert(
                      "Warning",
                      `Cannot edit or delete stock items. Ask Admin to carry out stock edits and deletes.`
                    );
                    return;
                  }
                  return;
                  if (type == "edit") {
                    Alert.alert(
                      "Confirm",
                      `Are you sure you want to remove ${item.description} from Invoice. Changes will automatically be saved.`,
                      [
                        {
                          text: "Yes, remove item",
                          onPress: () => {
                            startLoadingIndicator("Removing Stock Item.");
                            var stockItem = stocks.find((stock) => {
                              return stock.code == item.code;
                            });
                            var stockToDelete = stockItem.amounts.workshop.find(
                              (stock) => {
                                return stock.trackRef == item.trackRef;
                              }
                            );

                            // firebase
                            //   .firestore()
                            //   .collection("invoices")
                            //   .doc(`INV${invoiceNumber}`)
                            //   .update({
                            //     updatedAt: new Date(),
                            //     items:
                            //       firebase.firestore.FieldValue.arrayRemove(
                            //         items[i]
                            //       ),
                            //   })
                            //   .then((v) => {
                            //     firebase
                            //       .firestore()
                            //       .collection("stocks")
                            //       .doc(item.code)
                            //       .update({
                            //         updatedAt: new Date(),
                            //         [`amounts.workshop`]:
                            //           firebase.firestore.FieldValue.arrayRemove(
                            //             stockToDelete
                            //           ),
                            //       })

                            //       .then((v) => {
                            //         deleteItem(i);
                            //         stopLoadingIndicator();
                            //       })
                            //       .catch((e) => {
                            //         handleError(e, 7899);
                            //       });
                            //   })
                            //   .catch((e) => {
                            //     handleError(e, 7899);
                            //   });
                          },
                        },
                        {
                          text: "Cancel",
                          onPress: () => {},
                          style: "cancel",
                        },
                      ]
                    );
                  }
                }}
                style={{
                  width: "10%",
                  height: 35,

                  justifyContent: "center",
                  paddingHorizontal: 7,
                  borderRadius: 3,
                  marginRight: 5,
                }}
              >
                <EvilIcons
                  name="close"
                  size={18}
                  color={disabled ? in_active : "red"}
                />
              </TouchableOpacity>
            ) : null}
          </View>
        );
      })}
      {/* <View
        style={{
          alignItems: "flex-end",
          marginRight: 60,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            height: 30,
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "bold", marginRight: 10, width: "35%" }}>
            Subtotal :
          </Text>
          <Text
            style={{
              fontWeight: "bold",
            }}
          >
            $ {total()}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            height: 30,
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "bold", marginRight: 10, width: "35%" }}>
            Invoice Total :
          </Text>
          <Text
            style={{
              fontWeight: "bold",
            }}
          >
            $ {total()}
          </Text>
        </View>
      </View> */}
      {type == "view" || type == "edit" ? null : (
        <TMPButton
          disabled={disabled}
          onPress={() => {
            // console.log(items);
            var data = stocks.map((item) => {
              var stockBalance = getStockAmontsAllLocations(item);
              console.log(stockBalance);
              return { ...item, stockBalance };
            });
            modal.openBottomModal(
              "Select Stock Item",
              <SelectStockItem
                onChange={(item) => {
                  var code = item.code;
                  var description = item.description;
                  if (item.stockBalance <= 0) {
                    Alert.alert(
                      "Warning",
                      `Cannot add stock item. ${item.description} is out of stock.`
                    );
                    return;
                  }
                  var checkIfItemAddedAlready = items.find((itemsArray) => {
                    return itemsArray.code == item.code;
                  });
                  if (checkIfItemAddedAlready) {
                    Alert.alert(
                      "Warning",
                      `${item.description} already added. Modify quantity if you wish to add more.`
                    );
                    return;
                  }
                  setitems((items) => [
                    ...items,
                    {
                      code,
                      description,
                      qty: "1",
                      trackRef: createID(),
                      currentStockBalance: item.stockBalance,
                    },
                  ]);
                  modal.close();
                }}
                stocks={data}
              ></SelectStockItem>
            );
          }}
          title="Add Stock Item"
          color={"#F7954F"}
          onClick={() => {
            console.log("log");
          }}
        ></TMPButton>
      )}
    </View>
  );
}
