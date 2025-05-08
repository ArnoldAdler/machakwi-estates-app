import React, { useContext, useEffect, useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import {
  Entypo,
  AntDesign,
  EvilIcons,
  Feather,
  FontAwesome,
  FontAwesome5,
  Fontisto,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
  SimpleLineIcons,
  Zocial,
} from "@expo/vector-icons";
// import Header from "@/components/Header";
import TMPButton from "@/components/TMPButton";
import { MainContext } from "@/contexts/MainContext";
import { sendLiveNotification } from "plugins/expoPushNotifications";
import { db, storage } from "plugins/firebase";
import { verifyData } from "plugins/validation";
import { danger_color } from "theme/colors";
import FormFields from "@/components/FormFields";
import { toMoney } from "plugins/valueConvetors";
import { capitalizeFirstLetter } from "plugins/helperFunctions";
export default function MoneyTransferForm({ navigation }) {
  var route = { params: { formType: "create" } };
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
  //////////////////////////////////////////////////
  const [headerTitle, setheaderTitle] = useState("");
  const [id, setid] = useState("");
  const [formType, setformType] = useState(route.params.formType);
  /////////////////////////////////////////////////
  const [moneyTransferNumber, setmoneyTransferNumber] = useState();
  const [from, setfrom] = useState({ name: "", value: "" });
  const [to, setto] = useState({ name: "", value: "" });
  const [amount, setamount] = useState("");
  const [date, setdate] = useState(new Date());
  const [description, setdescription] = useState("");
  const [bankAccountsLocal, setbankAccountsLocal] = useState([]);
  ///////////////////////////////////////////////
  const inputType = formType == "view" ? "view" : null;
  //////////////////////////////////////////////
  /////////////////////////////////////////////////
  useEffect(() => {
    console.log("Global->", formType);

    if (formType == "create") {
      setheaderTitle("New Money Transfer");

      try {
        const newID = String(
          parseInt(moneyTransfers[0].id.substring(3)) + 1
        ).padStart(4, "0");
        setmoneyTransferNumber(newID);
      } catch (error) {
        console.log("INVOICE CREATE ERROR", error);
        setmoneyTransferNumber("0000");
      }
    }

    if (formType == "view") {
      var moneyTransferLocal = route.params.data;
      setheaderTitle(`View ${moneyTransferLocal.id}`);
      Object.keys(moneyTransfer).map((key, index) => {
        if (key == "date") {
          setdate(moneyTransferLocal.date);
          return;
        }
        eval(`set${key}(moneyTransferLocal.${key})`);
      });
      setmoneyTransferNumber(moneyTransferLocal.id.substring(3));
    }

    return () => {};
  }, [moneyTransfers, route.params]);
  useEffect(() => {
    var accountsLocal = bankAccounts.map((item) => {
      var accountBalance = getAccountBalance(item.idName);
      var name = `${item.name} : $${toMoney(accountBalance)}`;
      var value = item.idName;
      return { ...item, name, value, accountBalance };
    });
    setbankAccountsLocal(accountsLocal);
    ///////

    return () => {};
  }, [bankAccounts]);

  var getAmountDisabled = () => {
    if (to == from) return true;
    return false;
  };

  const formFields = [
    {
      name: "Ref #",
      value: `TRF${moneyTransferNumber}`,
      type: "view",
      disabled: formType == "edit" ? true : false,
    },
    {
      name: "Date",
      value: date,
      component: "date_picker",
      disabled: true,
      type: "view",
    },
    {
      name: "From",
      value: from.value,
      type: inputType,
      disabled: formType == "edit" ? true : false,
      component: "drop_down_picker",
      data: bankAccountsLocal,
      onChange: (value) => {
        setfrom(value);
        setamount(0);
      },
    },
    {
      name: "To",
      value: to.value,
      type: inputType,
      disabled: formType == "edit" ? true : false,
      component: "drop_down_picker",
      data: bankAccountsLocal,
      onChange: (value) => {
        setto(value);
        setamount(0);
      },
    },
    {
      name: "Amount",
      value: amount,
      type: inputType,
      keyboardType: "numeric",
      disabled: formType == "edit" ? true : getAmountDisabled(),
      icon: <FontAwesome name="dollar" size={24} color="black" />,
      onChange: (value) => {
        console.log("value", value, from.accountBalance);
        if (value > from.accountBalance) {
          Alert.alert("Error", "Amount is greater than account balance");
          return;
        }
        setamount(value);
      },
    },
    {
      name: "Description",
      value: description,
      type: inputType,
      component: "input_field",
      disabled: formType == "edit" ? true : false,
      onChange: (value) => {
        setdescription(value);
      },
    },
  ];
  const moneyTransfer = {
    moneyTransferNumber,
    from,
    to,
    date,
    description,
    amount,
  };
  function save() {
    console.log(moneyTransfer);
    const data = [
      {
        value: moneyTransferNumber,
        msg: "Error please enter money transfer number",
        type: "name",
      },

      {
        value: from,
        msg: "Please enter 'From' to continue",
        type: "name",
      },
      {
        value: to,
        msg: "Please enter 'To' to continue",
        type: "name",
      },
      {
        value: amount,
        msg: "Please enter amount to continue",
        type: "name",
      },
    ];
    var formDataIsValid = verifyData(data);

    if (formDataIsValid) {
      var transferID = `TRF${moneyTransferNumber}`;

      startLoadingIndicator("Saving Money Transfer");

      if (formType == "create") {
        var moneyTransferNumCheck = moneyTransfers.find((item, i) => {
          return item.id == transferID;
        });
        if (moneyTransferNumCheck) {
          alert();
          Alert.alert(
            "Save Error",
            `Money Transfer number ${transferID} already exists.`,
            [
              {
                text: "OK",
                onPress: () => {},
              },
            ],
            { cancelable: true }
          );
          stopLoadingIndicator();
          return;
        }
        db.add(
          `moneyTransfers.${transferID}`,
          moneyTransfer,
          () => {
            var recievers = notificationsSettings.recievers;
            sendLiveNotification(
              recievers,
              `New Money Transfer ${transferID}`,
              `From: ${capitalizeFirstLetter(
                from.value
              )}, To" ${capitalizeFirstLetter(to.value)}, Amount: $${amount}`
            );
            Alert.alert(`Money Transfer ${transferID} Created Succesfully.`);
            stopLoadingIndicator();
            navigation.reset({
              index: 0,
              routes: [
                {
                  name: "home",
                },
              ],
            });
          },
          (e) => {
            handleError(e, 336);
          }
        );
      } else {
        db.update(
          `moneyTransfers.${transferID}`,
          moneyTransfer,
          () => {
            Alert.alert(`Money Transfer ${transferID} Updated.`);
            var recievers = notificationsSettings.recievers;
            sendLiveNotification(
              recievers,
              `Money Transfer Edited ${transferID}`,
              `From: ${capitalizeFirstLetter(
                from.value
              )}, To" ${capitalizeFirstLetter(to.value)}, Amount: $${amount}`
            );
            stopLoadingIndicator();
            navigation.reset({
              index: 0,
              routes: [
                {
                  name: "home",
                },
              ],
            });
          },
          (e) => {
            handleError(e, 658);
          }
        );
      }
    }
  }

  const [savingIndicator, setsavingIndicator] = useState(false);
  const [editMode, seteditMode] = useState(false);
  const [selectedItems, setselectedItems] = useState([]);
  const [openItemModal, setopenItemModal] = useState(false);
  const [fireUploadFuction, setfireUploadFuction] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      {/* <Header
        backAction={() => {
          navigation.reset({
            index: 0,
            routes: [
              {
                name: "home",
              },
            ],
          });
        }}
        menuOptions={
          formType != "create"
            ? [
                {
                  title: "Edit Money Transfer",
                  icon: <MaterialIcons name="edit" size={24} color="black" />,
                  onPress: () => {
                    setheaderTitle(`Edit INV${moneyTransferNumber}`);
                    setformType("edit");
                  },
                  disabled: formType == "edit" ? true : false,
                },
                {
                  title: "Delete Money Transfer",
                  titleColor: danger_color,
                  icon: (
                    <MaterialIcons
                      name="delete"
                      size={24}
                      color={danger_color}
                    />
                  ),
                  onPress: () => {
                    Alert.alert(
                      "Warning",
                      `Are you sure you want to delete money transfer INV${moneyTransferNumber}`,
                      [
                        {
                          text: "Cancel",
                          onPress: () => console.log("Cancel Pressed"),
                          style: "cancel",
                        },
                        {
                          text: "Yes, Delete",
                          onPress: () => {
                            startLoadingIndicator("Deleteing Money Transfer.");
                            try {
                              if (items) {
                                items.map((item, i) => {
                                  var stockItem = stocks.find((stock) => {
                                    return stock.code == item.code;
                                  });
                                  var stockToDelete =
                                    stockItem.amounts.workshop.find((stock) => {
                                      return stock.trackRef == item.trackRef;
                                    });
                                  db.update(
                                    `stocks.${item.code}`,
                                    {
                                      updatedAt: new Date(),
                                      [`amounts.workshop`]:
                                        db.arrayRemove(stockToDelete),
                                    },
                                    (e) => {
                                      handleError(e, 7899);
                                    }
                                  );
                                });
                              }
                              db.delete(
                                `moneyTransfers.INV${moneyTransferNumber}`,
                                () => {
                                  var recievers =
                                    notificationsSettings.recievers;
                                  sendLiveNotification(
                                    recievers,
                                    `Money Transfer Deleted INV${moneyTransferNumber}`,
                                    `Name: ${clientName}, Amount: $${amount} ${
                                      paid ? "" : "Not Paid"
                                    }`
                                  );

                                  if (imageStorageName)
                                    storage.deleteFile(
                                      `invoice_images/${imageStorageName}`,
                                      (v) =>
                                        console.log("Image delete success"),
                                      (e) =>
                                        console.log("image delete error", e)
                                    );

                                  stopLoadingIndicator();
                                  navigation.reset({
                                    index: 0,
                                    routes: [
                                      {
                                        name: "home",
                                      },
                                    ],
                                  });
                                  Alert.alert(
                                    `Money Transfer INV${moneyTransferNumber} Deleted Succesfully.`
                                  );
                                },
                                (e) => {
                                  handleError(e, 977);
                                }
                              );
                            } catch (error) {
                              Alert.alert(
                                "Error Deleting money transfer",
                                "Please contact developer."
                              );
                              stopLoadingIndicator();
                            }
                          },
                        },
                      ],
                      { cancelable: true }
                    );
                  },
                },
              ]
            : null
        }
        title={headerTitle}
      /> */}
      <View
        style={{
          flex: 1,
        }}
      >
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 30,
            paddingVertical: 0,
            paddingBottom: 110,
          }}
        >
          <View style={{ paddingTop: 25 }}>
            <FormFields data={formFields} />

            {formType != "view" ? (
              <TMPButton
                title="Save"
                onPress={() => {
                  save();
                }}
                loading={savingIndicator}
              />
            ) : null}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
