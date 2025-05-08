import Axios from "axios";

var iNetApi = "https://i-net-app.ew.r.appspot.com";
export const sendLiveNotification = async (to, title, body, msgData) => {
  //
  if (!to || !title || !body) {
    alert("sendLiveNotification function is missing some paramaters");
    return;
  }
  if (typeof to == "object") {
    to.map((token) => {
      Axios.post(`${iNetApi}/expo-live-notifications`, {
        to: token,
        title,
        body,
      })
        .then((v) => {
          // toastNormal("Live Notification Sent");
          console.log("Live Notification Sent: ", token);
        })
        .catch((e) => {
          console.log("Expo Push Notification Error:", e);

          //  toastError("Live Notification Failed");
        });
    });
  } else {
    Axios.post(`${iNetApi}/expo-live-notifications`, {
      to,
      title,
      body,
    })
      .then((v) => {
        // toastNormal("Live Notification Sent");
        console.log("Live Notification Sent: ", token);
      })
      .catch((e) => {
        console.log("Error:", e);
        //  toastError("Live Notification Failed");
      });
  }
};
