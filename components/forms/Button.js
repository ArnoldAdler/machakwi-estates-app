import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { in_active, primary_color, text_color_primary } from "@/config/theme";

export default function Button({
  variant,
  fontStyle,
  color,
  height,
  width,
  text,
  onPress,
  textColor,
  border_radius,
  bold,
  fontSize,
  style,
  title,
  icon,
  loading,
  loadingProgress,
  disabled,
  small,
}) {
  return (
    <View
      style={[
        {
          width: "100%",
          borderRadius: 5,
          marginVertical: 5,
        },
      ]}
    >
      <TouchableOpacity
        disabled={disabled}
        style={{
          height: height ? height : small ? 43 : 53,
          width: width ? width : "100%",

          borderRadius: border_radius ? border_radius : 5,
          backgroundColor: disabled
            ? in_active
            : variant == "outlined"
            ? "transparent"
            : color
            ? color
            : primary_color,
          justifyContent: "center",
          alignItems: "center",
          /*     marginVertical: 5,
                        marginHorizontal: 5, */
          alignSelf: "center",
          borderWidth: variant == "outlined" ? 0.5 : null,
          borderColor:
            variant == "outlined" ? (color ? color : text_color_primary) : null,
          flexDirection: "row",
          paddingHorizontal: 10,
          ...style,
        }}
        onPress={onPress ? onPress : null}
      >
        {icon ? <View style={{ marginRight: 10 }}>{icon}</View> : null}

        <Text
          style={[
            {
              textAlign: "center",
              color: textColor ? textColor : "white",
              fontFamily: "Poppins-500",
              fontSize: fontSize ? fontSize : small ? 15 : 19,
            },
            fontStyle,
          ]}
        >
          {" "}
          {loading ? (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ActivityIndicator
                animating={true}
                color={textColor ? textColor : "white"}
                size={50}
              />
              {!loadingProgress ? (
                <Text style={{ color: "white" }}>{loadingProgress}</Text>
              ) : null}
            </View>
          ) : text || title ? (
            text || title
          ) : (
            "PLC Text"
          )}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "orange",
    alignItems: "center",
    justifyContent: "center",
  },
});
