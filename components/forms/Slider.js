import { View, Text } from "react-native";
import React from "react";
import { caption_text_color, primary_color_blur } from "@/config/theme";
import RNSlider from "@react-native-community/slider";
import Caption from "@/components/typography/Caption";

export default function Slider({
  label,
  required,
  type,
  value,
  onChange,
  height,
  style,
}) {
  return (
    <View
      style={[
        {
          borderRadius: 5,
          width: "100%",
          minHeight: height,
        },
        style,
      ]}
    >
      <View style={{ paddingLeft: 3 }}>
        <Caption
          style={{
            marginBottom: 6,
            color: type == "view" ? primary_color_blur : caption_text_color,
          }}
        >
          {label ? label : title ? title : "label"}
        </Caption>
        {required ? (
          <Text
            style={{
              position: "absolute",
              right: 0,
              top: 10,
              color: "red",
            }}
          >
            *
          </Text>
        ) : null}
      </View>
      {type == "view" ? (
        <View
          style={{
            //    height: 45,
            paddingHorizontal: 10,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: disabled ? "#B8B8B8" : color ? color : "black",
              fontSize: 17,
              fontFamily: "Poppins-500",
              marginTop: 3,
              lineHeight: 20,
            }}
          >
            {value}
          </Text>
        </View>
      ) : (
        <RNSlider
          style={{ width: 200, height: 40 }}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
        />
      )}
    </View>
  );
}
