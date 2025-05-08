import { AntDesign, EvilIcons } from "@expo/vector-icons";
import React, { useContext, useState } from "react";
import {
  Alert,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import GHPSearchHelper from "@/components/GHPSearchHelper";
import TMPButton from "@/components/TMPButton";
import TMPDropDownPicker from "@/components/TMPDropDownPicker";

import GHPRadioButtons from "@/components/GHPRadioButtons";
import TMPTextInput from "@/components/TMPTextInput";
import { MainContext } from "@/contexts/MainContext";
import { primary_color } from "theme/colors";
export default function AddItem({
  items,
  setitems,
  openItemModal,
  setopenItemModal,
  setchangesMade,
}) {
  const { stocks, mainNavigation_ref } = useContext(MainContext);
  const [isJob, setisJob] = useState(false);
  const [jobType, setjobType] = useState("Sale");
  const [materials, setmaterials] = useState([]);
  const [description, setdescription] = useState("");
  const [update, setupdate] = useState(0);
  function newItem(index) {
    // 1. Make a shallow copy of the items
    if (!isJob && materials.length == 1) {
      Alert.alert(
        `You can only add one item at a time for the item type 'Sale'.`
      );
      return;
    }
    try {
      if (materials[materials.length - 1].name == "") {
        Alert.alert(`Please first fill in item number ${materials.length}`);
        return;
      }
    } catch (e) {
      console.log("ERROR", e);
    }
    let newItems = materials;
    let newItem = {};
    newItem.name = ``;
    newItem.qtyUsed = "1";
    newItem.unitOfMeasure = "";
    newItems.push(newItem);
    setmaterials(newItems);
    setupdate(Math.random());
  }
  function updateItem(value, index) {
    // 1. Make a shallow copy of the items
    let newItems = materials;
    let newItem = { ...newItems[index] };
    newItem = value;
    newItems[index] = newItem;
    setmaterials(newItems);
    setupdate(Math.random());
  }
  function updateQty(value, index) {
    let newItems = materials;
    let newItem = { ...newItems[index] };
    newItem.qtyUsed = value;
    newItems[index] = newItem;
    ///  setmaterials(newItems);
    //update item quantity also
    if (!isJob) {
      let newItems2 = items;
      let newItem2 = { ...newItems2[openItemModal.index], qty: value };
      newItems2[openItemModal.index] = newItem2;
    }
    //setitems(newItems2);
    value = (materials[index].price * value).toString();
    updatePrice(value, index);
    updateUnitOfMeasure(newItem.unitOfMeasure, index);
    setupdate(Math.random());
  }
  function updatePrice(value, index) {
    ///  setmaterials(newItems);
    //update item quantity also
    if (!isJob) {
      let newItems2 = items;
      let newItem2 = { ...newItems2[openItemModal.index], price: value };
      newItems2[openItemModal.index] = newItem2;
    }
    //setitems(newItems2);
    setupdate(Math.random());
  }
  function updateName(value, index) {
    ///  setmaterials(newItems);
    //update item quantity also
    let newItems2 = materials;
    let newItem2 = {
      ...newItems2[index],
      name: value,
    };
    newItems2[index] = newItem2;

    //setitems(newItems2);
    setupdate(Math.random());
  }
  function updateUnitOfMeasure(value, index) {
    ///  setmaterials(newItems);
    //update item quantity also
    if (!isJob) {
      let newItems2 = items;
      let newItem2 = {
        ...newItems2[openItemModal.index],
        unitOfMeasure: value,
      };
      newItems2[openItemModal.index] = newItem2;
    }
    //setitems(newItems2);
    setupdate(Math.random());
  }
  function deleteItem(index) {
    let newArray = materials.filter((item, id) => {
      return id != index;
    });
    setmaterials(newArray);
  }
  function updateNewItem(value, index) {
    let newItems = items;
    let newItem = { ...newItems[openItemModal.index] };
    newItem.description = value;
    newItems[openItemModal.index] = newItem;
    setitems(newItems);
    console.log("nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn", newItems);
    setupdate(Math.random());
  }

  const [showItemHints, setshowItemHints] = useState(false);

  function done() {
    if (isJob) {
      if (!jobType) {
        Alert.alert("Please select job type for jobs");
        return;
      }
    }
    try {
      if (!materials[0].name) {
        Alert.alert("Please enter materials used for this invoice");
        return;
      }
    } catch (e) {
      console.log("ERROR", e);
      Alert.alert("Please enter materials used for this invoice");
      return;
    }

    const descriptionLocal = {
      isJob,
      jobType,
      description:
        description != ""
          ? description
          : `${materials[0].name} ${isJob ? jobType : ""}`,
      stocks: materials,
    };

    updateNewItem(descriptionLocal, 0);

    closeModal(true);
  }
  function closeModal(noPop) {
    setopenItemModal("");
    if (!noPop) {
      if (openItemModal.title == "New Invoice Item") {
        items.pop();
      }
    }

    setmaterials([]);
    setdescription("");
    setisJob(false);
    setjobType("");
  }

  return openItemModal ? (
    <Modal style={{}}>
      <View
        style={{
          height: "100%",
          width: "100%",
          padding: 30,
          marginTop: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            {openItemModal.title}
          </Text>
          <TouchableOpacity
            onPress={closeModal}
            style={{
              //   backgroundColor: "blue",

              height: 50,
              width: 50,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AntDesign name="close" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ marginTop: 10 }}
            contentContainerStyle={{
              paddingBottom: 300,
            }}
          >
            <GHPRadioButtons
              label="Item Type"
              onChange={(v) => {
                console.log(v);
                if (v == "Job") setisJob(true);
                else {
                  setisJob(false);
                }
                setchangesMade(true);
              }}
              options={[{ label: "Sale" }, { label: "Job" }]}
            />
            <TMPDropDownPicker
              disabled={!isJob}
              size={22}
              label="Select Job type"
              data={[
                { title: "Hydraulic Hose Repair" },
                { title: "Hydraulic Cylinder Repair" },
                { title: "Pipe Flairing" },
              ]}
              onChange={(e) => {
                setjobType(e.title);
                setchangesMade(true);
              }}
            />
            <TMPTextInput
              value={description}
              onChangeText={(v) => {
                setdescription(v);
                setchangesMade(true);
              }}
              title="Custom Description"
              multiline
              height={100}
            />

            <Text style={{ fontSize: 17, marginTop: 10 }}>Materials Used</Text>
            <View style={{}}>
              <View
                style={{
                  flexDirection: "row",
                  marginBottom: 10,
                  marginTop: 10,
                  marginRight: 5,
                }}
              >
                <Text
                  style={{
                    width: "5%",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  #
                </Text>

                <Text style={{ flex: 1, fontWeight: "bold", marginLeft: 5 }}>
                  Item
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
                <Text
                  style={{
                    marginLeft: 5,
                    width: "15%",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  U/M
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
              {materials.map((item, i) => {
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
                        <TextInput
                          onFocus={() => {
                            setshowItemHints(true);
                          }}
                          onBlur={() => {
                            setTimeout(() => {
                              //   setshowItemHints(false);
                            }, 1000);
                          }}
                          value={item.name}
                          onChangeText={(v) => {
                            console.log(v, 1);
                            updateName(v, i);
                            setchangesMade(true);
                          }}
                          style={{}}
                        ></TextInput>
                      </View>

                      <GHPSearchHelper
                        show={showItemHints}
                        searchText={item.name}
                        data={stocks}
                        onPress={(v) => {
                          updateItem(v, i);
                          updateQty("1", i);
                        }}
                      />
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
                        keyboardType="numeric"
                        value={item.qtyUsed}
                        onChangeText={(v) => {
                          updateQty(v, i);
                          setchangesMade(true);
                        }}
                        style={{ textAlign: "center" }}
                      ></TextInput>
                    </View>

                    <View
                      style={{
                        height: 35,
                        justifyContent: "center",
                        width: "15%",
                      }}
                    >
                      <Text
                        style={{
                          textAlign: "center",
                        }}
                      >
                        {item.unitOfMeasure}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        deleteItem(i);
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
                      <EvilIcons name="close" size={18} color="red" />
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
            <TMPButton
              title="Add Materials"
              style={{ marginTop: 15 }}
              onPress={newItem}
              color={primary_color}
            />
            <TMPButton title="Done" style={{ marginTop: 15 }} onPress={done} />
            <TMPButton
              onPress={() => {
                console.log(materials);
              }}
              title="Ceck"
              color={primary_color}
              onClick={() => {
                console.log("log");
              }}
            >
              BTN
            </TMPButton>
          </ScrollView>
        </View>
      </View>
    </Modal>
  ) : null;
}
