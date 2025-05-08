import React, { useState, useContext, useRef, useEffect } from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  TextInput as RNTextInput,
  StyleSheet,
  Alert,
  ScrollView,
  FlatList,
  Image,
  BackgroundImage,
  Dimensions,
  Animated,
} from "react-native";
import {
  Entypo,
  AntDesign,
  EvilIcons,
  Feather,
  FontAwesome,
  FontAwesome5,
  Fontisto,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
  SimpleLineIcons,
  Zocial,
} from "@expo/vector-icons";
import { primary_color_blur } from "@/config/theme";
import Caption from "@/components/typography/Caption";
import { format } from "date-fns";
export default function TextInput({
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
  icon,
  inputType,
  noLabel,
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
        {noLabel ? null : (
          <Caption
            style={{
              marginBottom: 6,
              color: type == "view" ? primary_color_blur : "black",
            }}
          >
            {label ? label : title ? title : "label"}
          </Caption>
        )}

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
            height: 45,
            paddingHorizontal: 10,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {icon ? (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginRight: 5,

                transform: [{ scale: 0.7 }],
              }}
            >
              {icon}
            </View>
          ) : null}
          <Text
            style={{
              color: "black",
              fontSize: 17,
              fontFamily: "Poppins-500",
              marginTop: 3,
              lineHeight: 20,
            }}
          >
            {inputType == "date" ? format(value, "dd/MM/yyyy") : value}
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
            height: 45,
          }}
        >
          {inputType == "date" ? (
            <TouchableOpacity
              onPress={() => {
                onFocus();
              }}
              style={{
                color: disabled ? "#B8B8B8" : color ? color : "black",
                height: "100%",
                flex: 1,
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  marginTop: 3,
                  fontSize: 17,
                  lineHeight: 20,
                  fontFamily: "Poppins-500",
                  paddingHorizontal: 10,
                }}
              >
                {format(value, "dd/MM/yyyy")}
              </Text>
            </TouchableOpacity>
          ) : (
            <>
              {icon ? (
                <View
                  style={{
                    backgroundColor: "#B0B0B0",
                    width: 45,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {icon}
                </View>
              ) : null}
              <RNTextInput
                secureTextEntry={secureTextEntry}
                editable={!disabled}
                keyboardType={keyboardType}
                multiline={multiline}
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
                  marginTop: 3,
                  color: disabled ? "#B8B8B8" : color ? color : "black",
                  fontSize: 17,
                  lineHeight: 20,
                  flex: 1,
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
                        paddingTop: 3,
                        paddingRight: 10,
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
            </>
          )}
        </Animated.View>
      )}
    </View>
  );
}
