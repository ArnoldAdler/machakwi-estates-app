import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import React from "react";

export default function TransactionCard({
  icon,
  data1,
  data2,
  data3,
  data4,
  onPress,
  key,
  index,
}) {
  const { width, height } = Dimensions.get("window");
  return (
    <TouchableOpacity
      onPress={onPress}
      key={index.toString()}
      style={{
        height: 40,
        backgroundColor: "#F0F2F5",
        width: width - 60,
        flex: 1,
        alignItems: "center",
        marginRight: 30,
        marginBottom: 7,
        borderRadius: 5,
        flexDirection: "row",
      }}
    >
      {icon ? (
        <View
          style={{
            width: 50,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icon}
        </View>
      ) : null}

      <View
        style={{
          flex: 1,
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            color: "black",
            fontSize: 16,
          }}
        >
          {data1}
        </Text>
        <Text
          style={{
            color: "black",
            fontSize: 10,
          }}
        >
          {data3}
        </Text>
      </View>
      <View
        style={{
          paddingRight: 15,
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            color: "black",
            fontSize: 16,
          }}
        >
          {data2}
        </Text>
        <Text
          style={{
            fontSize: 12,
            textAlign: "right",
          }}
        >
          {data3}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
