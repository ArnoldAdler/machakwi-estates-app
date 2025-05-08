import { initializeApp } from "firebase/app";
import {
  collection,
  query as firebaseQuery,
  getFirestore,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { app } from "./initFirebase";
import { convertDBPathToFirebasePathRef } from "../helpers/convertDBPathToFirebasePathRef";
import { isEven } from "../helpers/isEven";

export const getFirebaseData = async (path, onSuccess, onError, options) => {
  const db = getFirestore(app);
  const collectionRef = collection(db, path);
  const querySnapshot = firebaseQuery(collectionRef);
  var docRef = convertDBPathToFirebasePathRef(path, {
    ...options,
    type: "get",
  });
  //////////////////
  var pathIsDoc = isEven(path.split(".").length);
  if (pathIsDoc) {
    return new Promise((resolve, reject) => {
      onSnapshot(
        docRef,
        (doc) => {
          if (doc.exists()) {
            const data = doc.data();
            const id = doc.id;
            const extraKeys = options?.addKeys ?? {};
            var docObj = { ...data, ...extraKeys, documentId: id };
            if (!docObj["id"]) docObj["id"] = id;

            onSuccess(docObj);
            resolve(docObj);
          } else {
            onSuccess({});
            resolve({});
          }
        },
        (error) => {
          if (onError) onError(error);
          reject(error);
        }
      );
    });
    //const doc = await getDoc(docRef);
  }
  return new Promise((resolve, reject) => {
    onSnapshot(
      docRef,
      (data) => {
        const formattedData = data.docs.map((doc) => {
          var docData = doc.data();
          const id = doc.id;
          //Add Extra keys provided in options
          const extraKeys = options?.addKeys ?? {};
          var docObj = { ...docData, ...extraKeys, documentId: id };
          if (docData.date) docObj["date"] = docData.date.toDate();
          if (docData.createdAt)
            docObj["createdAt"] = docData.createdAt.toDate();
          if (docData.updatedAt)
            docObj["updatedAt"] = docData.updatedAt.toDate();
          if (!docObj["id"]) docObj["id"] = id;
          return docObj;
        });
        resolve(formattedData);
        if (onSuccess) onSuccess(formattedData);
      },
      (error) => {
        console.error("ERROR FFFF fetching data:", error);
        if (onError) onError(error);
        reject(error);
      }
    );
  });
};
