import React, { useRef, useState } from "react";
import { Animated, ScrollView, TouchableOpacity, View } from "react-native";
import { primary_color_blur } from "@/config/theme";
import TMPTextInput from "./TextInput";
import P from "@/components/typography/P";

export default function InputSearch({
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
  color,
  title,
  onBlur,
  textContentType,
  secureTextEntry,
  type,
  icon,
  inputType,
  noLabel,
  style,
  onChange,
  dark,
  emptyValueText,
  data,
}) {
  const [dataLocal, setdataLocal] = useState([]);

  const focusColor = useRef(new Animated.Value(0)).current;
  if (!data) {
    alert("TMPInputSearch need data prop to work.");
  }

  const searchText = (e) => {
    let text = e.toLowerCase();
    let filteredName = data.filter((item) => {
      return item.name?.toLowerCase().match(text);
    });
    if (!text || text === "") {
      setdataLocal(data || []);
    } else if (!Array.isArray(filteredName) && !filteredName.length) {
      // set no data flag to true so as to render flatlist conditionally
      // setnoDataFlag(true);
    } else if (Array.isArray(filteredName)) {
      setdataLocal(filteredName);
    }
  };

  const [activeItem, setactiveItem] = useState("");
  const getHeight = () => {
    if (type == "view") return 0;
    if (dataLocal.length == 0 && !activeItem && !value) return 0;
    if (dataLocal.length == 0 && !activeItem) return 65;
    if (dataLocal.length <= 3) return 55 * dataLocal.length;
    return 45 * 3 + 20;
  };
  return (
    <View style={[{}, style]}>
      <TMPTextInput
        disabled={disabled}
        height={height}
        multiline={multiline}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        label={label}
        placeholder={placeholder}
        required={required}
        value={value}
        onChangeText={(v) => {
          if (activeItem) {
            onChange({});
            setdataLocal(data);
            setactiveItem("");

            return;
          }
          if (onChangeText) onChangeText(v);
          setactiveItem("");
          searchText(v);
        }}
        onFocus={() => {
          if (onFocus) onFocus();
          if (value) searchText(value);
          else setdataLocal(data);
        }}
        color={color}
        title={title}
        onBlur={() => {
          if (onBlur) onBlur();
          if (dataLocal.length == 0) {
          }
        }}
        textContentType={textContentType}
        secureTextEntry={secureTextEntry}
        type={type}
        icon={icon}
        inputType={inputType}
        noLabel={noLabel}
      />
      <View
        style={{
          position: "relative",
          borderRadius: 2.5,
          height: getHeight(),
          //marginBottom: !drop ? 0 : 20,
          marginTop: 2.5,
        }}
      >
        <ScrollView
          nestedScrollEnabled
          showsVerticalScrollIndicator={true}
          contentContainerStyle={{}}
          style={{
            borderColor: "white",
            //  borderWidth: 2,
            backgroundColor: dark ? "white" : "rgba(37, 37, 38, 1)",
            zIndex: 1000,
            width: "100%",
          }}
        >
          {dataLocal.map((item, i) => {
            var activeValue = 0;
            try {
              activeValue = active.name;
            } catch (error) {
              activeValue = "no value";
            }
            return (
              <View
                key={i.toString()}
                style={{
                  height: 45,
                  borderWidth: i == 0 ? 0 : 0.2,
                  borderColor: "rgba(255,255,255, 0.5)",
                  backgroundColor: primary_color_blur,
                }}
              >
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    width: "100%",
                    paddingHorizontal: 5,
                    // backgroundColor: "red",
                    height: 45,

                    // marginTop: i == "0" ? 5 : 0,
                  }}
                  onPress={() => {
                    try {
                      onChange(item);
                      setactiveItem(item);
                      setdataLocal([]);
                    } catch (e) {
                      console.log("ERROR", e);
                    }
                  }}
                >
                  <View
                    style={{
                      display: item.icon ? "flex" : "none",
                      width: "15%",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {item.icon}
                  </View>
                  <View
                    style={{
                      justifyContent: "center",
                      paddingLeft: item.icon ? 0 : 15,
                    }}
                  >
                    <P
                      style={{
                        color: dark ? "black" : "white",
                        fontSize: 12,
                        fontWeight: "500",
                      }}
                    >
                      {item.name ? item.name : `Option ${i}`}
                    </P>
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}
          {dataLocal.length == 0 && !activeItem ? (
            <TouchableOpacity
              style={{
                flexDirection: "row",
                width: "100%",
                color: dark ? "white" : "black",
                backgroundColor: "grey",
                height: 45,
              }}
              onPress={() => {}}
            >
              <View
                style={{
                  paddingLeft: 20,
                  justifyContent: "center",
                }}
              >
                <P
                  style={{
                    color: dark ? "black" : "white",
                    fontSize: 12,
                    fontWeight: "500",
                  }}
                >
                  {emptyValueText ? emptyValueText : "None"}
                </P>
              </View>
            </TouchableOpacity>
          ) : null}
        </ScrollView>
      </View>
    </View>
  );
}
