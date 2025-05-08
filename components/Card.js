import React from "react";
import { View } from "react-native";

export default function Card({ children, style }) {
  return (
    <View
      style={{
        marginTop: 15,
      }}
    >
      <View
        style={{
          backgroundColor: "white",
          paddingVertical: 5,
          paddingHorizontal: 10,
          borderRadius: 5,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.2,
          shadowRadius: 1.41,
          elevation: 2,
          ...style,
        }}
      >
        {children}
      </View>
    </View>
  );
}
