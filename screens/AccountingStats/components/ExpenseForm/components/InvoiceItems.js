import { EvilIcons } from "@expo/vector-icons";
import TMPButton from "@/components/TMPButton";
import React, { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { in_active, primary_color } from "theme/colors";

export default function InvoiceItems({
  items,
  setitems,
  setopenItemModal,
  openItemModal,
  setinvoiceTotal,
  invoiceTotal,
  total,
  disabled,
  setchangesMade,
}) {
  const [update, setupdate] = useState(0);

  function newItem(index) {
    //return
    try {
      if (items[items.length - 1].description == "") {
        Alert.alert(`Please first fill in item number ${items.length}`);
        return;
      }
    } catch (e) {
      console.log("ERROR", e);
    }

    let newItems = items;
    let newItem = {};
    newItem.description = ``;
    newItem.qty = "1";
    newItem.unitOfMeasure = "";
    newItems.push(newItem);
    setitems(newItems);
    setupdate(Math.random());
    setopenItemModal({
      title: "New Invoice Item",
      isJob: false,
      jobType: "",
      description: "",
      stocks: [],
      index: index ? index : items.length - 1,
    });
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

        <Text style={{ flex: 1, fontWeight: "bold", marginLeft: 5 }}>Item</Text>
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
        <Text
          style={{
            width: "25%",

            fontWeight: "bold",
            textAlign: "center",
            marginLeft: 5,
          }}
        >
          Price
        </Text>

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
                  borderWidth: 1,
                  borderRadius: 3,
                  height: 35,
                  marginBottom: 5,
                  justifyContent: "center",
                  paddingHorizontal: 7,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setopenItemModal({
                      title: "Edit Invoice Item",
                      isJob: false,
                      jobType: "",
                      description: "",
                      stocks: [],
                      index: i,
                    });
                  }}
                  style={{
                    height: "100%",
                    width: "100%",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{}}>{item.description.description}</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                width: "15%",
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
                value={item.qty}
                onChangeText={(v) => {
                  updateQty(v, i);
                  setchangesMade(true);
                }}
                style={{ textAlign: "center" }}
              ></TextInput>
            </View>
            <View
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
                  setchangesMade(true);
                }}
                style={{ textAlign: "center" }}
              ></TextInput>
            </View>

            <TouchableOpacity
              disabled={disabled}
              onPress={() => {
                deleteItem(i);
                setchangesMade(true);
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
          </View>
        );
      })}
      <View style={{}}>
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
      </View>
      <TMPButton
        onPress={() => {
          console.log(items);
        }}
        title="Ceck"
        color={primary_color}
        onClick={() => {
          console.log("log");
        }}
      ></TMPButton>
      <TMPButton
        disabled={disabled}
        onPress={() => {
          newItem();
        }}
        title="Add Item"
        color={primary_color}
        onClick={() => {
          console.log("log");
        }}
      >
        BTN
      </TMPButton>
    </View>
  );
}
