import React from "react";
import { Text } from "react-native";

export default function H2({ children, style }) {
  return (
    <Text
      style={[
        {
          fontSize: 22,
          lineHeight: 24,
          fontFamily: "Poppins-600",
          color: "rgba(0,0,0, 1)",
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}
