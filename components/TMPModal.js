import { Ionicons } from "@expo/vector-icons";
import H2 from "@/components/typography/H2";
import React, { useEffect, useRef, useState } from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import { EventRegister } from "react-native-event-listeners";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";

export default function TMPModal({ children, show, setshow }) {
  // const { modal, setmodal } = useContext(MainContext);
  ////////////////////////////////////////
  const { width, height } = Dimensions.get("window");
  const modal_ref = useRef(null);
  const [modal, setmodal] = useState(false);
  const openModalListener = useRef();
  const closeModalListener = useRef();

  useEffect(() => {
    openModalListener.current = EventRegister.addEventListener(
      "openModal",
      ({ comp, title }) => {
        setmodal({ comp, title });
        modal_ref.current?.open();
      }
    );
    closeModalListener.current = EventRegister.addEventListener(
      "closeModal",
      () => {
        setmodal(false);
        modal_ref.current?.close();
      }
    );

    return () => {
      EventRegister.removeEventListener(openModalListener.current);
      EventRegister.removeEventListener(closeModalListener.current);
    };
  }, []);

  return (
    <Portal>
      <Modalize modalHeight={height - 60} ref={modal_ref}>
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
            <H2>{modal.title ? modal.title : "Title"}</H2>
            <TouchableOpacity
              onPress={() => {
                modal_ref.current?.close();
              }}
              style={{}}
            >
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View style={{ marginBottom: 60 }}>
            {modal.comp ? (
              modal.comp
            ) : (
              <View>
                <Text>Looding...</Text>
              </View>
            )}
            {/*      <SelectStockItem /> */}
          </View>
        </View>
      </Modalize>
    </Portal>
  );
}
