import { View, Text, Alert } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import TMPDropDownPicker from "@/components/TMPDropDownPicker";
import TMPTextInput from "@/components/TMPTextInput";
import TMPTextField from "@/components/TMPTextField";
import { Button } from "react-native-elements/dist/buttons/Button";
import { MainContext } from "@/contexts/MainContext";
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
import { verifyData } from "plugins/validation";
import { db } from "plugins/firebase";

export default function TransferFunds() {
  const {
    bankAccounts,
    handleError,
    transfers,
    startLoadingIndicator,
    stopLoadingIndicator,
    closeModal,
  } = useContext(MainContext);
  const marginBottom = 20;
  const [accounts, setaccounts] = useState([]);

  const [from, setfrom] = useState("");
  const [to, setto] = useState("");
  const [amount, setamount] = useState("");
  const [description, setdescription] = useState("");
  const [fromName, setfromName] = useState("");
  const [toName, settoName] = useState("");

  const [tranferNum, settranferNum] = useState("");
  useEffect(() => {
    var accountsLocal = bankAccounts.map((item) => {
      var title = item.name;
      var value = item.id;
      return { title, value };
    });
    setaccounts(accountsLocal);
    ///////
    try {
      const newID = String(parseInt(transfers[0].id.substring(3)) + 1).padStart(
        4,
        "0"
      );
      settranferNum(newID);
    } catch (error) {
      settranferNum("0000");
    }
    return () => {};
  }, [bankAccounts]);

  const tranfer = {
    to,
    from,
    toName,
    fromName,
    description,
    amount,
  };
  ////////////////////////////////////////////
  const tranferFunds = () => {
    const data = [
      {
        value: to,
        msg: "Please select account to tranfer to.",
        type: "name",
      },
      {
        value: from,
        msg: "Please select acount to tranfer from.",
        type: "name",
      },
      {
        value: amount,
        msg: "Please enter tranfer amount",
        type: "name",
      },
      {
        value: description,
        msg: "Please enter description.",
        type: "name",
      },
    ];
    if (to == from) {
      Alert.alert("Tranfer Failed", "Tranfer cannot be from the same account.");
      return;
    }
    /*     if (Number(amount) > getAccountBalance(from)) {
        Alert.alert(
          "Tranfer Failed",
          "Tranfer cannot be from the same account."
        );
        return;
      } */

    var formDataIsValid = verifyData(data);
    if (formDataIsValid) {
      startLoadingIndicator("Tranfering Funds");
      const id = `TRA${tranferNum}`;
      db.add(
        `transfers.${id}`,
        tranfer,
        () => {
          Alert.alert(`Transfer ${id} Completed Succesfully`);
          stopLoadingIndicator();
          closeModal();
        },
        (e) => {
          handleError(e, 348);
        }
      );
    }
  };
  return (
    <View>
      <TMPDropDownPicker
        data={accounts}
        style={{ marginBottom: marginBottom }}
        label="From"
        value={from}
        onChange={(v) => {
          setfrom(v.value);
          setfromName(v.name);
          setdescription(`From :${v.name} -> To :${toName}`);
        }}
      />
      <TMPDropDownPicker
        style={{ marginBottom: marginBottom }}
        label="To"
        data={accounts}
        value={to}
        onChange={(v) => {
          setto(v.value);
          settoName(v.name);
          setdescription(`From :${fromName} -> To :${v.name}`);
        }}
      />
      <TMPTextInput
        style={{ marginBottom: marginBottom }}
        icon={<FontAwesome name="dollar" size={24} color="black" />}
        label="Amount"
        keyboardType={"numeric"}
        value={amount}
        onChange={(v) => {
          setamount(v);
        }}
      ></TMPTextInput>
      <TMPTextField
        style={{ marginBottom: marginBottom }}
        label="Description"
        value={description}
        onChange={(v) => {
          setdescription(v);
        }}
      />
      <Button onPress={tranferFunds} style={{}} title="Transfer" />
    </View>
  );
}
