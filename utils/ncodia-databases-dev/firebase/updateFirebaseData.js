import { Timestamp, getDoc, updateDoc } from "firebase/firestore";
import { dbUser } from "./initFirebase";
import { convertDBPathToFirebasePathRef } from "../helpers/convertDBPathToFirebasePathRef";

export const updateFirebaseData = async (
  path,
  data,
  onSuccess,
  onError,
  options
) => {
  /////////
  var docRef = convertDBPathToFirebasePathRef(path, {
    ...options,
    type: "get",
  });

  //////////////////
  ///////////
  getDoc(docRef)
    .then((doc) => {
      if (doc.exists) {
        updateDoc(docRef, {
          ...data,
          updatedBy: dbUser,
          updatedAt: Timestamp.fromDate(new Date()),
        })
          .then((v) => {
            console.log("DATA UPDATED", data);
            if (onSuccess) onSuccess(v);
          })
          .catch((e) => {
            console.log(
              `%cFIREBASE DOCUMENT UPDATE ERROR PATH:${path}`,
              "background: #222; color: #FF0000"
            );
            // console.log(e);
            // if (e.message.substring(0, 21) == "No document to update") {
            //   db.add(path, data, onSuccess, onError);
            // }
            if (onError) onError(e);
            // else stopLoadingIndicator();

            // Common Firebase errors:
            // 'permission-denied': User lacks required permissions.
            // 'unavailable': Server unavailable or network issues.
            // 'invalid-argument': Invalid data or operation.
            // 'not-found': Document doesn't exist.
            //
          });
      } else {
        // Document not found, return an error message
        const id = doc.id;
        onError(`DOCUMENT OF ID ${id} DOSEN'T EXISTS`);
      }
    })
    .catch((e) => {
      alert("Cannot Update Records While Offline.");
      // stopLoadingIndicator();
      console.log("You may be offline.", e);
    });
};
