import React from "react";
import { View, Text } from "react-native";
import { text_color_primary } from "@/config/theme";

export default function H5({ children, style }) {
  return (
    <Text
      style={[
        {
          lineHeight: 20,

          fontSize: 14,
          fontFamily: "Poppins-600",
          color: text_color_primary,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}
