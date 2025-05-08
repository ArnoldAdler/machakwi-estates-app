import cow_grey from "@/assets/images/cow_grey.png";
import { MainContext } from "@/contexts/MainContext";
import React, { useContext, useState } from "react";
import { ActivityIndicator, Image, Text, View } from "react-native";
import { Portal } from "react-native-portalize";

export default function AppLoadingIndicator() {
  const [dataLoadedLocal, setdataLoadedLocal] = useState(false);
  ///////////////////
  const { dataLoaded, setdataLoaded } = useContext(MainContext);
  ///////////////////

  return !dataLoaded ? (
    <Portal>
      <View
        style={{
          backgroundColor: "rgba(255,255,255,0.93)",
          flex: 1,
          position: "absolute",
          height: "100%",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            top: -100,
          }}
        >
          <Image
            style={{
              width: 200,
              height: 200,
              resizeMode: "contain",
            }}
            source={cow_grey}
          ></Image>
          <Text
            style={{
              fontSize: 25,
            }}
          >
            Machakwi Estates
          </Text>
        </View>

        <ActivityIndicator animating={true} color="#525252" size={80} />
      </View>
    </Portal>
  ) : null;
}
