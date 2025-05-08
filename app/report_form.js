import FormFields from "@/components/forms/FormFields";
import ScreenHeading from "@/components/ScreenHeading";
import { useRouter } from "expo-router";
import React, { useContext, useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import Button from "../components/forms/Button";
// import { db } from "@/utils/ncodia-databases-dev";
///////
///////
import { MainContext } from "@/contexts/MainContext";
import {
  startLoadingIndicator,
  stopLoadingIndicator,
} from "@/plugins/loadingIndicator";
import { firebaseDB } from "@/utils/ncodia-databases-dev/firebase/initFirebase";
import { Feather } from "@expo/vector-icons";
import { doc, setDoc } from "firebase/firestore";
import { sendLiveNotification } from "../plugins/expoPushNotifications";
import { addNewReport } from "../plugins/reports";

///////

///////
export default function report_form() {
  ///////////////////
  const { cattles, notificationRecievers } = useContext(MainContext);
  ///////////////////

  const router = useRouter();
  ///////////////////
  const [formType, setformType] = useState("create"); // edit, view
  const inputType = formType == "view" ? "view" : null;
  //////////////////////

  ///////////////
  const [id, setid] = useState("S");
  const [date, setdate] = useState(new Date());
  const [type, settype] = useState("");
  const [title, settitle] = useState("");
  const [message, setmessage] = useState("");
  const [cattleID, setcattleID] = useState("");
  const [data, setdata] = useState([]);
  ////SALE TYPE
  const [salePrice, setsalePrice] = useState("");
  const [saleSource, setsaleSource] = useState("");
  ////
  const [cattleIDTextValue, setcattleIDTextValue] = useState("");
  ///
  const textFields = [
    {
      component: <ScreenHeading title="Identification Info" />,
      type: inputType,
    },
    // {
    //   name: "Report ID",
    //   value: id,
    //   onChange: (v) => {
    //     setid(v);
    //   },
    //   onBlur: () => {},
    //   type: inputType,
    //   required: true,
    // },
    {
      name: "Cattle ID",
      onChange: (v) => {
        if (v.id) {
          if (v.isSold) {
            Alert.alert(
              `Cannot Select ${v.id}`,
              "Cattle has already been sold."
            );
            return;
          }
          if (v.isDead) {
            Alert.alert(`Cannot Select ${v.id}`, "Cattle has already died.");
            return;
          }
          setcattleID(v.id);
          setcattleIDTextValue(v.id);
        } else {
          setcattleID("");
          setcattleIDTextValue(v);
        }
      },

      value: cattleIDTextValue,
      type: inputType,
      component: "input_search",
      data:
        cattles.map((item) => {
          var obj = {
            name: item.id,
            id: item.id,
          };

          if (item.isSold) obj.name = `${item.id} (Sold)`;
          if (item.isDead) obj.name = `${item.id} (Dead)`;

          return obj;
        }) || [],
      emptyValueText: `Cattle not found with Id: ${cattleIDTextValue}`,
    },
    {
      name: "Report Type",
      value: type,
      onChange: (v) => {
        if (!cattleID) {
          Alert.alert(
            "Please select a valid cattle id",
            `${cattleIDTextValue || '" "'} is not a registered cattle id.`
          );
          return;
        }
        if (v.id) {
          if (v.id == "sale") {
            settitle("New Sale");
            setmessage(`${cattleID} has been sold.`);
          }
          if (v.id == "vaccination") {
            settitle(`Vaccination`);
            setmessage(`${cattleID} has been vaccinated.`);
          }
        }
        if (v.id == "treatment") {
          settitle("Treatment");
          setmessage(`${cattleID} has recieved a treatment.`);
        }
        if (v.id == "illness") {
          settitle("Illness");
          setmessage(`${cattleID} has an illness`);
        }
        if (v.id == "injury") {
          settitle("Injury");
          setmessage(`${cattleID} has an injury`);
        }
        if (v.id == "death") {
          settitle("Death");
          setmessage(`${cattleID} has died`);
        }
        if (v.id == "other") {
          settitle("");
          setmessage(``);
        }
        settype(v.id);
      },
      type: inputType,
      component: "drop_down_picker",
      data: [
        {
          id: "sale",
          name: "Sale",
        },
        {
          id: "vaccination",
          name: "Vaccination",
        },
        {
          id: "treatment",
          name: "Treatment",
        },
        {
          id: "illness",
          name: "Illness",
        },
        {
          id: "injury",
          name: "Injury",
        },
        {
          id: "death",
          name: "Death",
        },
        {
          id: "other",
          name: "Other",
        },
      ],
    },
    //////TYPE == SALE
    {
      component: <ScreenHeading title="Sale Info" />,
      type: inputType,
      isVisible: type == "sale" ? true : false,
    },
    {
      name: "Sale Price",
      onChange: (v) => {
        setsalePrice(v);
      },
      onBlur: () => {
        setmessage(`${cattleID} has been sold for $${salePrice}.`);
      },
      value: salePrice,
      type: inputType,
      icon: <Feather name="dollar-sign" size={24} color="black" />,
      isVisible: type == "sale" ? true : false,
      keyboardType: "numeric",
    },
    {
      name: "Sale Source",
      onChange: (v) => {
        setsaleSource(v);
      },
      onBlur: () => {
        setmessage(`${cattleID} has been sold from ${saleSource}.`);
      },
      value: saleSource,
      type: inputType,
      isVisible: type == "sale" ? true : false,
    },
    //////////////
    {
      component: <ScreenHeading title="Report Info" />,
      type: inputType,
    },
    {
      name: "Title",
      onChange: (v) => settitle(v),
      value: title,
      type: inputType,
    },
    {
      name: "Description",
      onChange: (v) => setmessage(v),
      value: message,
      type: inputType,
      component: "input_field",
    },

    ///////////////////////////////////////////////////////////
  ];
  ///////////
  const report = {
    id,
    date,
    cattleID,
    type,
    title,
    message,
    data,
    ///
  };
  //////////
  function save() {
    if (!id) {
      Alert.alert("Error", "Please select a valid cattle id first.");
      return;
    }
    if (!type) {
      Alert.alert("Error", "Please select report type");
      return;
    }
    if (!title) {
      Alert.alert("Error", "Please enter report title");
      return;
    }
    if (!message) {
      Alert.alert("Error", "Please enter report message");
      return;
    }
    //Sales
    if (type == "sale" && !salePrice) {
      Alert.alert("Error", "Please enter sale price");
      return;
    }
    if (type == "sale" && !saleSource) {
      Alert.alert("Error", "Please enter sale source");
      return;
    }
    //

    startLoadingIndicator("Saving...");

    if (formType == "create") {
      addNewReport(type, {
        ...report,
      })
        .then(() => {
          ///////////
          sendLiveNotification(
            notificationRecievers,
            `#${cattleID} : ${title}`,
            message
          );
          ///////MArk Catlle as Sold
          if (type == "sale") {
            const cattleRef = doc(firebaseDB, "cattles", cattleID);
            setDoc(
              cattleRef,
              {
                isSold: true,
                salePrice,
                saleSource,
                saleDate: new Date(),
              },
              { merge: true }
            );
          }
          if (type == "death") {
            const cattleRef = doc(firebaseDB, "cattles", cattleID);
            setDoc(
              cattleRef,
              {
                isDead: true,
                dateOfDeath: new Date(),
              },
              { merge: true }
            );
          }

          Alert.alert(`${cattleID} ${type} report was successfully.`);
          stopLoadingIndicator();
          router.push("/home");
        })
        .catch((e) => {
          Alert.alert(`Error ${e}`);
          console.log("Firebase Error", e);
          stopLoadingIndicator();
        });
    }
  }
  return (
    <View style={{ flex: 1 }}>
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
          <View style={{}}>
            <FormFields data={textFields} formType={formType} />

            {formType != "view" ? (
              <Button
                title="Save Report"
                onPress={save}
                // loading={savingIndicator}
              />
            ) : null}
          </View>
        </ScrollView>
      </View>
      {/* <AddItem
        setchangesMade={setchangesMade}
        openItemModal={openItemModal}
        setopenItemModal={setopenItemModal}
        setitems={setitems}
        items={items}
      /> */}
    </View>
  );
}
