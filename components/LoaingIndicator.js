import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Dimensions, Text, View } from "react-native";
import { EventRegister } from "react-native-event-listeners";
import { Portal } from "react-native-portalize";

export default function LoaingIndicator() {
  const { width, height } = Dimensions.get("window");
  const box_size = 70;

  const [showLoadingIndicator, setshowLoadingIndicator] = useState(false);
  const openLoadingIndicatorListener = useRef();
  const closeLoadingIndicatorListener = useRef();

  useEffect(() => {
    openLoadingIndicatorListener.current = EventRegister.addEventListener(
      "startLoadingIndicator",
      ({ title, options }) => {
        setshowLoadingIndicator({ title, options });
      }
    );
    closeLoadingIndicatorListener.current = EventRegister.addEventListener(
      "stopLoadingIndicator",
      () => {
        setshowLoadingIndicator(false);
      }
    );

    return () => {
      EventRegister.removeEventListener(openLoadingIndicatorListener.current);
      EventRegister.removeEventListener(closeLoadingIndicatorListener.current);
    };
  }, []);

  return showLoadingIndicator ? (
    <Portal>
      <View
        style={{
          height: height,
          width: width,
          position: "absolute",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(0,0,0, 0.1)",
        }}
      >
        <View
          style={{
            padding: 18,
            paddingTop: showLoadingIndicator.title ? 26 : 18,

            alignItems: "center",
            justifyContent: "center",
            borderRadius: 5,
            marginBottom: "30%",
            /*    height: box_size,
          width: box_size, */
            backgroundColor: "white",

            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 12,
            },
            shadowOpacity: 0.58,
            shadowRadius: 16.0,

            elevation: 24,
          }}
        >
          <ActivityIndicator animating={true} color="#525252" size={40} />

          {showLoadingIndicator.title ? (
            <Text style={{ fontFamily: "Poppins", marginTop: 15 }}>
              {showLoadingIndicator.title}
            </Text>
          ) : null}
        </View>
      </View>
    </Portal>
  ) : null;
}
