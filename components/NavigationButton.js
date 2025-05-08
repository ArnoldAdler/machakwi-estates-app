import { View, TouchableOpacity } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import Text from "@/components/Text";

export default function NavigationButton({
  name,
  title,
  children,
  onClick,
  style,
}) {
  return (
    <TouchableOpacity
      onPress={onClick}
      style={{
        backgroundColor: "#348CEB",
        marginVertical: 25,
        borderRadius: 5,
        height: 85,
        justifyContent: "center",
        flexDirection: "row",
        ...style,
      }}
    >
      <View
        style={{
          justifyContent: "center",
          padding: 10,
          width: "76%",
        }}
      >
        <Text
          style={{
            fontSize: 18,
            textTransform: "uppercase",
            color: "white",
          }}
          fontWeight={"600"}
        >
          {name || title || children}
        </Text>
      </View>
      <View
        style={{
          justifyContent: "center",
          padding: 10,
        }}
      >
        <Entypo name="chevron-right" size={26} color="white" />
      </View>
    </TouchableOpacity>
  );
}
