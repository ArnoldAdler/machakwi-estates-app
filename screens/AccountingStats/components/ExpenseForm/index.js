import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
// import Header from "@/components/Header";
import TMPButton from "@/components/TMPButton";
import { MainContext } from "@/contexts/MainContext";
import { createID } from "plugins/createRandomString";
import { sendLiveNotification } from "plugins/expoPushNotifications";
import { db, storage } from "plugins/firebase";
import { verifyData } from "plugins/validation";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import { danger_color } from "theme/colors";
import FormFields from "@/components/FormFields";
import { toMoney } from "plugins/valueConvetors";

export default function ExpenseForm({ navigation, route }) {
  const {
    expenses,
    startLoadingIndicator,
    stopLoadingIndicator,
    handleError,
    notificationsSettings,
    expensesCategories,
    bankAccounts,
    getAccountBalance,
  } = useContext(MainContext);
  //////////////////////////////////////////////////
  const [name, setname] = useState("");
  const [amount, setamount] = useState();
  const [description, setdescription] = useState("");
  const [category, setcategory] = useState("");
  const [supplierName, setsupplierName] = useState("");
  const [supplierAccountNumber, setsupplierAccountNumber] = useState("");
  const [date, setdate] = useState(new Date());
  const [expenseNum, setexpenseNum] = useState("0000");
  const [receiptLink, setreceiptLink] = useState("");
  const [paymentAccount, setpaymentAccount] = useState("");
  const [formTypeLocal, setformTypeLocal] = useState(route.params.formType);
  const [imageStorageName, setimageStorageName] = useState(
    `EXP${expenseNum}${createID(3)}`
  );
  //
  const [from, setfrom] = useState({ accountBalance: "0", name: "None" });
  const [bankAccountsLocal, setbankAccountsLocal] = useState([]);
  ///////////////////////////////////////////////////

  const icon_color = "white";
  const icon_size = 30;
  const formType = formTypeLocal ? formTypeLocal : route.params.formType;

  const inputType = formType == "view" ? "view" : null;

  const [headerTitle, setheaderTitle] = useState("");
  useEffect(() => {
    if (formType == "create") {
      setheaderTitle("New Expense");
      try {
        const newID = String(
          parseInt(expenses[0].id.substring(3)) + 1
        ).padStart(4, "0");
        setexpenseNum(newID);
        setimageStorageName(`EXP${newID}${createID(3)}`);
      } catch (error) {
        setexpenseNum("0000");
        setimageStorageName(`EXP0000${createID(3)}`);
      }
    }
    if (formType == "view") {
      var expenseLocal = route.params.data;

      setheaderTitle(`View ${expenseLocal.id}`);
      Object.keys(expense).map((key, index) => {
        if (key == "date") {
          setdate(expenseLocal.date);
          return;
        }
        eval(`set${key}(expenseLocal.${key})`);
      });
      setexpenseNum(expenseLocal.id.substring(3));
    }
    return () => {};
  }, [expenses, route.params]);

  const imagePicker_ref = useRef();
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

  const textFields = [
    /*     {
      name: "Upload Reciept",
      onChange: (v) => setcode(v),
      component: "image_picker",
      value: receiptLink,
      onChange: (v) => setreceiptLink(v),
      ref: imagePicker_ref,
      folder: "expenses_receipts",
      storageName: imageStorageName,
      type: inputType,
    }, */
    {
      name: "Ref #",
      value: `EXP${expenseNum}`,
      onChange: (v) => setexpenseNum(v),
      disabled: true,
      type: inputType,
    },
    {
      name: "Date",
      onChange: (v) => {
        if (v) {
          setdate(v);
        }
      },
      value: date,
      component: "date_picker",
      type: inputType,
    },
    {
      name: "Supplier Name",
      onChange: (v) => setsupplierName(v),
      value: supplierName,
      type: inputType,
    },
    {
      name: "Description",
      onChange: (v) => setdescription(v),
      value: description,
      component: "input_field",
      type: inputType,
    },

    {
      name: "Payment Account",
      onChange: (v) => {
        setpaymentAccount(v.value);
        setfrom(v);
        setamount(0);
      },
      value: paymentAccount,
      defaultValue: paymentAccount,
      component: "drop_down_picker",
      data: bankAccountsLocal,
      type: inputType,
    },
    {
      name: "Amount",
      icon: <FontAwesome name="dollar" size={24} color="black" />,
      onChange: (v) => {
        if (v > from.accountBalance) {
          Alert.alert(
            "Error",
            `The payment account : '${from.name}', does not have sufficient funds.`
          );
          return;
        }
        setamount(v);
      },
      value: amount,
      keyboardType: "numeric",
      type: inputType,
    },
    {
      name: "Category",
      onChange: (v) => setcategory(v.value),
      value: category,
      defaultValue: category,
      component: "drop_down_picker",
      data: expensesCategories,
      type: inputType,
    },
  ];
  const expense = {
    expenseNum: `EXP${expenseNum}`,
    supplierName,
    supplierAccountNumber,
    date,
    description,
    paymentAccount,
    amount: amount,
    receiptLink,
    category,
    imageStorageName,
  };

  const [changesMade, setchangesMade] = useState(false);
  const noReceipt_ref = useRef(false);
  const [noReceiptNeeded, setnoReceiptNeeded] = useState(false);
  function save() {
    const data = [
      {
        value: expenseNum,
        msg: "Error could not create expense number",
        type: "name",
      },
      {
        value: description,
        msg: "Please enter description of expense to continue",
        type: "name",
      },

      {
        value: supplierName,
        msg: "Please supplier name to continue",
        type: "name",
      },
      {
        value: category,
        msg: "Please expense category to continue",
        type: "name",
      },
      {
        value: amount,
        msg: "Please enter amount to continue",
        type: "name",
      },
      {
        value: paymentAccount,
        msg: "Please select payment account to continue",
        type: "name",
      },
    ];
    var formDataIsValid = verifyData(data);
    if (formDataIsValid) {
      var expenseID = `EXP${expenseNum}`;
      startLoadingIndicator("Saving Expense");
      if (formType == "create") {
        db.add(
          `expenses.${expenseID}`,
          expense,
          () => {
            Alert.alert(`Expense ${expenseID} Added Succesfully`);
            var recievers = notificationsSettings.recievers;
            sendLiveNotification(
              recievers,
              `New Expense ${expenseID}`,
              `Name: ${supplierName}, Amount: $${amount}.`
            );
            stopLoadingIndicator();
            navigation.goBack();
          },
          (e) => handleError(e, 348)
        );
      } else {
        db.update(
          `expenses.${expenseID}`,
          expense,
          () => {
            Alert.alert("Item Updated Succesfully");
            var recievers = notificationsSettings.recievers;
            sendLiveNotification(
              recievers,
              `Expense Edited ${expenseID}`,
              `Name: ${supplierName}, Amount: $${amount}.`
            );

            stopLoadingIndicator();
            navigation.goBack();
          },
          (e) => handleError(e, 348)
        );
      }
    }
  }
  const [savingIndicator, setsavingIndicator] = useState(false);
  const [editMode, seteditMode] = useState(false);
  const [selectedItems, setselectedItems] = useState([]);
  const [fireUploadFuction, setfireUploadFuction] = useState(false);
  const uploadFunction = useRef();
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
                  title: "Edit Expense",
                  icon: <MaterialIcons name="edit" size={24} color="black" />,
                  onPress: () => {
                    setheaderTitle(`Edit EXP${expenseNum}`);
                    setformTypeLocal("edit");
                  },
                  disabled: formTypeLocal == "edit" ? true : false,
                },
                {
                  title: "Delete Expense",
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
                      `Are you sure you want to delete expense EXP${expenseNum}`,
                      [
                        {
                          text: "Cancel",
                          onPress: () => console.log("Cancel Pressed"),
                          style: "cancel",
                        },
                        {
                          text: "Yes, Delete",
                          onPress: () => {
                            startLoadingIndicator("Deleteing Expense.");
                            db.delete(
                              `expenses.EXP${expenseNum}`,
                              () => {
                                var recievers = notificationsSettings.recievers;
                                sendLiveNotification(
                                  recievers,
                                  `Expense Deleted EXP${expenseNum}`,
                                  `Name: ${supplierName}, Amount: $${amount}.`
                                );

                                if (imageStorageName)
                                  storage.delete(
                                    `expenses_receipts/${imageStorageName}`
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
                                  `Expense EXP${expenseNum} Deleted Succesfully.`
                                );
                              },
                              (e) => {
                                handleError(e, 365);
                              }
                            );
                            Alert.alert(
                              `Expense EXP${expenseNum} Deleted Succesfully.`
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
            paddingBottom: 110,
          }}
        >
          <View style={{ paddingTop: 25 }}>
            <FormFields data={textFields} />

            {formType != "view" ? (
              <TMPButton
                title="Save"
                onPress={() => {
                  save();

                  // if (!receiptLink && noReceiptNeeded == false) {
                  //   Alert.alert(
                  //     "Warning No receipt attached",
                  //     "Would you like to attach reciept?",
                  //     [
                  //       {
                  //         text: "No",
                  //         onPress: () => {
                  //           noReceipt_ref.current == true;
                  //           setnoReceiptNeeded(true);
                  //           save();
                  //         },
                  //         style: "cancel",
                  //       },
                  //       {
                  //         text: "Yes, attach reciept",
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

      {/*     <View style={{ paddingHorizontal: 10 }}>
        {type == "create" || editMode ? (
     
        ) : (
          <>
            <TMPButton
              title="Edit"
              color={primary_color}
              height={50}
              onPress={() => {
                seteditMode(true);
                setheaderTitle("Edit Item");
              }}
            />
            <TMPButton
              style={{ marginBottom: 10 }}
              title="Delete"
              color={danger_color}
              height={50}
              loading={savingIndicator}
              onPress={() => {
                Alert.alert(
                  "Warning",
                  "Are you sure you want to delete this item permanantley.",
                  [
                    {
                      text: "No",
                      onPress: () => {},
                      style: "cancel",
                    },
                    {
                      text: "Yes, Delete",
                      onPress: () => {
                        setsavingIndicator(true);
                        // firebase
                        //   .firestore()
                        //   .collection("stocks")
                        //   .doc(id)
                        //   .delete()
                        //   .then(() => {
                        //     Alert.alert("Record Deleted Succesfully.");
                        //     setsavingIndicator(false);
                        //     navigation.goBack();
                        //   })
                        //   .catch((e) => {
                        //     alert(
                        //       "Error Deleting Record: Check your log for more info."
                        //     );
                        //     setsavingIndicator(false);

                        //   });
                      },
                    },
                  ],
                  { cancelable: true }
                );
              }}
            />
          </>
        )}
      </View> */}
    </View>
  );
}
