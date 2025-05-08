import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  ToastAndroid,
  Platform,
  AlertIOS,
} from "react-native";
import { text_color_primary } from "@/config/theme";
import { isDev } from "@/config";
import image from "@/assets/images/logo.png";
// import {
//   stopLoadingIndicator,
// } from "../plugins/loadingIndicator";
export default function HeaderMain({ backAction, menuAction, title }) {
  const icon_size = 18;
  const font_color = text_color_primary;
  const image_size = 30;
  // stopLoadingIndicator();
  function notifyMessage(msg) {
    if (Platform.OS === "android") {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
      AlertIOS.alert(msg);
    }
  }
  return (
    <View
      style={{
        paddingHorizontal: 30,
      }}
    >
      <View
        style={{
          paddingTop: 15,
          flexDirection: "row",
          height: 80,
          justifyContent: "space-between",
          //backgroundColor: "#007ACC",
        }}
      >
        <View
          style={{ height: "100%", justifyContent: "center", paddingTop: 15 }}
        >
          <Image
            style={{
              height: image_size,
              width: image_size,
            }}
            source={image}
          ></Image>
        </View>
        <Text
          style={{
            marginTop: 30,
            fontWeight: "bold",
            fontSize: 20,
            color: "red",
          }}
        >
          {!isDev ? "DEV MODE" : ""}
        </Text>
        <TouchableOpacity
          onPress={() => {
            notifyMessage("This is a test message");
          }}
          style={{
            width: 50,
            //flexDirection: 'row',
            alignItems: "flex-end",
            justifyContent: "center",

            paddingRight: 0,
            paddingTop: 15,
          }}
        >
          <Ionicons name="menu" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View
        style={{
          backgroundColor: "black",
          height: 1,
          width: "100%",
        }}
      ></View>
    </View>
  );
}
