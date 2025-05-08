import { Timestamp, deleteDoc, getDoc, updateDoc } from "firebase/firestore";
import { dbUser } from "./initFirebase";
import { convertDBPathToFirebasePathRef } from "../helpers/convertDBPathToFirebasePathRef";
import { db } from "../database";

export const deleteFirebaseData = async (path, onSuccess, onError, options) => {
  /////////

  const dbPath = path.split(".");
  var docId = dbPath[dbPath.length - 1];

  var docRef = convertDBPathToFirebasePathRef(path, options);

  ///
  getDoc(docRef)
    .then((doc) => {
      if (doc.exists()) {
        deleteDoc(docRef)
          .then((v) => {
            if (onSuccess) onSuccess(v);
            // stopLoadingIndicator();
            db.add(`trash.${docId}`, {
              ...doc.data(),
              deletedAt: Timestamp.fromDate(new Date()),
            });
          })
          .catch((error) => {
            if (onError) onError(error);
            else console.log("FIREBASE ERROR", error);
            // stopLoadingIndicator();
          });
      } else {
        // stopLoadingIndicator();
        const id = doc.id;
        if (onError) onError(`DOCUMENT OF ID ${id} DOSEN'T EXISTS`);
        console.log(`DOCUMENT OF ID ${id} DOSEN'T EXISTS`);
      }
    })
    .catch((e) => {
      alert("Cannot Update Records While Offline.");
      // stopLoadingIndicator();
      if (onError) onError(e);
      console.log("You may be offline.", e);
    });
  //
};
