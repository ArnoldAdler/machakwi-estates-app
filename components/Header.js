import { AntDesign, Entypo } from "@expo/vector-icons";
import H2 from "@/components/typography/H2";
import React, { useState } from "react";
import {
  Dimensions,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Portal } from "react-native-portalize";
import { disabled_color, text_color_primary } from "theme/colors";
import { useNavigation } from "@react-navigation/native";
export default function Header({ backAction, menuOptions, title }) {
  const icon_size = 18;
  const { width, height } = Dimensions.get("window");
  const font_color = text_color_primary;
  const [openMenu, setopenMenu] = useState(false);
  //////////////////////////////////
  const navigation = useNavigation();
  //////////////////////////////////
  return (
    <View
      style={{
        paddingTop: 15,
        flexDirection: "row",
        paddingHorizontal: 30,
        height: 80,
        backgroundColor: "#007ACC",
      }}
    >
      {openMenu ? (
        <Portal>
          <TouchableWithoutFeedback
            onPress={() => {
              setopenMenu(false);
            }}
          >
            <View
              style={{
                height: height,
                width: width,
                backgroundColor: "rgba(0,0,0,0.1)",
                position: "absolute",
                paddingTop: 90,
                alignItems: "flex-end",
                padding: 20,
              }}
            >
              <View
                style={{
                  backgroundColor: "white",
                  borderRadius: 5,
                  padding: 20,
                  paddingVertical: 25,
                  width: "80%",
                }}
              >
                {menuOptions.map((item, i) => {
                  const button_size = 30;
                  return (
                    <View
                      key={i.toString()}
                      style={{
                        width: "100%",
                      }}
                    >
                      <TouchableOpacity
                        disabled={item.disabled}
                        onPress={() => {
                          if (item.onPress) {
                            item.onPress();
                            setopenMenu(false);
                          }
                        }}
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginTop: i != 0 ? 15 : null,
                        }}
                      >
                        <View
                          style={{
                            marginRight: 15,
                            height: button_size,
                            width: button_size,
                            borderRadius: 5,
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {item.icon}
                        </View>

                        <Text
                          style={{
                            fontSize: 18,
                            paddingTop: 5,
                            // fontFamily: "Poppins",
                            color: item.disabled
                              ? disabled_color
                              : item.titleColor
                              ? item.titleColor
                              : "black",
                          }}
                        >
                          {item.title}
                        </Text>
                      </TouchableOpacity>
                      {i != menuOptions.length - 1 ? (
                        <View
                          style={{
                            marginTop: 15,
                            height: 1,
                            width: "100%",
                            backgroundColor: "#969696",
                          }}
                        ></View>
                      ) : null}
                    </View>
                  );
                })}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Portal>
      ) : null}

      <TouchableOpacity
        onPress={() => {
          if (backAction) backAction();
          else {
            navigation.goBack();
          }
        }}
        style={{
          alignItems: "flex-start",
          justifyContent: "center",
          paddingTop: 10,
          width: 50,
        }}
      >
        <AntDesign name="arrowleft" size={20} color={"white"} />
      </TouchableOpacity>
      <View
        style={{
          paddingTop: 17,
          flex: 1,
          justifyContent: "center",
        }}
      >
        <H2
          style={{
            color: font_color,
            color: "white",
            textTransform: "uppercase",
          }}
        >
          {title ? title : "No Title Prop"}
        </H2>
      </View>
      {menuOptions && menuOptions.length != 0 && (
        <TouchableOpacity
          onPress={() => {
            // openMenuModal(menuOptions, "Menu");
            setopenMenu(true);
          }}
          style={{
            width: 50,
            //flexDirection: 'row',
            alignItems: "flex-end",
            justifyContent: "center",

            paddingRight: 0,
            paddingTop: 15,
          }}
        >
          <Entypo name="dots-three-vertical" size={15} color={"white"} />
        </TouchableOpacity>
      )}
    </View>
  );
}
