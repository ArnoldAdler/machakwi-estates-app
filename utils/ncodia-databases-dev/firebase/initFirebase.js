import { getApps, initializeApp } from "firebase/app";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";

////

export var firebaseDB;
export var app;
export var reactQueryInstance;
export var dbOptions = {};
export var dbUser = {
  id: "",
  name: "Developer",
};
///
export const initFirebase = (config, databaseName, options) => {
  if (!config || !databaseName) {
    alert("Missing Params 6366");
    return;
  }

  try {
    if (!getApps().length) {
      app = initializeApp(config);
      firebaseDB = getFirestore(app);
      //////////
      var useEmulator =
        options?.mode == "production" || options?.mode == "production_fix"
          ? false
          : true;
      if (useEmulator)
        connectFirestoreEmulator(getFirestore(), "192.168.1.176", 8080);
      ////////
      reactQueryInstance = databaseName;
      dbOptions = options || {};
      console.log(
        `%c*********** ${
          useEmulator ? "LOCAL" : "FIREBASE PRODUCTION"
        } DATABASE***********`,
        `background: #222; color:${useEmulator ? "#bada55" : "#0085D0"}`
      );

      return firebaseDB;
    } else {
      console.log("Firebase already initialized.");
      return firebaseDB;
    }

    //////
  } catch (error) {
    if (
      error !=
      "[FirebaseError: Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.]"
    )
      alert("App could not connect to database 253");
    console.log(
      "%c***********Firebase App Initialisation Failed***********",
      "background: #222; color: #FF0000",
      error
    );
  }
};
