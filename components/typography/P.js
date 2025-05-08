import React from "react";
import { View, Text } from "react-native";
import { text_color_primary } from "@/config/theme";

export default function P({ children, style }) {
  return (
    <Text
      style={[
        {
          fontFamily: "Poppins",
          color: text_color_primary,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}
