import FormFields from "@/components/forms/FormFields";
import ScreenHeading from "@/components/ScreenHeading";
// import { db } from "@/utils/ncodia-databases-dev";
import { useRouter } from "expo-router";
import React, { useContext, useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import Button from "../components/forms/Button";
///////
import { MainContext } from "@/contexts/MainContext";
import {
  startLoadingIndicator,
  stopLoadingIndicator,
} from "@/plugins/loadingIndicator";
import { firebaseDB } from "@/utils/ncodia-databases-dev/firebase/initFirebase";
import { Feather } from "@expo/vector-icons";
import { arrayUnion, doc, setDoc } from "firebase/firestore";
import RadioButtons from "../components/forms/RadioButtons";
import { sendLiveNotification } from "../plugins/expoPushNotifications";
import { addNewReport } from "../plugins/reports";
///////

///////
export default function cattle_form() {
  //////////
  const { cattles, notificationRecievers } = useContext(MainContext);
  ///////////////////
  const router = useRouter();

  ///////////////////
  const [formType, setformType] = useState("create"); // edit, view
  const inputType = formType == "view" ? "view" : null;
  //////////////////////
  ////////////
  var newID;
  if (cattles.length == 0) newID = "S1";
  else {
    newID = newID = "S" + String(parseInt(cattles[0].id.substring(1)) + 1);
  }

  ///////////
  ///////////////
  const [id, setid] = useState(newID || "");
  const [earTagNumber, setearTagNumber] = useState(newID || "");
  const [name, setname] = useState("Cattle");

  const [dateOfBirth, setdateOfBirth] = useState(new Date());
  const [mothersID, setmothersID] = useState("");
  const [gender, setgender] = useState("");
  const [breed, setbreed] = useState("");
  const [color, setcolor] = useState("");

  ///
  const [aquisationType, setaquisationType] = useState("birthed");
  const [purchasePrice, setpurchasePrice] = useState("");
  const [purchaseSource, setpurchaseSource] = useState("");
  //
  const [searchMotherText, setsearchMotherText] = useState(mothersID);
  const textFields = [
    {
      component: <ScreenHeading title="Aquisation Method" />,
      type: inputType,
    },
    {
      component: (
        <RadioButtons
          options={[
            {
              name: "Birthed",
              value: "birthed",
            },
            {
              name: "Purchased",
              value: "purchased",
            },
          ]}
          onChange={(v) => {
            setaquisationType(v.value);
            if (v == "birthed") {
              setpurchasePrice("");
              setpurchaseSource("");
            }
            if (v == "purchased") {
              setmothersID("");
              setsearchMotherText("");
            }
          }}
          value={aquisationType}
        />
      ),
    },
    {
      component: <ScreenHeading title="Identification Info" />,
      type: inputType,
    },
    {
      name: "Cattle ID",
      value: id,
      onChange: (v) => {
        setid(v);
        setearTagNumber(v);
      },
      onBlur: () => {},
      type: inputType,
      required: true,
    },
    {
      name: "Ear Tag Number",
      value: earTagNumber,
      onChange: (v) => {
        setearTagNumber(v);
      },
      onBlur: () => {},
      type: inputType,
    },

    {
      component: <ScreenHeading title="Basic Info" />,
      type: inputType,
    },
    {
      name: "Name",
      onChange: (v) => setname(v),
      value: name,
      type: inputType,
    },
    {
      name: "Date of Birth",
      onChange: (v) => setdateOfBirth(v),
      value: dateOfBirth,
      component: "date_picker",
      type: inputType,
    },

    {
      name: "Search Mothers ID",
      onChange: (v, o) => {
        if (v.id) {
          setmothersID(v.id);
          setsearchMotherText(v.id);
        } else {
          setmothersID("");
          setsearchMotherText(v);
        }
      },
      value: searchMotherText,
      type: inputType,
      component: "input_search",
      data:
        cattles.map((item) => {
          return {
            name: item.id,
            id: item.id,
          };
        }) || [],
      emptyValueText: `Cattle not found with Id: ${searchMotherText}`,
      isVisible: aquisationType == "birthed" ? true : false,
    },
    {
      name: "Purchase Price",
      onChange: (v) => {
        setpurchasePrice(v);
      },
      value: purchasePrice,
      type: inputType,
      icon: <Feather name="dollar-sign" size={24} color="black" />,
      isVisible: aquisationType == "purchased" ? true : false,
      keyboardType: "numeric",
    },
    {
      name: "Purchase Source",
      onChange: (v) => {
        setpurchaseSource(v);
      },
      value: purchaseSource,
      type: inputType,
      isVisible: aquisationType == "purchased" ? true : false,
    },

    {
      component: <ScreenHeading title="Other Info" />,
      type: inputType,
    },
    {
      name: "Gender",
      onChange: (v) => {
        console.log("v", v);
        if (v.id) setgender(v.id);
        else setgender("");
      },
      value: gender,
      // defaultValue: paymentAccountId,
      component: "drop_down_picker",
      data: [
        { name: "Male", id: "male" },
        { name: "Female", id: "female" },
      ],
      type: inputType,
    },
    {
      name: "Breed",
      onChange: (v) => {
        setbreed(v);
      },
      value: breed,
      type: inputType,
    },
    {
      name: "Color",
      onChange: (v) => {
        setcolor(v);
      },
      value: color,
      type: inputType,
    },
    ///////////////////////////////////////////////////////////
  ];

  ///////////
  const cattle = {
    id,
    earTagNumber,
    name,
    dateOfBirth,
    mothersID,
    gender,
    breed,
    color,
    aquisationType,
    purchasePrice,
    purchaseSource,
    createdAt: new Date(),
    updatedAt: new Date(),
    ///
  };

  //////////
  function save() {
    console.log("ffff", gender);
    if (!id) {
      Alert.alert("Error", "Please enter cattle id number");
      return;
    }
    if (!earTagNumber) {
      Alert.alert("Error", "Please enter ear tag number");
      return;
    }
    if (!name) {
      Alert.alert("Error", "Please enter name/description");
      return;
    }
    if (!gender) {
      Alert.alert("Error", "Please enter gender to continue");
      return;
    }
    if (!mothersID && aquisationType == "birthed") {
      Alert.alert("Error", "Please enter mothers ID to continue");
      return;
    }

    console.log("Saving");
    var formDataIsValid = true;

    if (formDataIsValid) {
      startLoadingIndicator("Saving...");

      if (formType == "create") {
        var cattleIdCheck = cattles.find((item, i) => {
          return item.id == id;
        });
        if (cattleIdCheck) {
          Alert.alert(
            "Save Error",
            `Cattle Id ${id} already exists.`,
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

        const cattleRef = doc(firebaseDB, "cattles", id);
        setDoc(cattleRef, cattle)
          .then((v) => {
            ///////////
            sendLiveNotification(
              notificationRecievers,
              `New Cattle ${id} Added`,
              `Aquisition Type: ${aquisationType || "Unknown"}, Gender: ${
                gender || "Unknown"
              }, Breed: ${breed || "Unknown"}, Tag#: ${
                earTagNumber || "Unknown"
              }`
            );
            /////////////
            if (aquisationType == "birthed") {
              addNewReport("birth", {
                date: dateOfBirth,
                cattleID: mothersID,
                title: "New Birth",
                message: `${mothersID} gave birth to ${id}`,
              });
              /////////////

              const motheRef = doc(firebaseDB, "cattles", mothersID);
              setDoc(
                motheRef,
                {
                  children: arrayUnion(id),
                },
                { merge: true }
              )
                .then((v) => {})
                .catch((e) => {
                  console.log("Firebase Update Cattle Mother Error", e);
                });
            }
            if (aquisationType == "purchased") {
              addNewReport("purchased", {
                date: new Date(),
                cattleID: id,
                title: "Purchased",
                message: `${id} has been purchased.`,
              });
              /////////////

              const cattleRef = doc(firebaseDB, "cattles", id);
              setDoc(
                cattleRef,
                {
                  isPurchased: true,
                  purchasePrice,
                  purchaseSource,
                  purchaseDate: new Date(),
                },
                { merge: true }
              )
                .then((v) => {})
                .catch((e) => {
                  console.log("Firebase Update Cattle Mother Error", e);
                });
            }

            //////////////
            Alert.alert(`Cattle ${id} Added Succesfully`);
            stopLoadingIndicator();
            router.push("/home");
          })
          .catch((e) => {
            Alert.alert(`Error ${e}`);
            console.log("Firebase Error", e);
            stopLoadingIndicator();
          });
      }

      // else {
      //   db.update(
      //     `invoices.${invoiceID}`,
      //     invoice,
      //     () => {
      //       Alert.alert(`Invoice ${invoiceID} Updated.`);
      //       var recievers = notificationsSettings.recievers;
      //       sendLiveNotification(
      //         recievers,
      //         `Invoice Edited ${invoiceID}`,
      //         `Name: ${client.name}, Amount: $${amount} ${
      //           paid ? "" : "Not Paid"
      //         }`
      //       );
      //       stopLoadingIndicator();
      //       navigation.reset({
      //         index: 0,
      //         routes: [
      //           {
      //             name: "home",
      //           },
      //         ],
      //       });
      //     },
      //     (e) => {
      //       handleError(e, 658);
      //     }
      //   );
      // }
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
                title="Save"
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
