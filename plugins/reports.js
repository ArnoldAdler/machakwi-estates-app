import { firebaseDB } from "@/utils/ncodia-databases-dev/firebase/initFirebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { Alert } from "react-native";

export const addNewReport = async (reportType, data) => {
  if (!reportType) {
    Alert.alert("Dev Error 432", "Please select a report type");
    return;
  }
  if (!data.cattleID) {
    Alert.alert("Dev Error 432", "Please enter report cattle ID");
    return;
  }
  if (!data.title) {
    Alert.alert("Dev Error 432", "Please enter report title");
    return;
  }
  if (!data.message) {
    Alert.alert("Dev Error 432", "Please enter report message");
    return;
  }

  var report = {
    date: new Date(),
    type: reportType,
    ...data,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  try {
    const parentDocRef = doc(firebaseDB, "cattles", data.cattleID);
    const subcollectionDocRef = doc(
      collection(parentDocRef, "reports"),
      String(new Date().getTime())
    );

    // Set the data for the document with the current timestamp as ID
    await setDoc(subcollectionDocRef, report)
      .then(() => {
        console.log("Report saved successfully");
        return true;
      })
      .catch((e) => {
        console.log("Report failed to save", e);
        return false;
      });
  } catch (e) {
    console.log("Report failed to save", e);
    Alert.alert("Error", "Report failed to save");
    return false;
  } finally {
    return true;
  }
};
