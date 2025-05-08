import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import FormFields from "@/components/FormFields";
// import Header from "@/components/Header";
import TMPButton from "@/components/TMPButton";
import { MainContext } from "@/contexts/MainContext";
import { createID } from "plugins/createRandomString";
import { sendLiveNotification } from "plugins/expoPushNotifications";
import { db, storage } from "plugins/firebase";
import { verifyData } from "plugins/validation";
import React, { useContext, useEffect, useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import { danger_color } from "theme/colors";
import AddItem from "./components/AddItem";
import InvoiceItems from "./components/InvoiceItems";
export default function InvoiceForm({ navigation, route }) {
  const {
    invoices,
    startLoadingIndicator,
    stopLoadingIndicator,
    handleError,
    notificationsSettings,
    bankAccounts,
    stocks,
    clients,
  } = useContext(MainContext);
  //////////////////////////////////////////////////

  const [headerTitle, setheaderTitle] = useState("");

  const [id, setid] = useState("");

  const [amount, setamount] = useState();
  const [client, setclient] = useState({});
  const [invoiceNum, setinvoiceNum] = useState("0000");
  const [date, setdate] = useState(new Date());
  const [paid, setpaid] = useState(false);
  const [description, setdescription] = useState("");
  const [items, setitems] = useState([]);
  const [invoiceImage, setinvoiceImage] = useState("");
  const [formTypeLocal, setformTypeLocal] = useState(route.params.formType);
  const [paymentAccountId, setpaymentAccountId] = useState("");
  const [imageStorageName, setimageStorageName] = useState();
  const [amountPaid, setamountPaid] = useState("0");
  ///////////////////////////////////////////////
  const icon_color = "white";
  const icon_size = 30;
  const formType = formTypeLocal ? formTypeLocal : route.params.formType;
  const inputType = formType == "view" ? "view" : null;
  //////////////////////////////////////////////

  /////////////////////////////////////////////////
  useEffect(() => {
    console.log("Global->", formType);

    if (formType == "create") {
      setheaderTitle("New Invoice");

      try {
        const newID = String(
          parseInt(invoices[0].id.substring(3)) + 1
        ).padStart(4, "0");
        setinvoiceNum(newID);
        setimageStorageName(`INV${newID}${createID(3)}`);
      } catch (error) {
        console.log("INVOICE CREATE ERROR", error);
        setinvoiceNum("0000");
        setimageStorageName(`INV0000${createID(3)}`);
      }
    }

    if (formType == "view") {
      var invoiceLocal = route.params.data;
      setheaderTitle(`View ${invoiceLocal.id}`);
      Object.keys(invoice).map((key, index) => {
        if (key == "date") {
          setdate(invoiceLocal.date);
          return;
        }
        eval(`set${key}(invoiceLocal.${key})`);
      });
      setinvoiceNum(invoiceLocal.id.substring(3));
    }

    return () => {};
  }, [invoices, route.params]);

  function total() {
    var sum = 0;
    items.map((item, i) => {
      if (item.price) {
        if (item.qty) {
          var totalPrice = item.qty * item.price;
          sum = sum + totalPrice;
        } else {
          var totalPrice = 1 * item.price;
          sum = sum + totalPrice;
        }
      }
    });
    return sum.toFixed(2);
  }
  /////////////////////////////////////////////////

  const getBankAccountsData = () => {
    if (bankAccounts.length == 0) return [];
    else
      return bankAccounts.map((item) => {
        return {
          name: item.name,
          value: item.idName,
        };
      });
  };
  /////////////////////////////////////////////////
  const textFields = [
    {
      name: "Invoice Number",
      // icon: <AntDesign name="barcode" size={24} color="black" />,
      value: `INV${invoiceNum}`,
      onChange: (v) => {
        if (v.length > 7) return;
        setinvoiceNum(v.substring(3));
      },
      onBlur: () => {
        if (invoiceNum) {
          const newID = String(parseInt(invoiceNum)).padStart(4, "0");
          setinvoiceNum(newID);
        } else setinvoiceNum("0000");
      },
      type: inputType,
      disabled: formType == "edit" ? true : false,
    },
    {
      name: "date",
      //  icon: <FontAwesome5 name="address-card" size={24} color="black" />,
      onChange: (v) => setdate(v),
      value: date,
      component: "date_picker",
      type: inputType,
    },
    {
      name: "Client Name",
      onChange: (v) => {
        // if (typeof v == "string") {
        //   setclient((s) => ({ ...s, name: v }));
        // } else {
        //   setclient(v);
        // }
      },
      value: client.name,
      type: inputType,
      component: "input_search",
      data: clients,
      emptyValueText: "Client not registered",
    },

    {
      name: "Amount",
      icon: <FontAwesome name="dollar" size={24} color="black" />,
      onChange: (v) => setamount(v),
      value: amount,
      keyboardType: "numeric",
      type: inputType,
    },
    {
      name: "Description",
      // icon: <FontAwesome5 name="comments-dollar" size={24} color="black" />,
      onChange: (v) => setdescription(v),
      value: description,
      component: "input_field",
      type: inputType,
    },
    {
      name: "Stock Items",
      component: (
        <InvoiceItems
          setchangesMade={setchangesMade}
          invoiceNumber={invoiceNum}
          type={formType}
          formTypeLocal={formTypeLocal}
          total={total}
          invoiceTotal={amount}
          setamount={setamount}
          setitems={setitems}
          items={items}
          openItemModal={openItemModal}
          setopenItemModal={setopenItemModal}
        />
      ),
    },
    {
      name: "Paid",
      // icon: <FontAwesome5 name="comments-dollar" size={24} color="black" />,
      onChange: (v) => {
        if (!amount) {
          Alert.alert("Warning", "Please enter invoice amount first.");
          return;
        }
        setpaid(v);
        if (v) {
          setamountPaid(amount);
        } else {
          setamountPaid("0");
        }
      },
      value: paid,
      component: "switch",
      type: inputType,
    },
    {
      name: "Amount Paid",
      icon: <FontAwesome name="dollar" size={24} color="black" />,
      onChange: (v) => {
        if (Number(amount) < Number(v)) {
          Alert.alert(
            "Warning",
            "Amount paid cannot be more than invoice amount."
          );
          return;
        }
        setamountPaid(v);
        if (amount != v) {
          setpaid(false);
        } else {
          setpaid(true);
        }
      },
      value: amountPaid,
      keyboardType: "numeric",
      type: inputType,
    },
    {
      name: "Recieved By",
      onChange: (v) => {
        setpaymentAccountId(v.value);
      },
      value: paymentAccountId,
      defaultValue: paymentAccountId,
      component: "drop_down_picker",
      data: getBankAccountsData(),
      type: inputType,
    },
    // {
    //   name: "Upload Invoice",
    //   // icon: <FontAwesome5 name="comments-dollar" size={24} color="black" />,
    //   onChange: (v) => setinvoiceImage(v),
    //   value: invoiceImage,
    //   component: "image_picker",
    //   folder: "invoice_images",
    //   storageName: imageStorageName,
    //   type: inputType,
    // },
  ];

  const [changesMade, setchangesMade] = useState(false);

  const invoice = {
    date,
    client,
    amount,
    amountPaid,
    description,
    items,
    paymentAccountId,
  };

  function save() {
    const data = [
      {
        value: invoiceNum,
        msg: "Error please enter invoice number",
        type: "name",
      },

      {
        value: client.name,
        msg: "Please enter client name to continue",
        type: "name",
      },
      {
        value: amount,
        msg: "Please enter amount to continue",
        type: "name",
      },
      {
        value: description,
        msg: "Please enter description to continue",
        type: "name",
      },
      {
        value: paymentAccountId,
        msg: "Please enter recieved by to continue",
        type: "name",
      },
    ];
    var formDataIsValid = verifyData(data);

    if (formDataIsValid) {
      var invoiceID = `INV${invoiceNum}`;
      startLoadingIndicator("Saving Invoice");

      if (formType == "create") {
        var invNumCheck = invoices.find((item, i) => {
          return item.id == invoiceID;
        });
        if (invNumCheck) {
          alert();
          Alert.alert(
            "Save Error",
            `Invoice number ${invoiceID} already exists.`,
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
          `invoices.${invoiceID}`,
          invoice,
          () => {
            var recievers = notificationsSettings.recievers;
            sendLiveNotification(
              recievers,
              `New Invoice ${invoiceID}`,
              `Name: ${client.name}, Amount: $${amount} ${
                paid ? "" : "Not Paid"
              }`
            );
            /////////// Update used stock Values ////////////
            items.map((item, i) => {
              if (item.code) {
                db.update(
                  `stocks.${item.code}`,
                  {
                    updatedAt: new Date(),
                    [`amounts.workshop`]: db.arrayUnion({
                      date: new Date(),
                      ref: invoiceID,
                      trackRef: item.trackRef,
                      description: client.name,
                      amount: `-${item.qty}`,
                      type: "remove",
                    }),
                  },
                  (v) => {},
                  (e) => {
                    handleError(e, 484);
                  }
                );
              }
            });
            Alert.alert(`Invoice ${invoiceID} Added Succesfully`);
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
          `invoices.${invoiceID}`,
          invoice,
          () => {
            Alert.alert(`Invoice ${invoiceID} Updated.`);
            var recievers = notificationsSettings.recievers;
            sendLiveNotification(
              recievers,
              `Invoice Edited ${invoiceID}`,
              `Name: ${client.name}, Amount: $${amount} ${
                paid ? "" : "Not Paid"
              }`
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
          if (route.params.onBackPress) route.params.onBackPress();
        }}
        menuOptions={
          formTypeLocal != "create"
            ? [
                {
                  title: "Edit Invoice",
                  icon: <MaterialIcons name="edit" size={24} color="black" />,
                  onPress: () => {
                    setheaderTitle(`Edit INV${invoiceNum}`);
                    setformTypeLocal("edit");
                  },
                  disabled: formTypeLocal == "edit" ? true : false,
                },
                {
                  title: "Delete Invoice",
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
                      `Are you sure you want to delete invoice INV${invoiceNum}`,
                      [
                        {
                          text: "Cancel",
                          onPress: () => console.log("Cancel Pressed"),
                          style: "cancel",
                        },
                        {
                          text: "Yes, Delete",
                          onPress: () => {
                            startLoadingIndicator("Deleteing Invoice.");
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
                                    (v) => {},
                                    (e) => {
                                      handleError(e, 7899);
                                    }
                                  );
                                });
                              }

                              db.delete(
                                `invoices.INV${invoiceNum}`,
                                () => {
                                  var recievers =
                                    notificationsSettings.recievers;
                                  sendLiveNotification(
                                    recievers,
                                    `Invoice Deleted INV${invoiceNum}`,
                                    `Name: ${client.name}, Amount: $${amount} ${
                                      paid ? "" : "Not Paid"
                                    }`
                                  );

                                  if (imageStorageName)
                                    storage.deleteFile(
                                      `invoice_images/${imageStorageName}`,
                                      (e) =>
                                        console.log("Image delete success"),
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
                                    `Invoice INV${invoiceNum} Deleted Succesfully.`
                                  );
                                },
                                (e) => {
                                  handleError(e, 977);
                                }
                              );
                              Alert.alert(
                                `Invoice INV${invoiceNum} Deleted Succesfully.`
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
                            } catch (error) {
                              Alert.alert(
                                "Error Deleting invoice",
                                "Please contact developer."
                              );
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
        <View style={{ paddingHorizontal: 30, paddingTop: 5 }}></View>
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 30,
            paddingVertical: 0,
            paddingBottom: 110,
          }}
        >
          <View style={{ paddingTop: 25 }}>
            <FormFields data={textFields} formType={formType} />

            {formType != "view" ? (
              <TMPButton
                title="Save"
                onPress={() => {
                  save();
                  // if (!invoiceImage) {
                  //   Alert.alert(
                  //     "Warning no invoice image attached",
                  //     "Would you like to attach invoice image?",
                  //     [
                  //       {
                  //         text: "No",
                  //         onPress: () => {
                  //           save();
                  //         },
                  //         style: "cancel",
                  //       },
                  //       {
                  //         text: "Yes, attach invoice",
                  //         onPress: () => {
                  //           setfireUploadFuction(Math.random());
                  //         },
                  //       },
                  //     ]
                  //   );
                  //   return;
                  // } else {
                  //   save();
                  // }
                }}
                loading={savingIndicator}
              />
            ) : null}
          </View>
        </ScrollView>
      </View>
      <AddItem
        setchangesMade={setchangesMade}
        openItemModal={openItemModal}
        setopenItemModal={setopenItemModal}
        setitems={setitems}
        items={items}
      />
    </View>
  );
}
