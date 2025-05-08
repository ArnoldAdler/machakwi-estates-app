import { Ionicons } from "@expo/vector-icons";
import H2 from "@/components/typography/H2";
import React, { useEffect, useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { EventRegister } from "react-native-event-listeners";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import { disabled_color } from "@/config/theme";

export default function TMPMenuModal({ children, show, setshow }) {
  const modal_ref = useRef(null);

  const [menuModal, setmenuModal] = useState(false);
  const openMenuModalListener = useRef();
  const closeMenuModalListener = useRef();

  useEffect(() => {
    openMenuModalListener.current = EventRegister.addEventListener(
      "openMenuModal",
      ({ data, title }) => {
        console.log("open");
        setmenuModal({ buttons: data, title: title ? title : "Menu" });
        modal_ref.current?.open();
      }
    );
    closeMenuModalListener.current = EventRegister.addEventListener(
      "closeMenuModal",
      () => {
        setmenuModal(false);
        modal_ref.current?.close();
      }
    );
    return () => {
      EventRegister.removeEventListener(openMenuModalListener.current);
      EventRegister.removeEventListener(closeMenuModalListener.current);
    };
  }, []);
  return (
    <Portal>
      <Modalize adjustToContentHeight ref={modal_ref}>
        <View
          style={{
            padding: 30,
            marginBottom: 30,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",

              paddingBottom: 10,
              marginBottom: 20,
            }}
          >
            <H2>{menuModal.title ? menuModal.title : "Title"}</H2>
            <TouchableOpacity
              onPress={() => {
                modal_ref.current?.close();
              }}
              style={{}}
            >
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>

          {menuModal
            ? menuModal.buttons.map((item, i) => {
                const button_size = 50;
                return (
                  <TouchableOpacity
                    disabled={item.disabled}
                    onPress={() => {
                      modal_ref.current?.close();
                      if (item.onPress) item.onPress();
                    }}
                    key={i.toString()}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 10,
                      marginBottom: 30,
                    }}
                  >
                    <View
                      style={{
                        marginRight: 15,
                        height: button_size,
                        width: button_size,
                        borderRadius: 5,

                        backgroundColor: "#EDEBEB",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {item.icon}
                    </View>

                    <Text
                      style={{
                        fontSize: 18,
                        fontFamily: "Poppins",
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
                );
              })
            : null}
        </View>
      </Modalize>
    </Portal>
  );
}
