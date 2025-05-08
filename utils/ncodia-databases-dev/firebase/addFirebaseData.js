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

export const addFirebaseData = async (
  path,
  data,
  onSuccess,
  onError,
  options
) => {
  /////////
  console.log("DATA PATH:", path);
  console.log("DATA TO BE SAVED:", data);
  /////////////
  const skipCreatedBy =
    options && options.skipCreatedBy ? options.skipCreatedBy : undefined;
  const skipCreatedAt =
    options && options.skipCreatedAt ? options.skipCreatedAt : undefined;

  var docRef = convertDBPathToFirebasePathRef(path, options);
  ///
  getDoc(docRef)
    .then((doc) => {
      if (doc.exists()) {
        // Document found, return the data
        // return doc.data();
        const id = doc.id;
        // toastWarning(`DOCUMENT OF ID ${id} ALREADY EXISTS.`);
        // if(onError) onError(`DOCUMENT OF ID ${id} ALREADY EXISTS.`);
        console.log(`DOCUMENT OF ID ${id} ALREADY EXISTS.`);
        onError(`DOCUMENT OF ID ${id} ALREADY EXISTS.`);
        // var nextId = idTracking.calculateNextId(id);
        // var splitedPath = [...path.split(".")];
        // splitedPath[splitedPath.length - 1] = nextId;
        // path = splitedPath.join(".");
        // console.log("New Doc PAth:", path, doc.data());
        // this.add(path, data, onSuccess, onError, options);
      } else {
        // Document not found, return you can add the file
        try {
          var dataToBeSaved = {
            ...data,
          };
          if (!skipCreatedBy) dataToBeSaved["createdBy"] = dbUser;
          if (!skipCreatedAt)
            dataToBeSaved["createdAt"] = Timestamp.fromDate(new Date());
          dataToBeSaved["updatedAt"] = Timestamp.fromDate(new Date());

          setDoc(docRef, dataToBeSaved, { merge: true })
            .then((v) => {
              if (onSuccess) onSuccess(docRef.id);
            })
            .catch(onError);
        } catch (error) {
          onError(error);
        }
      }
    })
    .catch((e) => {
      alert("Cannot Update Records While Offline.");
      // stopLoadingIndicator();
      console.log("You may be offline.", e);
    });
};
