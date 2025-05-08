//V-1

import { useQuery } from "@tanstack/react-query";
import {
  FieldValue,
  arrayRemove,
  arrayUnion,
  query as firebaseQuery,
} from "firebase/firestore";
import { addFirebaseData } from "./firebase/addFirebaseData";
import { addSupabaseData } from "./supabase/addSupabaseData";
import { deleteFirebaseData } from "./firebase/deleteFirebaseData";
import { deleteSupabaseData } from "./supabase/deleteSupabaseData";
import { getFirebaseData } from "./firebase/getFirebaseData";
import { getSupabaseData } from "./supabase/getSupabaseData";
import { getOnceFirebaseData } from "./firebase/getOnceFirebaseData";
import { getOnceSupabaseData } from "./supabase/getOnceSupabaseData";
import { dbOptions, dbUser, reactQueryInstance } from "./firebase/initFirebase";
import { updateFirebaseData } from "./firebase/updateFirebaseData";
import { updateSupabaseData } from "./supabase/updateSupabaseData";
/* import {
  API_KEY,
  REACT_APP_AUTH_DOMAIN,
  DATABASE_URL,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
  MEASUREMENT_ID,
} from "@env"; */
///
// import { user as dbUser } from "./user";

// Initialize Firebase
export var messaging;
///////
class Datatbase {
  constructor(databaseName) {
    this.databaseName = databaseName;
  }
  //////////////////////////////////
  // enableOfflinePersistence = (onSuccess, onError) => {
  //   enableIndexedDbPersistence(getFirestore())
  //     .then(() => {
  //       onSuccess("Offline Persistence Enabled");
  //       console.log("Offline Persistence Enabled");
  //     })
  //     .catch((error) => {
  //       if (error.code == "failed-precondition") {
  //         // Multiple tabs open, persistence can only be enabled
  //         // in one tab at a a time.
  //         // ...
  //       } else if (error.code == "unimplemented") {
  //         // The current browser does not support all of the
  //         // features required to enable persistence
  //         // ...
  //       }
  //     });
  // };

  // //////////////////////////////////
  getOnce = (path, onSuccess, onError, options) => {
    var dbName = this.databaseName || options?.database;

    if (dbName == "firebase" || !dbName) {
      return useQuery({
        queryKey: path,
        queryFn: async () => {
          return new Promise((resolve, reject) => {
            getOnceFirebaseData(
              path,
              (data) => {
                console.log("NEW DATA", path);
                resolve(data);
              },
              () => {
                reject();
              },
              options
            );
          });
        },
        staleTime: 10000,
      });
    }
    if (dbName == "supabase") {
      getOnceSupabaseData(path, onSuccess, onError, options);
    }
  };
  /////////
  arrayUnion = arrayUnion;
  FieldValue = FieldValue;
  arrayRemove = arrayRemove;
  query = firebaseQuery;
  // //////
  add(path, data, onSuccess, onError, options) {
    var dbName = this.databaseName || options?.database;

    if (dbName == "firebase" || !dbName) {
      addFirebaseData(path, data, onSuccess, onError, options);
    }
    if (dbName == "supabase") {
      addSupabaseData(path, data, onSuccess, onError, options);
    }
  }

  //////////////////////////////////
  get = (path, onSuccess, oError, options) => {
    var dbName = this.databaseName || options?.database;
    //
    return useQuery({
      queryKey: [path],
      queryFn: async () => {
        var modeAbbrev = dbOptions.mode?.substring(0, 1);
        //
        var currentValue = reactQueryInstance.getQueryData(path);
        if (currentValue) {
          return new Promise((resolve, reject) => {
            console.log(
              `${path}  CURRENT DATA, [${currentValue.length}] ${modeAbbrev} ${
                options?.sortBy
                  ? `Sorted & Includes only "${options?.sortBy}"`
                  : ""
              }`
            );
            resolve(currentValue);
            if (onSuccess) onSuccess(currentValue);
          });
        }
        return new Promise((resolve, reject) => {
          if (dbName == "firebase" || !dbName) {
            getFirebaseData(
              path,
              (data) => {
                if (reactQueryInstance.getQueryData([path])) {
                  //Firebase snapshot wont be detected by usequery so update manually
                  console.log(
                    `${path}  UPDATE DATA, [${data.length}] ${modeAbbrev} ${
                      options?.sortBy
                        ? `Sorted & Includes only "${options?.sortBy}"`
                        : ""
                    }`
                    // `background: #222; color: #bada55`
                  );
                  reactQueryInstance.setQueryData(path, data);
                } else {
                  console.log(
                    `${path}  NEW DATA, [${data.length}] ${modeAbbrev} ${
                      options?.sortBy
                        ? `Sorted & Includes only "${options?.sortBy}"`
                        : ""
                    }`
                    // `background: #222; color:#0085D0`
                  );
                }
                resolve(data);
                if (onSuccess) onSuccess(data);
              },
              () => {
                reject();
              },
              options
            );
          }
          if (dbName == "supabase") {
            getSupabaseData(
              path,
              (data) => {
                if (reactQueryInstance.getQueryData([path])) {
                  //Firebase snapshot wont be detected by usequery so update manually
                  console.log(
                    `${path}  UPDATE DATA, [${data?.length}] ${modeAbbrev} ${
                      options?.sortBy
                        ? `Sorted & Includes only "${options?.sortBy}"`
                        : ""
                    }`
                    // `background: #222; color: #bada55`
                  );
                  reactQueryInstance.setQueryData(path, data);
                } else {
                  console.log(
                    `${path}  NEW DATA, [${data.length}] ${modeAbbrev} ${
                      options?.sortBy
                        ? `Sorted & Includes only "${options?.sortBy}"`
                        : ""
                    }`
                    // `background: #222; color:#0085D0`
                  );
                }

                resolve(data);
                if (onSuccess) onSuccess(data);
              },
              () => {
                reject();
              },
              options
            );
          }
        });
      },
      staleTime: 10000,
    });
  };
  update = (path, data, onSuccess, onError, options) => {
    var dbName = this.databaseName || options?.database;

    ////
    if (dbName == "firebase" || !dbName) {
      updateFirebaseData(path, data, onSuccess, onError);
    }
    if (dbName == "supabase") {
      updateSupabaseData(path, data, onSuccess, onError);
    }
  };
  delete = (path, onSuccess, onError, options) => {
    var dbName = this.databaseName || options?.database;
    ////
    if (dbName == "firebase" || !dbName) {
      deleteFirebaseData(path, onSuccess, onError);
    }
    if (dbName == "supabase") {
      deleteSupabaseData(path, onSuccess, onError);
    }
  };
  //////////////////////////////////
}

export const db = new Datatbase();
export const firebaseDB = new Datatbase("firebase");
export const supabaseDB = new Datatbase("supabase");
