import { collection, doc, getFirestore } from "firebase/firestore";
import { dbOptions } from "../firebase/initFirebase";
import { isEven } from "./isEven";

export const formatDBPath = (path, options) => {
  var dbPrefix = dbOptions.dbPrefix || "";

  var no_pre_fix = options && options.noPrefix;
  const dbPath = `${
    dbPrefix && !no_pre_fix ? dbPrefix + "." : ""
  }${path}`.split(".");

  return dbPath;
  // const db = getFirestore(app);
  // const collectionRef = collection(db, path);
  // const querySnapshot = firebaseQuery(collectionRef);
};
