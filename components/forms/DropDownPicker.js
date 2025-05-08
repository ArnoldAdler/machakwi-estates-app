import { Entypo } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { in_active, primary_color_blur } from "@/config/theme";
import Caption from "@/components/typography/Caption";
import P from "@/components/typography/P";

export default function DropDownPicker({
  onCollapse,
  onDrop,
  labelStyle,
  noNull,
  contentContainerStyle,
  style,
  size,
  name,
  color,
  dark,
  data,
  emptyValue,
  defaultValue,
  onChange,
  disabled,
  required,
  label,
  value,
  type,
}) {
  const [active, setactive] = useState("none");
  const [drop, setdrop] = useState(false);
  const { width, height } = Dimensions.get("window");
  const [update, setupdate] = useState("");
  useEffect(() => {
    if (defaultValue) {
      var [defaultObj] = data.filter((item) => {
        return item.value == defaultValue || item.name == defaultValue;
      });

      if (defaultObj) {
        setactive(iconColorChange(defaultObj));
        if (onChange) onChange(defaultObj);
      } else {
        if (noNull) {
          if (onChange) onChange(data[0]);
          setactive(iconColorChange(data[0]));
        } else {
          setactive(null);
        }
      }
    } else {
      if (noNull) {
        if (onChange) onChange(data[0]);
        setactive(iconColorChange(data[0]));
      } else {
        setactive(null);
      }
    }
    return () => {};
  }, [defaultValue]);
  function iconColorChange(item) {
    if (item.icon) {
      var props = {
        ...item.icon.props,
        color: dark ? "white" : "black",
      };
      var icon = { ...item.icon, props };
      var newItem = { ...item, icon };
      return newItem;
    } else {
      return item;
    }
  }
  useEffect(() => {
    if (drop) {
      focus();
    } else {
      unFocus();
    }

    return () => {};
  }, [drop]);

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

  //////////////////////////////////////
  const getTitle = () => {
    var x = data.find((item) => {
      return item.value == value || item.name == value;
    });
    var name = defaultValue;
    try {
      name = x.name;
    } catch (error) {
      name = value ? value : "";
    }
    return name;
  };
  return (
    <View
      style={{
        width: "100%",
        //     marginTop: !drop ? 0 : 10,
      }}
    >
      <View
        style={[
          {
            zIndex: 150,
            width: "100%",
          },
          contentContainerStyle,
        ]}
      >
        <View
          style={[
            {
              zIndex: 100,
            },
            style,
          ]}
        >
          <View style={{ paddingLeft: 3 }}>
            <Caption
              style={{
                color: type == "view" ? primary_color_blur : "black",
                marginBottom: 6,
              }}
            >
              {label ? label : name ? name : "label"}
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
                height: 45,
                paddingHorizontal: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {/*  {icon ? (
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
              ) : null} */}
              <Text
                style={{
                  color: "black",
                  fontSize: 17,
                  fontFamily: "Poppins-500",
                  marginTop: 3,
                  lineHeight: 20,
                }}
              >
                {getTitle()}
              </Text>
            </View>
          ) : (
            <Animated.View
              style={{
                width: "100%",
                borderRadius: 2,
                backgroundColor: "rgba(229, 229, 229, 1)",
                borderRadius: 3,
                borderWidth: borderWidth,
                borderColor: focusColor2,
                height: 50,

                //borderColor: disabled ? in_active : dark ? "white" : "black",
                // borderWidth: 2,
                //padding: 5,
              }}
            >
              <TouchableOpacity
                disabled={disabled}
                style={{
                  backgroundColor: color ? color : "transparent",
                  // backgroundColor: "green",
                  paddingHorizontal: 10,
                  height: "100%",
                  justifyContent: "center",
                }}
                onPress={() => {
                  setdrop(!drop);
                  if (drop) onCollapse ? onCollapse() : null;
                  else onDrop ? onDrop() : null;
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <View
                    style={{
                      width: "90%",
                      height: "100%",
                      justifyContent: "center",
                    }}
                  >
                    {active ? (
                      <View
                        style={{
                          height: "100%",

                          flexDirection: "row",
                        }}
                      >
                        {active.icon ? (
                          <View
                            style={{
                              width: "15%",
                              alignItems: "center",
                              justifyContent: "center",
                              // paddingHorizontal: 10,
                            }}
                          >
                            {active.icon}
                          </View>
                        ) : null}

                        <View
                          style={{
                            justifyContent: "center",
                            //  paddingLeft: active.icon ? 0 : 10,
                          }}
                        >
                          <Text
                            style={{
                              color: disabled
                                ? in_active
                                : dark
                                ? "rgba(255,255,255, 1)"
                                : "rgba(0,0,0, 0.5)",
                              fontFamily: "Poppins-500",
                              fontSize: 17,
                              paddingTop: 4,
                            }}
                          >
                            {active.name}
                          </Text>
                        </View>
                      </View>
                    ) : (
                      <View
                        style={{
                          justifyContent: "center",
                        }}
                      >
                        <Text
                          style={{
                            color: disabled
                              ? in_active
                              : dark
                              ? "rgba(255,255,255, 1)"
                              : "rgba(0,0,0, 0.5)",
                            fontFamily: "Poppins-500",
                            fontSize: 17,
                            paddingTop: 4,
                          }}
                        >
                          {emptyValue ? emptyValue : label}
                        </Text>
                      </View>
                    )}
                  </View>
                  <View
                    style={{
                      alignItems: "flex-end",
                      justifyContent: "center",
                      left: 3,
                    }}
                  >
                    <Entypo
                      name="chevron-small-down"
                      size={24}
                      color={
                        disabled
                          ? in_active
                          : dark
                          ? "rgba(255,255,255, 1)"
                          : "rgba(0,0,0, 0.5)"
                      }
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </Animated.View>
          )}
          <View
            style={{
              position: "relative",
              //  backgroundColor: "pink",
              borderRadius: 2.5,
              overflow: "hidden",

              height: !drop ? 0 : 45 * data.length,
              //marginBottom: !drop ? 0 : 20,
              marginTop: 2.5,
            }}
          >
            {drop ? (
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={{
                  borderColor: "white",
                  //  borderWidth: 2,
                  backgroundColor: dark ? "white" : "rgba(37, 37, 38, 1)",
                  zIndex: 1000,
                  width: "100%",
                }}
              >
                {data.map((item, i) => {
                  var activeValue = 0;
                  try {
                    activeValue = active.name;
                  } catch (error) {
                    activeValue = "no value";
                  }

                  if (item.name != activeValue)
                    return (
                      <View
                        key={i.toString()}
                        style={{
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
                            height: 45,

                            // marginTop: i == "0" ? 5 : 0,
                          }}
                          onPress={() => {
                            try {
                              var newItem = iconColorChange(item);
                              onChange(newItem);
                              setactive(newItem);
                              setdrop(false);
                              onCollapse ? onCollapse() : null;
                              console.log("ffffffff");
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
                                fontSize: size ? size / 1.3 : 12,
                                fontWeight: "500",
                              }}
                            >
                              {item.name ? item.name : `Option ${i}`}
                            </P>
                          </View>
                        </TouchableOpacity>

                        {/*   <View
                          style={{
                            width: "100%",
                            backgroundColor: "rgba(255,255,255, 0.5)",
                            height: !noNull
                              ? 0.5
                              : i != data.length - 1
                              ? 0.5
                              : 0,
                            marginVertical: 0,
                          }}
                        /> */}
                      </View>
                    );
                })}
                {noNull ? null : active ? (
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      width: "100%",
                      color: dark ? "white" : "black",
                      backgroundColor: "grey",

                      height: 45,
                    }}
                    onPress={() => {
                      setactive(null);
                      if (onChange) onChange({ value: null, name: null });
                      setdrop(false);
                      onCollapse ? onCollapse() : null;
                    }}
                  >
                    <View
                      style={{
                        paddingLeft: 20,
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          color: dark ? "black" : "white",
                          fontSize: size ? size / 1.3 : 50 / 2,
                        }}
                      >
                        {emptyValue ? emptyValue : "None"}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ) : null}
              </ScrollView>
            ) : null}
          </View>
        </View>
      </View>
    </View>
  );
}
