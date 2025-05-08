//V-1

import { errors } from "HelperFunctions/errors";
import { initializeApp } from "firebase/app";
import {
  FieldValue,
  Timestamp,
  arrayRemove,
  arrayUnion,
  collection,
  connectFirestoreEmulator,
  deleteDoc,
  doc,
  enableIndexedDbPersistence,
  getDoc,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
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
import { iNetApi } from "../Config/index";
import { isDev } from "../Config";
import { isEven } from "./Numbers/isEven";
import axios from "axios";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { activity } from "./activity";

// import {
//   startLoadingIndicator,
//   stopLoadingIndicator,
// } from "./loadingIndicator";
const startLoadingIndicator = () => {
  console.log("No Func startLoadingIndicator() disabled for mobile");
};
const stopLoadingIndicator = () => {
  console.log("No Func stopLoadingIndicator() disabled for mobile");
};
// import { toastNormal } from "./toast";
const toastNormal = () => {
  console.log("No Func ToastNormal() disabled for mobile");
};
import { user as userClass } from "./user";
import { users } from "./users";
// Initialize Firebase
export var app;
export var messaging;
////
var dashboardNotifications = [];
var dashboardNotificationOptions = {};
var user = {};
var dbPrefix = "";

const getPath = (path, options) => {
  var no_pre_fix = options && options.noPrefix;
  const dbPath = `${
    dbPrefix && !no_pre_fix ? dbPrefix + "." : ""
  }${path}`.split(".");
  var pathIsDoc = isEven(dbPath.length);

  if (pathIsDoc) {
    return doc(getFirestore(), ...dbPath);
  } else {
    if (options && options.type == "get")
      return collection(getFirestore(), ...dbPath);
    return doc(collection(getFirestore(), ...dbPath));
  }
};
class Firebase {
  init = (config, options) => {
    try {
      app = initializeApp(config);
      //////////
      var useEmulator =
        options?.mode == "production" || options?.mode == "production_fix"
          ? false
          : true;
      if (useEmulator)
        connectFirestoreEmulator(getFirestore(), "127.0.0.1", 8080);
      ///////
      messaging = getMessaging(app);
      console.log(
        "%c***********Firebase App Initialised***********",
        "background: #222; color: #bada55"
      );
    } catch (error) {
      alert("App could not connect to database 298");
      console.log(
        "%c***********Firebase App Initialisation Failed***********",
        "background: #222; color: #FF0000",
        error
      );
    }
  };
}
class Datatbase {
  constructor() {
    this.db = app ? getFirestore() : null;
    this.arrayUnion = arrayUnion;
    this.FieldValue = FieldValue;
    this.arrayRemove = arrayRemove;
    this.query = query;
  }
  init = (config, options) => {
    try {
      app = initializeApp(config);
      //////////
      var useEmulator =
        options?.mode == "production" || options?.mode == "production_fix"
          ? false
          : true;
      if (useEmulator)
        connectFirestoreEmulator(getFirestore(), "127.0.0.1", 8080);
      console.log(
        "%c***********Firebase App Initialised***********",
        "background: #222; color: #bada55"
      );
    } catch (error) {
      alert("App could not connect to database 253");
      console.log(
        "%c***********Firebase App Initialisation Failed***********",
        "background: #222; color: #FF0000",
        error
      );
    }
  };
  //////////////////////////////////
  setPrefix = (prefix) => {
    dbPrefix = prefix;
  };
  //////////////////////////////////
  enableOfflinePersistence = (onSuccess, onError) => {
    enableIndexedDbPersistence(getFirestore())
      .then(() => {
        onSuccess("Offline Persistence Enabled");
        console.log("Offline Persistence Enabled");
      })
      .catch((error) => {
        if (error.code == "failed-precondition") {
          // Multiple tabs open, persistence can only be enabled
          // in one tab at a a time.
          // ...
        } else if (error.code == "unimplemented") {
          // The current browser does not support all of the
          // features required to enable persistence
          // ...
        }
      });
  };

  //////////////////////////////////
  getOnce = async (path, onSuccess, onError, options) => {
    var docRef = getPath(path, {
      ...options,
      type: "get",
    });
    var pathIsDoc = isEven(path.split(".").length);
    if (pathIsDoc) {
      return docRef.get().then((doc) => {
        if (doc.exists) {
          // Document found, return the data
          if (onSuccess) onSuccess(doc.data());
        } else {
          // Document not found, return an error message
          if (onError) onError("Doc not found");
        }
      });
    } else {
      return docRef.getDocs().then((docs) => {
        var data = docs.map((doc) => {
          var docData = doc.data();
          const id = doc.id;
          const extraKeys = addKeys ? addKeys : {};
          var docObj = { ...docData, ...extraKeys, documentId: id };

          if (docData.date) docObj["date"] = docData.date.toDate();
          if (docData.createdAt)
            docObj["createdAt"] = docData.createdAt.toDate();
          if (docData.updatedAt)
            docObj["updatedAt"] = docData.updatedAt.toDate();

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
  //////
  async add(path, data, onSuccess, onError, options) {
    const skipCreatedBy =
      options && options.skipCreatedBy ? options.skipCreatedBy : undefined;
    const skipCreatedAt =
      options && options.skipCreatedAt ? options.skipCreatedAt : undefined;

    var docRef = getPath(path, options);
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
            if (!skipCreatedBy)
              dataToBeSaved["createdBy"] = {
                id: userClass.getId() ? userClass.getId() : "",
                name: userClass.getName() ? userClass.getName() : "Developer",
              };
            if (!skipCreatedAt)
              dataToBeSaved["createdAt"] = Timestamp.fromDate(new Date());

            setDoc(docRef, dataToBeSaved, { merge: true })
              .then((v) => {
                if (onSuccess) onSuccess(docRef.id);
                if (options && options.activity)
                  activity.register(options.activity);
              })
              .catch(onError);
          } catch (error) {
            onError(error);
          }
        }
      })
      .catch((e) => {
        alert("Cannot Update Records While Offline.");
        stopLoadingIndicator();
        console.log("You may be offline.", e);
      });
  }
  //////////////////////////////////
  async get(path, onSuccess, onError, options) {
    const addKeys = options && options.addKeys ? options.addKeys : undefined;
    const query = options && options.query ? options.query : undefined;
    const sortById = options && options.sortById ? options.sortById : undefined;
    /////
    var docRef = getPath(path, {
      ...options,
      type: "get",
    });
    var pathIsDoc = isEven(path.split(".").length);
    try {
      if (pathIsDoc) {
        //const doc = await getDoc(docRef);
        onSnapshot(
          docRef,
          (doc) => {
            if (doc.exists()) {
              const data = doc.data();
              const id = doc.id;
              const extraKeys = addKeys ? addKeys : {};
              var docObj = { ...data, ...extraKeys, documentId: id };
              if (!docObj["id"]) docObj["id"] = id;

              onSuccess(docObj);
            } else {
              onSuccess({});
            }
          },
          (error) => {
            if (onError) onError(error);
          }
        );
      } else {
        //Else its a collection
        if (query) {
          const splitQuery = query.split(" ");
          var queryDataFormatted = splitQuery.map((queryPart) => {
            if (queryPart == "true") {
              return true;
            }
            if (queryPart == "false") {
              return false;
            }
            return queryPart;
          });
          docRef = this.query(docRef, where(...queryDataFormatted));
        }
        if (!sortById) {
          docRef = this.query(docRef, orderBy("createdAt", "desc"));
        }

        onSnapshot(
          docRef,
          ({ docs }) => {
            console.log("path", path);
            var data = docs.map((doc) => {
              var docData = doc.data();
              const id = doc.id;
              const extraKeys = addKeys ? addKeys : {};
              var docObj = { ...docData, ...extraKeys, documentId: id };

              if (docData.date) docObj["date"] = docData.date.toDate();
              if (docData.createdAt)
                docObj["createdAt"] = docData.createdAt.toDate();
              if (docData.updatedAt)
                docObj["updatedAt"] = docData.updatedAt.toDate();

              if (!docObj["id"]) docObj["id"] = id;
              return docObj;
            });

            sortById
              ? onSuccess(
                  data.sort(function (a, b) {
                    return b.id.localeCompare(a.id);
                  })
                )
              : onSuccess(data);
          },
          (error) => {
            if (onError) onError(error);
          }
        );
      }
    } catch (e) {
      console.log("GET_RECORD_ERROR", e);
    }
  }
  //////////////////////////////////
  async update(path, data, onSuccess, onError) {
    var docRef = getPath(path);
    ///

    getDoc(docRef)
      .then((doc) => {
        if (doc.exists) {
          // Document found, return the data
          // return doc.data();
          try {
            updateDoc(docRef, {
              ...data,
              updatedBy: {
                id: userClass.getId() ? userClass.getId() : "",
                name: userClass.getName() ? userClass.getName() : "Developer",
              },
              updatedAt: Timestamp.fromDate(new Date()),
            })
              .then((v) => {
                console.log("DATA UPDATED", data);

                if (onSuccess) onSuccess(v);
                else {
                  stopLoadingIndicator();
                }
                //
              })
              .catch((e) => {
                console.log(
                  "%cFIREBASE DOCUMENT UPDATE ERROR",
                  "background: #222; color: #FF0000"
                );
                console.log(e);
                if (e.message.substring(0, 21) == "No document to update") {
                  db.add(path, data, onSuccess, onError);
                }
                console.log("DATA TO BE SAVED", data);
                errors.addError(e, { code: 209 });
                if (onError) onError(e);
                else stopLoadingIndicator();

                // Common Firebase errors:
                // 'permission-denied': User lacks required permissions.
                // 'unavailable': Server unavailable or network issues.
                // 'invalid-argument': Invalid data or operation.
                // 'not-found': Document doesn't exist.
                //
              });
          } catch (error) {
            if (onError) onError(error);
            else console.log("FIREBASE ERROR", error);
            stopLoadingIndicator();
          }
        } else {
          // Document not found, return an error message
          const id = doc.id;
          onError(`DOCUMENT OF ID ${id} DOSEN'T EXISTS`);
        }
      })
      .catch(() => {
        alert("Cannot Update Records While Offline.");
        stopLoadingIndicator();
        console.log("You may be offline.");
      });
  }
  //////////////////////////////////
  async delete(path, onSuccess, onError, options) {
    var deleteText = options
      ? options.indicatorText
        ? options.indicatorText
        : "Deleting..."
      : "Deleting...";
    startLoadingIndicator(deleteText);
    var docRef = getPath(path);
    /*  if (!data) {
      alert("No data passed to delete doc function.");
      return;
    } */
    const dbPath = path.split(".");
    var docId = dbPath[dbPath.length - 1];

    ///
    getDoc(docRef)
      .then((doc) => {
        if (doc.exists()) {
          deleteDoc(docRef)
            .then((v) => {
              if (onSuccess) onSuccess(v);
              stopLoadingIndicator();
              db.add(`trash.${docId}`, {
                ...doc.data(),
                deletedAt: Timestamp.fromDate(new Date()),
              });
            })
            .catch((error) => {
              if (onError) onError(error);
              else console.log("FIREBASE ERROR", error);
              stopLoadingIndicator();
            });
        } else {
          stopLoadingIndicator();
          const id = doc.id;
          onError(`DOCUMENT OF ID ${id} DOSEN'T EXISTS`);
        }
      })
      .catch(() => {
        alert("Cannot Update Records While Offline.");
        stopLoadingIndicator();
        console.log("You may be offline.");
      });
    //
  }
  //////////////////////////////////
}
class Auth {
  constructor() {
    this.onAuthStateChanged_firebase = onAuthStateChanged;
    this.signOut_firebase = signOut;
    this.createUserWithEmailAndPassword_firebase =
      createUserWithEmailAndPassword;
    this.signInWithEmailAndPassword_firebase = signInWithEmailAndPassword;
  }
  //////////////////////////////////
  currentUser = () => getAuth(app).currentUser;
  //////////////////////////////////
  onAuthChanged = (onSuccess, onError) => {
    this.onAuthStateChanged_firebase(getAuth(app), (user) => {
      onSuccess(user);
    });
  };
  //////////////////////////////////
  signOut = async (onSuccess, onError) => {
    await this.signOut_firebase(getAuth(app)).then(onSuccess).catch(onError);
  };
  //////////////////////////////////
  createUserWithEmailAndPassword = async (
    email,
    password,
    onSuccess,
    onError
  ) => {
    this.createUserWithEmailAndPassword_firebase(getAuth(app), email, password)
      .then(onSuccess)
      .catch(onError);
  };
  //////////////////////////////////
  signInWithEmailAndPassword = async (email, password, onSuccess, onError) => {
    this.signInWithEmailAndPassword_firebase(getAuth(app), email, password)
      .then((v) => {
        console.log(
          "%cFirebase Login Successful :",
          "background: #222; color: #bada55",
          { email: v.user.email, uid: v.user.uid }
        );
        if (onSuccess) onSuccess(v);
      })
      .catch((e) => {
        console.log(
          "%cFirebase Login Error :",
          "background: #222; color: #FF0000",
          e
        );
        if (onError) onError(e);
      });
  };
}
class Storage {
  //////////////////////////////////
  uploadFile = (file, path, onSnapShot, onSuccess, onError) => {
    const storageRef = ref(getStorage(app), path);

    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        onSnapShot(progress);
      },
      onError,
      () => {
        getDownloadURL(storageRef).then((url) => {
          onSuccess(url);
        });
      }
    );
  };
  //////////////////////////////////
  deleteFile = (fileUrl, onSuccess, onError) => {
    const storageRef = ref(getStorage(app), fileUrl);
    deleteObject(storageRef).then(onSuccess).catch(onError);
  };
  //////////////////////////////////
}
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      var notification = payload.notification;
      var { title, body } = notification;
      toastNormal(
        <>
          <strong className="text-secondary">{title}</strong> {body}
        </>
      );
      resolve(payload);
    });
  });
class Notifications {
  ////
  init = (dashboardNotifications_, options) => {
    if (dashboardNotifications_)
      dashboardNotifications = dashboardNotifications_;
    if (options)
      dashboardNotificationOptions = {
        ...dashboardNotificationOptions,
        ...options,
      };
  };
  ////////
  getToken = (onSuccess, onError) => {
    if (!dashboardNotificationOptions?.webPushNotifications?.key)
      alert(
        "DEV Alert: Please Insert the webPushNotifications.key. to allow notifications."
      );
    getToken(messaging, {
      vapidKey: dashboardNotificationOptions?.webPushNotifications?.key ?? "",
    })
      .then((currentToken) => {
        if (currentToken) {
          console.log("current token for client: ", currentToken);
          if (onSuccess) onSuccess(currentToken);
          return currentToken;
        } else {
          console.log(
            "No registration token available. Request permission to generate one."
          );
          if (onError) onError("");
          return "";
        }
      })
      .catch((err) => {
        if (onError) onError(err);
        console.log("An error occurred while retrieving token. ", err);
        // catch error while creating client token
      });
  };

  sendNotifications = (notificationId, { title, body, name, message, msg }) => {
    message = message || msg || body;
    title = title || name;

    var data = dashboardNotifications.find((item, i) => {
      return item.id == notificationId;
    });
    if (!data) {
      console.log(
        `PLEASE FIX THIS: NO NOTIFICATION ID OF "${notificationId}" WAS FOUND.`
      );
      return;
    }
    data.sendTo.map((item, i) => {
      if (item.typeId == "email") {
        // axios
        //   .post(`${iNetApi}/send-email`, {
        //     to: item.value,
        //     subject: message,
        //     message: message,
        //   })
        //   .then((v) => {
        //     console.log("Resaults:", v);
        //   })
        //   .catch((e) => {
        //     console.log("Error:", e);
        //   });
      }
      if (item.typeId == "sms_za") {
        if (isDev) {
          toastNormal(
            `SMS ZA Notification Placeholder To:${
              item.value ?? ""
            }; Message:${message}`
          );
        } else {
          axios
            .post(
              `${iNetApi}/send-sms`,
              {
                phoneNumber: item.value,
                message: message,
              },
              {
                headers: { "Access-Control-Allow-Origin": "*" },
              }
            )
            .then((v) => {
              console.log("Resaults:", v);
            })
            .catch((e) => {
              console.log("Error:", e);
            });
        }
      }
      if (item.typeId == "web_app") {
        var adminUsers = users.getEmployees();
        ///
        var sendWebNotification = (notificationToken) => {
          var data = JSON.stringify({
            to: notificationToken,
            notification: {
              body: message,
              title: title,
              icon: dashboardNotificationOptions?.webPushNotifications
                ?.iconLink,
            },
          });
          var config = {
            method: "post",
            url: "https://fcm.googleapis.com/fcm/send",
            headers: {
              "Content-Type": "application/json",
              Authorization: `key=${dashboardNotificationOptions?.webPushNotifications?.apiAuthorizationKey}`,
            },
            data: data,
          };
          if (isDev) {
            toastNormal(
              `Web Notification Placeholder To:${
                item.user?.id ?? ""
              }; Title:${title} ; token: ${notificationToken}`
            );
          } else {
            axios(config)
              .then(function (response) {
                console.log(JSON.stringify(response.data));
              })
              .catch(function (error) {
                console.log(error);
              });
          }
        };

        ////
        if (item.user?.id == "all_users" || item.user?.userId == "all_users") {
          var guestRecievers = dashboardNotificationOptions?.guestUsers;
          if (guestRecievers) {
            [...guestRecievers, ...adminUsers].map((reciever) => {
              var token = reciever.token || reciever.webPushNotificationToken;
              if (token) sendWebNotification(token);
            });
          }
          return;
        }
        ////
        var user = adminUsers.find((user) => {
          return user.userId == item.user?.id;
        });
        if (user && user.webNotificationsToken) {
          sendWebNotification(user.webNotificationsToken);
        }
      }
    });
  };

  requestSendingNotification = (onSuccess, onError) => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          console.log("Notification permission granted.");
          var token = this.getToken(onSuccess, onError);
          return token;
        } else {
          console.log("Unable to get permission to notify.");
        }
      });
    } else {
      // Alert.normal("Notifications Enabled");
      console.log("Notification permission already granted.");
    }
  };
}

export const notifications = new Notifications();
export const firebase = new Firebase();
export const db = new Datatbase();

export const auth = new Auth();
export const storage = new Storage();
