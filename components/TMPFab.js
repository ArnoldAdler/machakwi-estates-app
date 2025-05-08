import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { Dimensions, TouchableOpacity } from "react-native";
import { primary_color } from "@/config/theme";
export default function TMPFab({ onPress, style }) {
  const { width, height } = Dimensions.get("window");
  const fab_size = 60;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        height: fab_size,
        width: fab_size,
        position: "absolute",
        bottom: 100,
        // top: height - 163,
        right: 35,
        backgroundColor: primary_color,
        borderRadius: 50,
        zIndex: 1000,
        alignItems: "center",
        justifyContent: "center",
        opacity: 0.7,
        ...style,
      }}
    >
      <FontAwesome5 name="plus" size={18} color="white" />
    </TouchableOpacity>
  );
}
