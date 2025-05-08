import { View, Text } from "react-native";
import React from "react";

export default function ScreenHeading({ title, color, underline }) {
  return (
    <>
      <View
        style={{
          width: "100%",
          // height: 90,
        }}
      >
        <Text
          style={{
            paddingTop: 30,
            paddingBottom: 5,
            paddingHorizontal: 10,
            // textAlign: "center",
            fontSize: 18,
            // textTransform: "uppercase",
            color: color || "#0F917A",
          }}
        >
          {title || "Screen Heading"}
        </Text>
      </View>
      {underline && (
        <View
          style={{
            backgroundColor: "rgba(0,0,0,0.2)",
            height: 1,
            width: "100%",
          }}
        ></View>
      )}
    </>
  );
}
