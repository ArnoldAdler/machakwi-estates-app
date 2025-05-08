import {
  Timestamp,
  deleteDoc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { dbUser } from "./initFirebase";
import { convertDBPathToFirebasePathRef } from "../helpers/convertDBPathToFirebasePathRef";
import { db } from "../database";
import { isEven } from "../helpers/isEven";

export const getOnceFirebaseData = async (
  path,
  onSuccess,
  onError,
  options
) => {
  /////////
  var docRef = convertDBPathToFirebasePathRef(path, {
    ...options,
    type: "get",
  });
  var pathIsDoc = isEven(path.split(".").length);
  if (pathIsDoc) {
    return docRef.get().then((doc) => {
      if (doc.exists) {
        if (onSuccess) onSuccess(doc.data());
      } else {
        if (onError) onError("Doc not found");
      }
    });
  } else {
    return docRef.getDocs().then((docs) => {
      var data = docs.map((doc) => {
        var docData = doc.data();
        const id = doc.id;
        const extraKeys = options?.addKeys ?? {};
        var docObj = { ...docData, ...extraKeys, documentId: id };

        if (docData.date) docObj["date"] = docData.date.toDate();
        if (docData.createdAt) docObj["createdAt"] = docData.createdAt.toDate();
        if (docData.updatedAt) docObj["updatedAt"] = docData.updatedAt.toDate();

        if (!docObj["id"]) docObj["id"] = id;
        return docObj;
      });
      if (onSuccess)
        onSuccess(
          data.sort(function (a, b) {
            return b.id.localeCompare(a.id);
          })
        );
    });
  }
};
