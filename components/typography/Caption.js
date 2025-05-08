import React from "react";
import { View, Text } from "react-native";
import { text_color_primary } from "@/config/theme";

export default function Caption({ children, style }) {
  return (
    <Text
      style={[
        {
          fontSize: 14,
          lineHeight: 16,
          fontFamily: "Poppins-500",
          color: text_color_primary,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}
