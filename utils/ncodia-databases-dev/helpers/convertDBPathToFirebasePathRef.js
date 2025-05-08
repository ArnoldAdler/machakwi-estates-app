import {
  collection,
  doc,
  getFirestore,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { isEven } from "./isEven";
import { dbOptions } from "../firebase/initFirebase";

export const convertDBPathToFirebasePathRef = (path, options) => {
  var dbPrefix = dbOptions.dbPrefix || "";

  var no_pre_fix = options && options.noPrefix;
  const dbPath = `${
    dbPrefix && !no_pre_fix ? dbPrefix + "." : ""
  }${path}`.split(".");

  var pathIsDoc = isEven(dbPath.length);

  if (pathIsDoc) {
    return doc(getFirestore(), ...dbPath);
  } else {
    if (options && options.type == "get") {
      const collectionRef = collection(getFirestore(), ...dbPath);
      return query(
        collectionRef,
        orderBy(options?.sortBy || "createdAt", "desc"),
        limit(options?.limit || 500)
      );
    }
    const subCollectionDocRef = doc(collection(getFirestore(), ...dbPath));
    return subCollectionDocRef;
    // return query(
    //   subCollectionRef,
    //   orderBy(options?.sortBy || "createdAt", "desc")
    // );
  }

  // const db = getFirestore(app);
  // const collectionRef = collection(db, path);
  // const querySnapshot = firebaseQuery(collectionRef);
};
