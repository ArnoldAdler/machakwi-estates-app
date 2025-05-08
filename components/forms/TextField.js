import Caption from "@/components/typography/Caption";
import { primary_color_blur } from "@/config/theme";
import { Ionicons } from "@expo/vector-icons";
import React, { useRef } from "react";
import {
  Animated,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
export default function TextField({
  disabled,
  height,
  multiline,
  keyboardType,
  autoCapitalize,
  label,
  placeholder,
  required,
  value,
  onChangeText,
  onFocus,
  borderColor,
  color,
  title,
  style,
  onBlur,
  textContentType,
  secureTextEntry,
  onChange,
  type,
}) {
  const focusColor = useRef(new Animated.Value(0)).current;

  const focus = () => {
    Animated.timing(focusColor, {
      toValue: 1,
      duration: 16,
      useNativeDriver: false,
    }).start();
  };
  const unFocus = () => {
    Animated.timing(focusColor, {
      toValue: 0,
      duration: 16,
      useNativeDriver: false,
    }).start();
  };

  const focusColor2 = focusColor.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgba(0, 0, 0, 0.3)", primary_color_blur],
  });
  const borderWidth = focusColor.interpolate({
    inputRange: [0, 1],
    outputRange: [1.5, 2],
  });

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
            color: type == "view" ? primary_color_blur : "black",
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
        <Animated.View
          style={{
            backgroundColor: "rgba(229, 229, 229, 1)",
            borderRadius: 3,
            borderWidth: borderWidth,
            borderColor: focusColor2,
            overflow: "hidden",
            flexDirection: "row",
            height: 100,
          }}
        >
          <View
            style={{
              paddingVertical: 10,
              flexDirection: "row",
              overflow: "hidden",
              height: 100,
              width: "100%",
              alignItems: "flex-start",
            }}
          >
            <TextInput
              secureTextEntry={secureTextEntry}
              editable={!disabled}
              keyboardType={keyboardType}
              multiline={true}
              autoCapitalize={autoCapitalize}
              onChangeText={(v) => {
                if (onChangeText) {
                  onChangeText(v);
                }
                if (onChange) {
                  onChange(v);
                }
              }}
              textContentType={textContentType}
              onFocus={() => {
                focus();
                if (onFocus) onFocus();
              }}
              onBlur={() => {
                unFocus();
                if (onBlur) onBlur();
              }}
              value={value}
              placeholder={placeholder}
              pla
              InputProps={{ disableUnderline: true }}
              style={{
                color: disabled ? "#B8B8B8" : color ? color : "black",
                fontSize: 17,
                flex: 1,
                lineHeight: 20,
                fontFamily: "Poppins-500",
                paddingHorizontal: 10,
              }}
            />
            {!disabled ? (
              value ? (
                value.length != 0 ? (
                  <TouchableOpacity
                    onPress={() => {
                      if (onChangeText) onChangeText("");
                      if (onChange) onChange("");
                    }}
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      paddingLeft: 6,
                      height: 45,
                      width: 40,
                      bottom: 8,
                    }}
                  >
                    <Ionicons
                      name="close-circle-outline"
                      size={18}
                      color="rgba(0,0,0, 0.5)"
                    />
                  </TouchableOpacity>
                ) : null
              ) : null
            ) : null}
          </View>
        </Animated.View>
      )}
    </View>
  );
}
