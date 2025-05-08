import React from "react";
import { View, Text } from "react-native";
import { text_color_primary } from "@/config/theme";

export default function H6({ numberOfLines, children, style }) {
  return (
    <Text
      style={[
        {
          lineHeight: 14,
          fontSize: 12,
          fontFamily: "Poppins-600",
          color: text_color_primary,
        },
        style,
      ]}
      numberOfLines={numberOfLines ? numberOfLines : null}
    >
      {children}
    </Text>
  );
}
