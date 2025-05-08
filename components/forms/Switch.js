import { View, Text, Switch as RNSwitch } from "react-native";
import React, { useState } from "react";
import H3 from "@/components/typography/H3";
import { danger_color, primary_color, success_color } from "@/config/theme";
export default function Switch({
  trueText,
  falseText,
  value,
  label,
  onChange,
  type,
}) {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <H3 style={{ flex: 1 }}>
        {label ? label : "Paid"} : {"   "}
        <Text style={{ color: value ? success_color : danger_color }}>
          {value
            ? trueText
              ? trueText
              : "True"
            : falseText
            ? falseText
            : "False"}
        </Text>
      </H3>
      {type == "view" ? null : (
        <RNSwitch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={value ? primary_color : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => {
            if (onChange) onChange(!value);
          }}
          value={value}
        />
      )}
    </View>
  );
}
